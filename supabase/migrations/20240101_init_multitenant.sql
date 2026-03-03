-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Organizations Table (Tenants)
create table public.organizations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique,
  logo_url text,
  website text,
  
  -- Metadata from onboarding
  country text,
  state text,
  address text,
  
  -- Operational details
  fleet_size text,
  project_types text,
  projects_per_month text,
  quotes_per_month text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Organization Members (User-Tenant Relation)
create table public.organization_members (
  id uuid default uuid_generate_v4() primary key,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('owner', 'admin', 'member', 'driver')) default 'member',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(organization_id, user_id)
);

-- 3. Row Level Security (RLS) Policies

-- Enable RLS
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;

-- Policy: Users can view organizations they belong to
create policy "Users can view own organizations"
  on public.organizations for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_members.organization_id = organizations.id
      and organization_members.user_id = auth.uid()
    )
  );

-- Policy: Users can insert organizations (during onboarding)
create policy "Users can create organizations"
  on public.organizations for insert
  with check (true); 
  -- Note: In a stricter env, you might want to limit this or do it via a server function

-- Policy: Users can update their own organization if they are admin/owner
create policy "Admins can update organization"
  on public.organizations for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_members.organization_id = organizations.id
      and organization_members.user_id = auth.uid()
      and organization_members.role in ('owner', 'admin')
    )
  );

-- Policy: Members visibility
create policy "Users can view members of their organization"
  on public.organization_members for select
  using (
    exists (
      select 1 from public.organization_members as om
      where om.organization_id = organization_members.organization_id
      and om.user_id = auth.uid()
    )
  );

-- Helper function to create organization and link user safely
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
  -- 1. Create Organization
  insert into public.organizations (
    name, 
    country, 
    state, 
    fleet_size, 
    project_types,
    projects_per_month,
    quotes_per_month
  )
  values (
    org_name,
    org_data->>'country',
    org_data->>'state',
    org_data->>'fleetSize',
    org_data->>'projectTypes',
    org_data->>'projectsPerMonth',
    org_data->>'quotesPerMonth'
  )
  returning id into new_org_id;

  -- 2. Link User as Owner
  insert into public.organization_members (organization_id, user_id, role)
  values (new_org_id, auth.uid(), 'owner');

  return new_org_id;
end;
$$;
