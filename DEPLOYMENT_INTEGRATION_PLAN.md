# TAG Trifactor — Deployment & Integration Master Plan

**Version:** 2.0 (Hetzner Cloud Deployment)  
**Date:** April 16, 2026  
**For:** Asif (Backend, API, Integrations, Deployment)  
**Status:** Ready for Implementation  
**Infrastructure:** Hetzner Cloud (same account as existing Moodle instance)

---

## Executive Summary

This plan covers the complete deployment and integration for three Next.js 15 platforms:

1. **TAG (Transport Action Group)** — Flagship platform for ecosystem enablement
2. **GFA (GreenFreightAcademy)** — Enterprise training and capability platform
3. **BetterDriver** — Driver development and certification portal

**Frontends:** Complete and ready for deployment  
**Your Scope:** Hetzner infrastructure, Docker containerization, backend APIs, Supabase setup, Moodle integration (via private network), payment processing, authentication, Nginx configuration, and production deployment

**Key Advantage:** Hosting alongside Moodle enables secure private network communication, lower latency, reduced costs, and simplified infrastructure management.

---

## Priority Implementation Order

Follow this sequence for fastest path to production:

### Phase 1: Hetzner Infrastructure Setup (Day 1-2)
- [ ] Provision Hetzner Cloud servers (recommend: 1 server for all 3 apps, CPX31 or CCX23)
- [ ] Set up private network in Hetzner (connect to existing Moodle network)
- [ ] Configure firewall rules and security groups
- [ ] Install Docker and Docker Compose on server
- [ ] Set up Nginx as reverse proxy with SSL
- [ ] Configure DNS for all three domains
- [ ] Set up Supabase project and configure environment variables

### Phase 2: Supabase Database & Auth (Day 2-3)
- [ ] Create all database tables (see schema section)
- [ ] Configure Supabase Auth for GFA (company registration)
- [ ] Configure Supabase Auth for BetterDriver (driver login)
- [ ] Set up Row Level Security (RLS) policies

### Phase 3: Docker Containerization & Deployment (Day 3-4)
- [ ] Create Dockerfiles for all three Next.js apps
- [ ] Create docker-compose.yml for orchestration
- [ ] Set up GitHub Actions or GitLab CI/CD pipeline
- [ ] Configure environment variables in Docker
- [ ] Test local Docker builds
- [ ] Deploy to Hetzner staging environment

### Phase 4: TAG Core APIs (Day 4-5)
- [ ] Implement `/api/metrics` endpoint (impact strip)
- [ ] Implement `/api/submit-enquiry` (contact form)
- [ ] Set up email notifications for enquiries
- [ ] Test TAG frontend integration

### Phase 5: GFA Core APIs (Day 5-7)
- [ ] Implement `/api/metrics` for GFA impact strip
- [ ] Implement `/api/submit-enquiry` for GFA contact form
- [ ] Implement `/api/company/employees` (list employees)
- [ ] Implement `/api/company/import-employees` (CSV import)
- [ ] Test GFA public pages

### Phase 6: Moodle Integration via Private Network (Day 7-10)
- [ ] Configure private network access to Moodle server
- [ ] Build Moodle API wrapper/middleware (use internal IP)
- [ ] Implement `/api/courses` (fetch Moodle courses)
- [ ] Implement `/api/enroll` (enroll user in Moodle)
- [ ] Implement `/api/bulk-enroll` (bulk company enrolment)
- [ ] Set up Moodle user creation flow
- [ ] Test enrolment flow end-to-end with private network

### Phase 7: BetterDriver Driver Portal (Day 10-12)
- [ ] Implement driver authentication (Supabase Auth)
- [ ] Implement `/api/driver/tasks` (driver task list)
- [ ] Implement `/api/driver/course` (course progress)
- [ ] Implement `/api/driver/progress` (progress summary)
- [ ] Implement `/api/driver/certificate` (certificate data)
- [ ] Implement `/api/driver/cpd` (CPD history)
- [ ] Implement `/api/driver/profile` (driver profile)
- [ ] Implement `/api/registry` (public driver search)
- [ ] Test portal authentication and data flow

### Phase 8: Payment Integration (Day 12-14)
- [ ] Set up Paystack account and get API keys
- [ ] Implement BetterDriver enrolment payment flow (`/api/enroll`)
- [ ] Implement GFA urgent CPD fee payment (`/api/cpd-submission`)
- [ ] Implement payment webhooks for confirmation
- [ ] Test payment flow end-to-end

### Phase 9: GFA Company Dashboard (Day 14-16)
- [ ] Implement `/api/company/*` endpoints (dashboard data)
- [ ] Implement `/api/cpd-submission` with dispatch logic
- [ ] Implement `/api/reports` (company reports)
- [ ] Connect dashboard enrolment grid to Moodle
- [ ] Test full company workflow

### Phase 10: SSL, Monitoring & Production Launch (Day 16-18)
- [ ] Configure Let's Encrypt SSL certificates for all domains
- [ ] Set up monitoring (Uptime Robot, Prometheus, or similar)
- [ ] Configure log aggregation (Docker logs → file/service)
- [ ] Set up automated backups for Docker volumes
- [ ] Remove all mock data and yellow banners
- [ ] Set `NEXT_PUBLIC_DATA_SOURCE=live` on all projects
- [ ] Run security audit (firewall, RLS policies, API auth)
- [ ] Run performance tests (load testing)
- [ ] Deploy to production
- [ ] Monitor first 48 hours

---

## Platform Architecture

```
                          ┌─────────────────────────┐
                          │   Public Internet       │
                          │   (Users/Browsers)      │
                          └──────────┬──────────────┘
                                     │
                          ┌──────────▼──────────────┐
                          │  Hetzner Cloud Server   │
                          │  (CPX31 or CCX23)       │
                          │                         │
                          │  ┌───────────────────┐  │
                          │  │  Nginx (Port 80)  │  │
                          │  │  Reverse Proxy    │  │
                          │  │  + SSL (443)      │  │
                          │  └─────────┬─────────┘  │
                          │            │            │
      ┌───────────────────┼────────────┼────────────┼───────────────┐
      │                   │            │            │               │
      │  ┌────────────────▼──┐  ┌─────▼─────┐  ┌──▼─────────────┐ │
      │  │  TAG Container    │  │    GFA    │  │  BetterDriver  │ │
      │  │  (Next.js)        │  │ Container │  │   Container    │ │
      │  │  Port 3000        │  │ Port 3001 │  │   Port 3002    │ │
      │  └────────┬──────────┘  └─────┬─────┘  └────────┬───────┘ │
      │           │                   │                  │         │
      │           └───────────────────┼──────────────────┘         │
      │                               │                            │
      │  ┌────────────────────────────▼────────────────┐           │
      │  │       Hetzner Private Network               │           │
      │  │       (10.0.0.0/16)                         │           │
      │  └────────────────────┬────────────────────────┘           │
      │                       │                                    │
      └───────────────────────┼────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
      │  Supabase    │  │   Moodle     │  │  Paystack    │
      │  (Cloud)     │  │  (Hetzner    │  │  (External   │
      │              │  │   Private)   │  │   API)       │
      └──────────────┘  └──────────────┘  └──────────────┘

Key Benefits:
• Moodle accessible via private network (10.0.0.x)
• No public internet latency for Moodle calls
• Enhanced security - Moodle not exposed to apps
• Single server reduces infrastructure costs
• Simplified deployment and monitoring
```

---

## Hetzner Infrastructure Specifications

### Recommended Server Configuration

**Option 1: Shared Server (Recommended for Start)**
- **Server Type:** CPX31 (4 vCPU, 8 GB RAM, 160 GB NVMe)
- **Cost:** ~€11.90/month
- **Suitable for:** All 3 apps + Nginx on one server
- **Max Concurrent Users:** ~500-1000

**Option 2: Larger Single Server**
- **Server Type:** CCX23 (8 vCPU, 16 GB RAM, 240 GB NVMe)
- **Cost:** ~€47.90/month
- **Suitable for:** Higher traffic, better performance
- **Max Concurrent Users:** ~2000-5000

**Option 3: Separate Servers (Future Scale)**
- 3x CPX11 servers (2 vCPU, 2 GB RAM each)
- Load balancer in front
- Higher cost but better isolation

### Network Configuration

```bash
# Private Network Setup
Network: 10.0.0.0/16

# Server IPs (example)
Main Server:    10.0.0.10
Moodle Server:  10.0.0.5  (existing)

# Docker Containers (localhost)
TAG:            localhost:3000
GFA:            localhost:3001
BetterDriver:   localhost:3002

# Nginx Reverse Proxy
Port 80/443 → routes to containers based on domain
```

### Firewall Rules

```bash
# Inbound Rules
Allow: TCP 80 (HTTP) from 0.0.0.0/0
Allow: TCP 443 (HTTPS) from 0.0.0.0/0
Allow: TCP 22 (SSH) from [your-ip]/32
Deny: All other inbound traffic

# Outbound Rules
Allow: All (for package updates, external APIs)

# Private Network Rules
Allow: All traffic between 10.0.0.0/16 (internal communication)
```

---

## Docker Configuration

### Dockerfile (Same for all 3 apps)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js app
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  tag:
    build:
      context: ./TAG_NextJS_v2.0/tag-nextjs
      dockerfile: Dockerfile
    container_name: tag-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - ./TAG_NextJS_v2.0/tag-nextjs/.env.production
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  gfa:
    build:
      context: ./GFA_NextJS_v1.0/gfa-nextjs
      dockerfile: Dockerfile
    container_name: gfa-app
    restart: unless-stopped
    ports:
      - "3001:3000"
    env_file:
      - ./GFA_NextJS_v1.0/gfa-nextjs/.env.production
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  betterdriver:
    build:
      context: ./BetterDriver_NextJS_v1.0/bd-nextjs
      dockerfile: Dockerfile
    container_name: betterdriver-app
    restart: unless-stopped
    ports:
      - "3002:3000"
    env_file:
      - ./BetterDriver_NextJS_v1.0/bd-nextjs/.env.production
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  app-network:
    driver: bridge
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/tag-trifactor

# Rate limiting
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

# TAG - transportactiongroup.com
server {
    listen 80;
    listen [::]:80;
    server_name transportactiongroup.com www.transportactiongroup.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name transportactiongroup.com www.transportactiongroup.com;

    ssl_certificate /etc/letsencrypt/live/transportactiongroup.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/transportactiongroup.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 10M;

    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        limit_req zone=api burst=50 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# GFA - greenfreightacademy.com
server {
    listen 80;
    listen [::]:80;
    server_name greenfreightacademy.com www.greenfreightacademy.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name greenfreightacademy.com www.greenfreightacademy.com;

    ssl_certificate /etc/letsencrypt/live/greenfreightacademy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/greenfreightacademy.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 50M;  # For CSV uploads

    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        limit_req zone=api burst=50 nodelay;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# BetterDriver - betterdriver.co.za
server {
    listen 80;
    listen [::]:80;
    server_name betterdriver.co.za www.betterdriver.co.za;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name betterdriver.co.za www.betterdriver.co.za;

    ssl_certificate /etc/letsencrypt/live/betterdriver.co.za/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/betterdriver.co.za/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 10M;

    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        limit_req zone=api burst=50 nodelay;
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Environment Variables Configuration

### TAG (.env.production)

```bash
# Ecosystem URLs
NEXT_PUBLIC_ZERO_AFRICA_URL=https://www.zeroafrica.org
NEXT_PUBLIC_GFA_URL=https://greenfreightacademy.com
NEXT_PUBLIC_BETTERDRIVER_URL=https://betterdriver.co.za

# API Base (same domain, handled by Next.js API routes)
NEXT_PUBLIC_API_BASE_URL=https://transportactiongroup.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Email
EMAIL_FROM=noreply@transportactiongroup.com
EMAIL_TO_NOTIFY=admin@transportactiongroup.com

# Node Environment
NODE_ENV=production
```

### GFA (.env.production)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Paystack
PAYSTACK_SECRET_KEY=sk_live_[key]
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_[key]

# Moodle (Private Network - Internal IP)
MOODLE_API_URL=http://10.0.0.5/webservice/rest/server.php
MOODLE_API_TOKEN=[token]
# No middleware needed - direct private network access

# App URLs
NEXT_PUBLIC_APP_URL=https://greenfreightacademy.com
NEXT_PUBLIC_TAG_URL=https://transportactiongroup.com
NEXT_PUBLIC_BETTERDRIVER_URL=https://betterdriver.co.za
NEXT_PUBLIC_ZEROAFRICA_URL=https://zeroafrica.org

# Feature Flag
NEXT_PUBLIC_DATA_SOURCE=demo  # Change to "live" when ready

# Node Environment
NODE_ENV=production
```

### BetterDriver (.env.production)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_[key]

# App URLs
NEXT_PUBLIC_GFA_URL=https://greenfreightacademy.com
NEXT_PUBLIC_TAG_URL=https://transportactiongroup.com
NEXT_PUBLIC_ZERO_AFRICA_URL=https://zeroafrica.org
NEXT_PUBLIC_BD_API_URL=https://betterdriver.co.za

# Moodle (Private Network - Internal IP)
MOODLE_API_URL=http://10.0.0.5/webservice/rest/server.php
MOODLE_API_TOKEN=[token]

# Node Environment
NODE_ENV=production
```

---

## Supabase Database Schema

### 1. Companies Table (GFA)

```sql
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  registration_number TEXT,
  vat_number TEXT,
  industry TEXT,
  fleet_size TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT UNIQUE NOT NULL,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  subscription_status TEXT DEFAULT 'active', -- active | suspended | cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_email ON companies(contact_email);
```

### 2. Company Employees Table (GFA)

```sql
CREATE TABLE company_employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  mobile TEXT,
  employee_number TEXT,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_company_employees_company ON company_employees(company_id);
CREATE INDEX idx_company_employees_email ON company_employees(email);
```

### 3. Enrolments Table (GFA)

```sql
CREATE TABLE enrolments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES company_employees(id) ON DELETE CASCADE,
  programme_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'enrolled', -- enrolled | in-progress | completed | certified
  progress_percent INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  certificate_number TEXT,
  cpd_completions INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  moodle_user_id TEXT,
  moodle_enrolment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enrolments_employee ON enrolments(employee_id);
CREATE INDEX idx_enrolments_programme ON enrolments(programme_id);
CREATE INDEX idx_enrolments_status ON enrolments(status);
```

### 4. Drivers Table (BetterDriver)

```sql
CREATE TABLE drivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  id_number TEXT UNIQUE,
  licence_number TEXT,
  pdp_number TEXT,
  phone TEXT,
  employer TEXT,
  employer_company_id UUID REFERENCES companies(id), -- links to GFA company if corporate enrolment
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_drivers_email ON drivers(email);
CREATE INDEX idx_drivers_id_number ON drivers(id_number);
CREATE INDEX idx_drivers_employer_company ON drivers(employer_company_id);
```

### 5. Driver Enrolments Table (BetterDriver)

```sql
CREATE TABLE driver_enrolments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  programme_id TEXT NOT NULL,
  enrolment_type TEXT NOT NULL, -- 'individual' | 'corporate'
  company_id UUID REFERENCES companies(id),
  paystack_reference TEXT,
  payment_status TEXT DEFAULT 'pending', -- 'pending' | 'paid' | 'failed'
  payment_amount INTEGER,
  moodle_enrolment_id TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_driver_enrolments_driver ON driver_enrolments(driver_id);
CREATE INDEX idx_driver_enrolments_paystack ON driver_enrolments(paystack_reference);
```

### 6. Driver Certificates Table (BetterDriver)

```sql
CREATE TABLE driver_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  programme_id TEXT NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL, -- format: BD-YYYY-NNNNN
  issued_at TIMESTAMPTZ NOT NULL,
  is_public BOOLEAN DEFAULT TRUE,
  certificate_url TEXT,
  moodle_completion_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_driver_certificates_driver ON driver_certificates(driver_id);
CREATE INDEX idx_driver_certificates_number ON driver_certificates(certificate_number);
CREATE INDEX idx_driver_certificates_public ON driver_certificates(is_public) WHERE is_public = TRUE;
```

### 7. Driver CPD Table (BetterDriver)

```sql
CREATE TABLE driver_cpd (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  cpd_module_id TEXT NOT NULL,
  cpd_submission_id UUID REFERENCES cpd_submissions(id),
  status TEXT DEFAULT 'pending', -- 'pending' | 'in_progress' | 'completed' | 'overdue'
  dispatch_type TEXT NOT NULL, -- 'urgent' | 'standard'
  priority INTEGER DEFAULT 3, -- 1=critical, 2=high, 3=normal
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_driver_cpd_driver ON driver_cpd(driver_id);
CREATE INDEX idx_driver_cpd_status ON driver_cpd(status);
CREATE INDEX idx_driver_cpd_due_date ON driver_cpd(due_date);
```

### 8. CPD Submissions Table (GFA)

```sql
CREATE TABLE cpd_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  submitted_by TEXT NOT NULL, -- user email or name
  incident_title TEXT NOT NULL,
  incident_description TEXT NOT NULL,
  mitigation TEXT NOT NULL,
  visibility TEXT NOT NULL, -- 'anonymous' | 'confidential'
  dispatch TEXT NOT NULL, -- 'urgent' | 'standard'
  status TEXT NOT NULL DEFAULT 'submitted', -- submitted | under_review | accepted | in_development | published
  urgent_fee_paid BOOLEAN DEFAULT FALSE,
  paystack_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cpd_submissions_company ON cpd_submissions(company_id);
CREATE INDEX idx_cpd_submissions_status ON cpd_submissions(status);
CREATE INDEX idx_cpd_submissions_dispatch ON cpd_submissions(dispatch);
```

### 9. Enquiry Submissions Table (TAG & GFA)

```sql
CREATE TABLE enquiry_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL, -- 'tag' | 'gfa'
  type TEXT NOT NULL, -- 'dfi' | 'government' | 'fleet' | 'partnership' | 'individual-learner' | 'other'
  organisation_name TEXT NOT NULL,
  organisation_role TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  fleet_size TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enquiry_submissions_source ON enquiry_submissions(source);
CREATE INDEX idx_enquiry_submissions_type ON enquiry_submissions(type);
CREATE INDEX idx_enquiry_submissions_created ON enquiry_submissions(created_at DESC);
```

---

## API Endpoints to Build

### TAG APIs

#### GET `/api/metrics`
**Purpose:** Homepage impact strip data  
**Response:**
```json
{
  "action_plans": 47,
  "workshops": 132,
  "partners": 24,
  "countries": 8,
  "last_updated": "2026-04-15T10:00:00Z",
  "data_source": "live"
}
```
**Implementation:**
- Query Supabase for live metrics
- Cache for 15 minutes
- Fall back to static data if unavailable

#### POST `/api/submit-enquiry`
**Purpose:** Contact form submission  
**Payload:**
```json
{
  "source": "tag",
  "type": "dfi",
  "organisation_name": "Example Foundation",
  "organisation_role": "Programme Officer",
  "name": "John Doe",
  "email": "john@example.org",
  "mobile": "+27123456789",
  "fleet_size": "50-100",
  "message": "Interested in partnership"
}
```
**Implementation:**
- Validate input
- Insert to `enquiry_submissions` table
- Send email notification to admin
- Return success/error

---

### GFA APIs

#### GET `/api/metrics`
**Purpose:** GFA homepage impact strip  
**Response:**
```json
{
  "seatsBooked": 245,
  "certificationsCompleted": 189,
  "companiesEnrolled": 12,
  "lastUpdated": "2026-04-15T14:30:00Z",
  "dataSource": "live"
}
```

#### POST `/api/submit-enquiry`
**Purpose:** GFA contact form  
**Same as TAG but with `source: "gfa"`**

#### GET `/api/company/employees`
**Purpose:** Fetch all employees for authenticated company  
**Auth:** Require Supabase session  
**Response:**
```json
{
  "employees": [
    {
      "id": "uuid",
      "name": "Jane Doe",
      "role": "Driver",
      "email": "jane@company.com",
      "enrolments": [
        {
          "programme_id": "ptdp",
          "status": "in-progress",
          "progress_percent": 45
        }
      ]
    }
  ]
}
```

#### POST `/api/company/import-employees`
**Purpose:** CSV bulk employee import  
**Auth:** Require Supabase session  
**Payload:** `multipart/form-data` with CSV file  
**CSV Format:**
```csv
name,role,email,mobile,employee_number,department
John Doe,Driver,john@company.com,+27123456789,EMP001,Operations
```
**Implementation:**
- Parse CSV
- Validate rows
- Insert valid employees
- Return import summary with errors

#### POST `/api/bulk-enroll`
**Purpose:** Enroll multiple employees in a programme  
**Auth:** Require Supabase session  
**Payload:**
```json
{
  "employeeIds": ["uuid1", "uuid2"],
  "programmeId": "ptdp"
}
```
**Implementation:**
- Create Moodle users (if not exist)
- Enroll in Moodle course
- Create enrolment records in Supabase
- Return success/failure for each employee

#### POST `/api/cpd-submission`
**Purpose:** Submit company CPD incident  
**Auth:** Require Supabase session  
**Payload:**
```json
{
  "incidentTitle": "Near-miss incident",
  "incidentDescription": "...",
  "mitigation": "...",
  "visibility": "anonymous",
  "dispatch": "urgent"
}
```
**Implementation:**
- Insert to `cpd_submissions`
- If `dispatch === "urgent"`: redirect to Paystack for urgent fee (R500)
- Send notification to admin
- If paid and accepted: push to all enrolled drivers as CPD task

---

### BetterDriver APIs

#### POST `/api/enroll`
**Purpose:** Individual driver enrolment with payment  
**Payload:**
```json
{
  "programmeId": "ptdp",
  "fullName": "John Driver",
  "email": "john@example.com",
  "phone": "+27123456789",
  "idNumber": "9001010000001",
  "licenceNumber": "ABC123",
  "pdpNumber": "PDP456",
  "employer": "ABC Transport"
}
```
**Implementation:**
- Create driver record (or fetch if exists)
- Initiate Paystack payment
- On payment success webhook:
  - Create Moodle user
  - Enroll in Moodle course
  - Create `driver_enrolments` record
  - Send confirmation email

#### GET `/api/driver/tasks`
**Purpose:** Fetch authenticated driver's task list  
**Auth:** Require Supabase session  
**Response:**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "type": "module",
      "title": "Module 3: Defensive Driving",
      "status": "in_progress",
      "priority": 2,
      "dueDate": "2026-04-30",
      "progress": 60
    },
    {
      "id": "uuid",
      "type": "cpd",
      "title": "CPD: Emergency Procedures",
      "status": "pending",
      "priority": 1,
      "dueDate": "2026-04-20",
      "dispatch": "urgent"
    }
  ]
}
```

#### GET `/api/driver/profile`
**Purpose:** Authenticated driver profile  
**Auth:** Require Supabase session

#### GET `/api/driver/certificate`
**Purpose:** Driver certificate data  
**Auth:** Require Supabase session

#### GET `/api/driver/cpd`
**Purpose:** CPD history  
**Auth:** Require Supabase session

#### GET `/api/registry`
**Purpose:** Public driver registry search  
**Query params:** `?q=John+Doe&programme=ptdp`  
**No auth required**  
**Response:**
```json
{
  "results": [
    {
      "certificateNumber": "BD-2026-00145",
      "driverName": "John D.",
      "programme": "Professional Truck Driver",
      "issueDate": "2026-03-15",
      "status": "verified"
    }
  ]
}
```

---

## Moodle Integration

### Required Moodle Web Services

Enable these in Moodle admin:

1. `core_course_get_courses` — List all courses
2. `core_user_create_users` — Create user accounts
3. `enrol_manual_enrol_users` — Enroll users in courses
4. `core_completion_get_course_completion_status` — Get completion status
5. `gradereport_user_get_grade_items` — Get grades/results

### Moodle Integration via Private Network

**Key Advantage:** Direct access to Moodle via private network (10.0.0.5) - no public internet latency, enhanced security.

**Implementation:** Use internal IP address in `MOODLE_API_URL` environment variable. All API calls go through private network.

#### POST `/api/moodle/create-user`
```json
{
  "email": "driver@example.com",
  "firstname": "John",
  "lastname": "Driver",
  "username": "john.driver"
}
```

#### POST `/api/moodle/enroll-user`
```json
{
  "userId": "123",
  "courseId": "456",
  "roleId": "5"
}
```

#### GET `/api/moodle/course-progress?userId=123&courseId=456`
```json
{
  "completion": 65,
  "status": "in_progress",
  "lastActivity": "2026-04-15T12:00:00Z"
}
```

**Implementation Notes:**
- Cache Moodle responses (5-15 min)
- Handle Moodle errors gracefully
- Log all Moodle API calls
- Use Moodle token from environment variable

---

## Paystack Integration

### Setup

1. Create Paystack account at https://paystack.com
2. Get test keys for staging
3. Get live keys for production
4. Set up webhook endpoint

### Paystack Flows

#### BetterDriver Individual Enrolment

### Environment Variables for Payments

Ensure these are set in GFA and BetterDriver `.env.production` files:
- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`

```typescript
// Initialize payment
const response = await fetch('https://api.paystack.co/transaction/initialize', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: driver.email,
    amount: programmePrice * 100, // in kobo
    reference: `BD-${Date.now()}`,
    metadata: {
      driver_id: driver.id,
      programme_id: programmeId,
      enrolment_type: 'individual'
    },
    callback_url: `${process.env.NEXT_PUBLIC_BD_API_URL}/payment/callback`
  })
});

const { authorization_url } = await response.json();
// Redirect user to authorization_url
```

#### GFA Urgent CPD Fee

```typescript
// R500 urgent CPD fee
const response = await fetch('https://api.paystack.co/transaction/initialize', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: company.contact_email,
    amount: 50000, // R500 in kobo
    reference: `CPD-URGENT-${Date.now()}`,
    metadata: {
      company_id: company.id,
      cpd_submission_id: submission.id
    },
    callback_url: `${process.env.NEXT_PUBLIC_GFA_URL}/dashboard/cpd-submission?status=success`
  })
});
```

### Webhook Handler

**Endpoint:** POST `/api/webhooks/paystack`

```typescript
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-paystack-signature');
  
  // Verify signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');
  
  if (hash !== signature) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  const event = JSON.parse(body);
  
  if (event.event === 'charge.success') {
    const { reference, metadata } = event.data;
    
    // Handle successful payment
    if (reference.startsWith('BD-')) {
      // BetterDriver enrolment
      await handleDriverEnrolment(metadata);
    } else if (reference.startsWith('CPD-URGENT-')) {
      // GFA urgent CPD
      await handleUrgentCPD(metadata);
    }
  }
  
  return new Response('OK', { status: 200 });
}
```

---

## Authentication Setup

### GFA Company Authentication

```typescript
// Registration flow
import { createClientComponentClient } from '@supabase/ssr'

const supabase = createClientComponentClient()

async function registerCompany(data) {
  // 1. Create Supabase Auth user
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.contact_email,
    password: data.password,
    options: {
      data: {
        company_name: data.name,
        contact_name: data.contact_name
      }
    }
  })
  
  // 2. Create company record
  const { data: company } = await supabase
    .from('companies')
    .insert({
      name: data.name,
      contact_email: data.contact_email,
      contact_name: data.contact_name,
      // ... other fields
    })
    .select()
    .single()
  
  return company
}
```

### BetterDriver Driver Authentication

```typescript
// Login flow
async function loginDriver(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  
  // Fetch driver profile
  const { data: driver } = await supabase
    .from('drivers')
    .select('*')
    .eq('email', email)
    .single()
  
  return driver
}
```

### Row Level Security (RLS) Policies

```sql
-- Companies can only see their own data
CREATE POLICY "Companies can view own data"
  ON companies
  FOR SELECT
  USING (auth.uid() = id);

-- Company employees accessible by company
CREATE POLICY "Companies can view own employees"
  ON company_employees
  FOR SELECT
  USING (company_id IN (
    SELECT id FROM companies WHERE auth.uid() = id
  ));

-- Drivers can only see their own data
CREATE POLICY "Drivers can view own data"
  ON drivers
  FOR SELECT
  USING (auth.uid() = id);
```

---

## Hetzner Cloud Deployment Steps

### 1. Initial Server Setup

```bash
# SSH into your Hetzner server
ssh root@[server-ip]

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Install Nginx
apt install nginx -y

# Install Certbot for SSL
apt install certbot python3-certbot-nginx -y

# Create app directory
mkdir -p /opt/tag-trifactor
cd /opt/tag-trifactor
```

### 2. Configure Private Network

```bash
# In Hetzner Cloud Console:
# 1. Go to Networks
# 2. Select existing network (where Moodle is)
# 3. Attach your new server to the network
# 4. Note the private IP assigned (e.g., 10.0.0.10)

# Verify connectivity to Moodle
ping 10.0.0.5  # Should respond if on same network

# Test Moodle API access
curl http://10.0.0.5/webservice/rest/server.php
```

### 3. Deploy Applications with Docker

```bash
# Clone or upload your code to /opt/tag-trifactor
# Structure should be:
# /opt/tag-trifactor/
#   ├── TAG_NextJS_v2.0/
#   ├── GFA_NextJS_v1.0/
#   ├── BetterDriver_NextJS_v1.0/
#   └── docker-compose.yml

# Create .env.production files for each app
cd /opt/tag-trifactor/TAG_NextJS_v2.0/tag-nextjs
cp .env.example .env.production
nano .env.production  # Fill in production values

# Repeat for GFA and BetterDriver

# Build and start all containers
cd /opt/tag-trifactor
docker-compose up -d --build

# Check container status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/tag-trifactor

# Paste the Nginx configuration from earlier in this document

# Create symbolic link
ln -s /etc/nginx/sites-available/tag-trifactor /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

### 5. Set Up SSL Certificates

```bash
# Generate SSL certificates with Let's Encrypt
certbot --nginx -d transportactiongroup.com -d www.transportactiongroup.com
certbot --nginx -d greenfreightacademy.com -d www.greenfreightacademy.com
certbot --nginx -d betterdriver.co.za -d www.betterdriver.co.za

# Certbot will automatically:
# 1. Validate domain ownership
# 2. Generate SSL certificates
# 3. Configure Nginx to use them
# 4. Set up auto-renewal

# Test auto-renewal
certbot renew --dry-run
```

### 6. Configure DNS Records

For each domain, create DNS A records pointing to your Hetzner server IP:

```
Type   Name                            Value           TTL
A      transportactiongroup.com        [server-ip]     3600
A      www.transportactiongroup.com    [server-ip]     3600
A      greenfreightacademy.com         [server-ip]     3600
A      www.greenfreightacademy.com     [server-ip]     3600
A      betterdriver.co.za              [server-ip]     3600
A      www.betterdriver.co.za          [server-ip]     3600
```

### 7. Set Up CI/CD Pipeline (Optional but Recommended)

**Option A: GitHub Actions**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Hetzner

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/tag-trifactor
            git pull origin main
            docker-compose up -d --build
            docker-compose logs --tail=50
```

**Option B: GitLab CI**

```yaml
# .gitlab-ci.yml
stages:
  - deploy

deploy_production:
  stage: deploy
  only:
    - main
  script:
    - apt-get update -y
    - apt-get install -y openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan $SERVER_IP >> ~/.ssh/known_hosts
    - ssh root@$SERVER_IP "cd /opt/tag-trifactor && git pull && docker-compose up -d --build"
```

### 8. Configure Firewall (Hetzner Firewall)

```bash
# In Hetzner Cloud Console:
# 1. Create a new Firewall
# 2. Add these rules:

Inbound:
- Port 22 (SSH) from your IP
- Port 80 (HTTP) from anywhere
- Port 443 (HTTPS) from anywhere

Outbound:
- All traffic allowed
```

### 9. Set Up Monitoring

```bash
# Install monitoring tools
apt install htop iotop nethogs -y

# Set up log rotation for Docker
cat > /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

systemctl restart docker

# Set up automated backups (optional)
crontab -e
# Add:
# 0 2 * * * docker-compose -f /opt/tag-trifactor/docker-compose.yml exec -T postgres pg_dump -U postgres > /backups/db_$(date +\%Y\%m\%d).sql
```

### 10. Health Checks

```bash
# Test all applications
curl -I https://transportactiongroup.com
curl -I https://greenfreightacademy.com
curl -I https://betterdriver.co.za

# Check Docker containers
docker-compose ps
docker-compose logs --tail=100

# Check Nginx
systemctl status nginx
nginx -t

# Check SSL certificates
certbot certificates
```

---

## Deployment Commands Quick Reference

```bash
# Start all containers
docker-compose up -d

# Stop all containers
docker-compose down

# Rebuild and restart a specific app
docker-compose up -d --build tag

# View logs
docker-compose logs -f tag
docker-compose logs -f gfa
docker-compose logs -f betterdriver

# Restart Nginx
systemctl restart nginx

# Check Nginx configuration
nginx -t

# Renew SSL certificates
certbot renew

# Update applications (with CI/CD)
git pull origin main
docker-compose up -d --build

# Check container resource usage
docker stats

# Clean up unused Docker resources
docker system prune -a
```

---

## Testing Checklist

### TAG Testing
- [ ] Homepage loads with all 11 sections
- [ ] Impact strip shows demo data fallback
- [ ] All inner pages accessible
- [ ] Contact form submits successfully
- [ ] Email notification received
- [ ] Navigation links work correctly
- [ ] Mobile responsive

### GFA Testing
- [ ] Company registration flow works
- [ ] Company login/logout works
- [ ] Dashboard shows employee grid
- [ ] CSV employee import works
- [ ] Bulk enrolment flow works
- [ ] CPD submission form works
- [ ] Urgent CPD payment flow works
- [ ] Career path planner loads
- [ ] All 6 programmes display correctly
- [ ] Pricing page accurate

### BetterDriver Testing
- [ ] Public homepage loads
- [ ] Driver enrolment flow works
- [ ] Paystack payment works
- [ ] Driver login works
- [ ] Portal tasks display correctly
- [ ] Course progress shows
- [ ] Certificate generation works
- [ ] Public registry search works
- [ ] CPD history displays
- [ ] Profile updates work

### Integration Testing
- [ ] GFA → Moodle enrolment via private network works
- [ ] BetterDriver → Moodle enrolment via private network works
- [ ] Private network connectivity to Moodle verified
- [ ] Moodle API response times acceptable (<200ms)
- [ ] Paystack webhooks fire correctly
- [ ] Email notifications send
- [ ] Cross-platform links work (TAG → GFA, etc.)
- [ ] Certificate numbers generate correctly (BD-YYYY-NNNNN)

---

## Mock Data Removal Checklist

### TAG
- [ ] Remove `IMPACT_STRIP_FALLBACK` dependency
- [ ] Remove yellow `[DEMO DATA]` banner
- [ ] Replace stub content on inner pages

### GFA
- [ ] Remove `DEMO_METRICS` in constants
- [ ] Remove `MOCK_EMPLOYEES` in constants
- [ ] Remove yellow banners from dashboard
- [ ] Set `NEXT_PUBLIC_DATA_SOURCE=live`

### BetterDriver
- [ ] Remove `MOCK_TASKS` in constants
- [ ] Remove `MOCK_DRIVER` in constants
- [ ] Remove `MOCK_REGISTRY` in constants
- [ ] Remove `MOCK_CPD_ITEMS` in constants
- [ ] Remove yellow `[DEMO DATA]` banners in portal
- [ ] Set all API endpoints to live

---

## Production Launch Checklist

### Pre-Launch
- [ ] All environment variables set to production values
- [ ] Docker containers running and healthy
- [ ] Nginx configuration tested and active
- [ ] SSL certificates active on all domains (Let's Encrypt)
- [ ] Private network connectivity to Moodle verified
- [ ] Supabase RLS policies tested
- [ ] Payment webhooks verified with Paystack test mode
- [ ] Email sending tested (use real email service)
- [ ] All mock data removed
- [ ] Performance tested (Lighthouse scores)
- [ ] Security audit completed
- [ ] Backup strategy in place

### Launch Day
- [ ] Deploy all three platforms to production
- [ ] Switch Paystack to live mode
- [ ] Set `NEXT_PUBLIC_DATA_SOURCE=live`
- [ ] Monitor error logs (Vercel, Supabase)
- [ ] Monitor payment webhooks
- [ ] Test first real user flow end-to-end

### Post-Launch (First 48 Hours)
- [ ] Monitor application performance (CPU, RAM, disk)
- [ ] Check error rates in Docker logs
- [ ] Verify payment processing
- [ ] Verify email delivery
- [ ] Check database load
- [ ] Verify Moodle integration via private network
- [ ] Monitor server resources (htop, docker stats)
- [ ] Check Nginx access logs for errors
- [ ] Monitor user feedback

---

## GFA Programme Name Update

**Note from client:** Programme 4 ("Road Freight Manager Training") needs a shorter name.

**Current title in system:** "Road Freight Manager Training"  
**To update:** Edit `lib/constants.ts` line ~120:

```typescript
{
  id: "rfm",
  title: "Your New Short Name Here", // ← Change this line only
  // ... rest stays the same
}
```

**Update propagates to:**
- Homepage programme cards
- `/programmes` page
- `/pricing` page
- Career path planner
- Company dashboard enrolment grid

**Suggested alternatives:**
- "Road Freight Performance Programme"
- "Freight Manager Essentials"
- "Transport Operations Excellence"
- "Fleet Performance Programme"

---

## Support & Documentation

### Key Files
- Each project has detailed `README.md` with component inventory
- `.env.example` files have all required variables
- `types/index.ts` has all TypeScript interfaces
- `lib/constants.ts` has all static data

### Contact
- Frontend Questions: Check README files first
- API Questions: Refer to this document
- Moodle API: Request documentation from Moodle admin
- Paystack API: https://paystack.com/docs

### Useful Links
- Next.js 15 Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Paystack Docs: https://paystack.com/docs
- Vercel Docs: https://vercel.com/docs

---

## Cost Analysis

### Hetzner vs Vercel Cost Comparison

**Hetzner Cloud (Recommended)**
- Server (CPX31): €11.90/month
- Private Network: Free
- Bandwidth: 20 TB included
- Backups (optional): €2.38/month
- **Total: ~€14-15/month** (~R280/month)

**Vercel (Previous Plan)**
- Pro Plan (required for 3 apps): $20/month per project
- 3 projects = $60/month (~R1,140/month)
- Bandwidth overages: $40/100GB
- Serverless function invocations can add costs
- **Total: $60-100+/month** (~R1,140-1,900/month)

**Savings: ~R860-1,620/month** (~R10,320-19,440/year)

**Additional Benefits:**
- Better control over infrastructure
- Private network access to Moodle (no middleware costs)
- No vendor lock-in
- Predictable costs
- Better performance for Moodle integration

---

## Timeline Summary

**Total Estimated Time:** 16-18 days

- **Week 1 (Days 1-5):** Hetzner setup, Docker, Core APIs
- **Week 2 (Days 6-10):** Moodle Integration (private network) + BetterDriver Portal
- **Week 3 (Days 11-16):** Payments + GFA Dashboard + Testing
- **Days 17-18:** SSL, Monitoring, Production Launch

**Recommended Approach:** 
- Set up staging environment first (separate Docker containers on same server)
- Test each phase before deploying to production
- Use Docker tags for version management
- Keep production and staging environments isolated

---

## Success Metrics

### Technical Metrics
- All three platforms deployed and accessible
- < 2s page load time on all pages
- 100% API endpoint availability
- Zero payment processing errors
- Successful Moodle sync rate > 95%

### Business Metrics
- First successful company registration
- First successful driver enrolment with payment
- First course completion and certificate issued
- First CPD submission processed
- All 6 programmes actively enrollable

---

**END OF DEPLOYMENT PLAN**

For questions or clarifications during implementation, refer back to the README.md files in each frontend package. They contain detailed component inventories, data shapes, and implementation notes.
