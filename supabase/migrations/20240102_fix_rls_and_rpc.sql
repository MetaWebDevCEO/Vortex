-- FIX: Infinite Recursion in RLS Policies

-- 1. Helper function to bypass RLS recursion
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

create policy "Users can view members of their organization"
  on public.organization_members for select
  using (
    organization_id in (select get_user_org_ids())
  );

create policy "Users can insert membership"
  on public.organization_members for insert
  with check (auth.uid() = user_id);

-- 3. Update Policies for 'organizations'
drop policy if exists "Users can view own organizations" on public.organizations;

create policy "Users can view own organizations"
  on public.organizations for select
  using (
    id in (select get_user_org_ids())
  );

-- 4. Ensure RPC function exists and is correct (for Onboarding)
create or replace function public.create_organization_for_user(
  org_name text,
  org_data jsonb
)
returns uuid
language plpgsql
security definer
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
