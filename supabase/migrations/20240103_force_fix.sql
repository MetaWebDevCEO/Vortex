-- FIX: Ensure RPC function and policies are correct and accessible
-- This script drops and recreates everything related to org creation to be safe

-- 1. Helper function to bypass RLS recursion (Safe version)
create or replace function get_user_org_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select organization_id from public.organization_members where user_id = auth.uid();
$$;

-- 2. Update Policies for 'organization_members'
drop policy if exists "Users can view members of their organization" on public.organization_members;
drop policy if exists "Users can insert membership" on public.organization_members;

-- Enable RLS just in case
alter table public.organization_members enable row level security;

create policy "Users can view members of their organization"
  on public.organization_members for select
  using (
    organization_id in (select get_user_org_ids())
  );

-- Allow system (via RPC with security definer) to insert, or user if specific rule needed
-- Since we use RPC with security definer, this policy might strictly not be needed for the RPC to work, 
-- but good for general safety if we allowed direct inserts.
create policy "Users can insert membership"
  on public.organization_members for insert
  with check (auth.uid() = user_id);

-- 3. Update Policies for 'organizations'
drop policy if exists "Users can view own organizations" on public.organizations;
drop policy if exists "Users can create organizations" on public.organizations;

-- Enable RLS just in case
alter table public.organizations enable row level security;

create policy "Users can view own organizations"
  on public.organizations for select
  using (
    id in (select get_user_org_ids())
  );

-- 4. RPC Function - The most critical part
-- We use SECURITY DEFINER to bypass RLS during creation
drop function if exists public.create_organization_for_user;

create or replace function public.create_organization_for_user(
  org_name text,
  org_data jsonb
)
returns uuid
language plpgsql
security definer -- IMPORTANT: Runs with privileges of the creator (postgres/admin), bypassing RLS
set search_path = public
as $$
declare
  new_org_id uuid;
begin
  -- Insert Organization
  insert into public.organizations (
    name, 
    country, 
    state, 
    fleet_size, 
    project_types,
    projects_per_month,
    quotes_per_month,
    logo_url
  )
  values (
    org_name,
    org_data->>'country',
    org_data->>'state',
    org_data->>'fleetSize',
    org_data->>'projectTypes',
    org_data->>'projectsPerMonth',
    org_data->>'quotesPerMonth',
    org_data->>'logo'
  )
  returning id into new_org_id;

  -- Link User as Owner
  insert into public.organization_members (organization_id, user_id, role)
  values (new_org_id, auth.uid(), 'owner');

  return new_org_id;
end;
$$;

-- 5. Grant permissions to authenticated users
grant usage on schema public to authenticated;
grant all on public.organizations to authenticated;
grant all on public.organization_members to authenticated;
grant execute on function public.create_organization_for_user to authenticated;
grant execute on function public.get_user_org_ids to authenticated;
