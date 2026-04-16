# Quick Frontend Deployment Guide - Hetzner Cloud

**Goal:** Deploy all 3 frontends (TAG, GFA, BetterDriver) to Hetzner with mock data so you can see and test the websites.

**No backend needed yet** - websites will show mock data and demo content.

---

## Prerequisites

Before starting, you need:

1. ✅ A Hetzner Cloud account
2. ✅ Three domain names ready (or you can use IP address temporarily):
   - `transportactiongroup.com` (or `.co.za`)
   - `greenfreightacademy.com` (or `.co.za`)
   - `betterdriver.co.za`

---

## Step 1: Create Hetzner Server

### 1.1 Log into Hetzner Cloud Console

Go to: https://console.hetzner.cloud/

### 1.2 Create a New Server

1. Click **"New Project"** or select your existing project
2. Click **"Add Server"**
3. **Location:** Choose closest to South Africa (probably "Nuremberg" or "Helsinki")
4. **Image:** Select **Ubuntu 22.04**
5. **Type:** Select **CPX31** (4 vCPU, 8 GB RAM) - €11.90/month
6. **Networking:** 
   - ✅ Enable IPv4
   - ⬜ IPv6 (optional)
7. **SSH Key:** Add your SSH key (or create one - see below if needed)
8. **Name:** `tag-trifactor-server`
9. Click **"Create & Buy Now"**

**Creating SSH Key (if you don't have one):**

Open PowerShell and run:
```powershell
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```
Press Enter for all prompts. Then copy the public key:
```powershell
Get-Content ~/.ssh/id_rsa.pub
```
Paste this into Hetzner's SSH key field.

### 1.3 Note Your Server IP

After creation, note down:
- **Server IP Address:** (e.g., `123.45.67.89`)
- **Root Password:** (emailed to you if no SSH key)

---

## Step 2: Connect to Your Server

Open **PowerShell** and connect:

```powershell
ssh root@YOUR_SERVER_IP
```

Replace `YOUR_SERVER_IP` with your actual server IP.

Type `yes` when asked about fingerprint.

✅ **You're now connected to your server!**

---

## Step 3: Update System & Install Docker

Copy and paste these commands **one block at a time**:

### 3.1 Update System
```bash
apt update && apt upgrade -y
```

### 3.2 Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### 3.3 Install Docker Compose
```bash
apt install docker-compose -y
```

### 3.4 Install Nginx
```bash
apt install nginx -y
```

### 3.5 Install Certbot (for SSL)
```bash
apt install certbot python3-certbot-nginx -y
```

### 3.6 Install Git
```bash
apt install git -y
```

✅ **All tools installed!**

---

## Step 4: Upload Your Code to the Server

You have **two options**:

### Option A: Using Git (Recommended if code is in a repo)

```bash
cd /opt
git clone YOUR_REPO_URL tag-trifactor
cd tag-trifactor
```

### Option B: Upload via SCP (from your Windows machine)

Open a **NEW PowerShell window** (keep SSH session open in another window):

```powershell
# Navigate to your TAG Trifactor folder
cd "C:\Users\Administrator\Documents\TAG Trifactor"

# Upload all three projects
scp -r BetterDriver_NextJS_v1.0 root@YOUR_SERVER_IP:/opt/tag-trifactor/
scp -r GFA_NextJS_v1.0 root@YOUR_SERVER_IP:/opt/tag-trifactor/
scp -r TAG_NextJS_v2.0 root@YOUR_SERVER_IP:/opt/tag-trifactor/
```

This will take a few minutes depending on your internet speed.

**Go back to your SSH session** after upload completes.

Verify files are there:
```bash
cd /opt/tag-trifactor
ls
```

You should see:
- `BetterDriver_NextJS_v1.0/`
- `GFA_NextJS_v1.0/`
- `TAG_NextJS_v2.0/`

---

## Step 5: Create Dockerfiles

We need to create a Dockerfile for each app.

### 5.1 Create Dockerfile for TAG

```bash
cat > /opt/tag-trifactor/TAG_NextJS_v2.0/tag-nextjs/Dockerfile << 'EOF'
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy files (ignore errors if directories don't exist)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
RUN mkdir -p ./public ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
EOF
```

### 5.2 Create Dockerfile for GFA

```bash
cat > /opt/tag-trifactor/GFA_NextJS_v1.0/gfa-nextjs/Dockerfile << 'EOF'
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
RUN mkdir -p ./public ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
EOF
```

### 5.3 Create Dockerfile for BetterDriver

```bash
cat > /opt/tag-trifactor/BetterDriver_NextJS_v1.0/bd-nextjs/Dockerfile << 'EOF'
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
RUN mkdir -p ./public ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
EOF
```

---

## Step 6: Update Next.js Config for Standalone Output

Each Next.js app needs to be configured for standalone Docker deployment.

### 6.1 Update TAG next.config.ts

```bash
cat > /opt/tag-trifactor/TAG_NextJS_v2.0/tag-nextjs/next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
};

export default nextConfig;
EOF
```

### 6.2 Update GFA next.config.ts

```bash
cat > /opt/tag-trifactor/GFA_NextJS_v1.0/gfa-nextjs/next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
};

export default nextConfig;
EOF
```

### 6.3 Update BetterDriver next.config.ts

```bash
cat > /opt/tag-trifactor/BetterDriver_NextJS_v1.0/bd-nextjs/next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
};

export default nextConfig;
EOF
```

---

## Step 7: Create Environment Files

Create minimal `.env.production` files for each app:

### 7.1 TAG Environment

```bash
cat > /opt/tag-trifactor/TAG_NextJS_v2.0/tag-nextjs/.env.production << 'EOF'
NODE_ENV=production
NEXT_PUBLIC_ZERO_AFRICA_URL=https://www.zeroafrica.org
NEXT_PUBLIC_GFA_URL=https://greenfreightacademy.com
NEXT_PUBLIC_BETTERDRIVER_URL=https://betterdriver.co.za
EOF
```

### 7.2 GFA Environment

```bash
cat > /opt/tag-trifactor/GFA_NextJS_v1.0/gfa-nextjs/.env.production << 'EOF'
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://greenfreightacademy.com
NEXT_PUBLIC_TAG_URL=https://transportactiongroup.com
NEXT_PUBLIC_BETTERDRIVER_URL=https://betterdriver.co.za
NEXT_PUBLIC_ZEROAFRICA_URL=https://zeroafrica.org
NEXT_PUBLIC_DATA_SOURCE=demo
EOF
```

### 7.3 BetterDriver Environment

```bash
cat > /opt/tag-trifactor/BetterDriver_NextJS_v1.0/bd-nextjs/.env.production << 'EOF'
NODE_ENV=production
NEXT_PUBLIC_GFA_URL=https://greenfreightacademy.com
NEXT_PUBLIC_TAG_URL=https://transportactiongroup.com
NEXT_PUBLIC_ZERO_AFRICA_URL=https://zeroafrica.org
EOF
```

---

## Step 8: Create Docker Compose File

Create a single file to manage all 3 apps:

```bash
cat > /opt/tag-trifactor/docker-compose.yml << 'EOF'
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

networks:
  app-network:
    driver: bridge
EOF
```

---

## Step 9: Build and Start All Apps

This will take 10-15 minutes (building 3 Next.js apps):

```bash
cd /opt/tag-trifactor
docker-compose up -d --build
```

**What's happening:**
- Docker is building each app
- Installing dependencies
- Creating production builds
- Starting containers

### Check if containers are running:

```bash
docker-compose ps
```

You should see all 3 containers with status "Up":
```
NAME              STATE
tag-app           Up
gfa-app           Up
betterdriver-app  Up
```

### View logs (if there are issues):

```bash
# All apps
docker-compose logs

# Specific app
docker-compose logs tag
docker-compose logs gfa
docker-compose logs betterdriver
```

---

## Step 10: Configure Nginx Reverse Proxy

Now we'll set up Nginx to route domains to the correct containers.

### 10.1 Create Nginx Config

```bash
cat > /etc/nginx/sites-available/tag-trifactor << 'EOF'
# TAG - transportactiongroup.com
server {
    listen 80;
    server_name transportactiongroup.com www.transportactiongroup.com;

    location / {
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
}

# GFA - greenfreightacademy.com
server {
    listen 80;
    server_name greenfreightacademy.com www.greenfreightacademy.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 50M;
    }
}

# BetterDriver - betterdriver.co.za
server {
    listen 80;
    server_name betterdriver.co.za www.betterdriver.co.za;

    location / {
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
}
EOF
```

### 10.2 Enable the Config

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/tag-trifactor /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
nginx -t
```

You should see:
```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 10.3 Restart Nginx

```bash
systemctl restart nginx
systemctl status nginx
```

Press `q` to exit the status view.

---

## Step 11: Configure DNS Records

**You need to point your domains to your server IP.**

Go to your domain registrar (e.g., GoDaddy, Namecheap, etc.) and add these DNS records:

### For each domain, create an **A record**:

| Domain | Type | Name | Value | TTL |
|--------|------|------|-------|-----|
| transportactiongroup.com | A | @ | YOUR_SERVER_IP | 3600 |
| transportactiongroup.com | A | www | YOUR_SERVER_IP | 3600 |
| greenfreightacademy.com | A | @ | YOUR_SERVER_IP | 3600 |
| greenfreightacademy.com | A | www | YOUR_SERVER_IP | 3600 |
| betterdriver.co.za | A | @ | YOUR_SERVER_IP | 3600 |
| betterdriver.co.za | A | www | YOUR_SERVER_IP | 3600 |

**DNS propagation takes 5 minutes to 24 hours** (usually 15-30 minutes).

### Test if DNS is working:

From your local computer (PowerShell):

```powershell
nslookup transportactiongroup.com
nslookup greenfreightacademy.com
nslookup betterdriver.co.za
```

You should see your server IP in the results.

---

## Step 12: Set Up SSL Certificates (HTTPS)

**Wait until DNS is working before this step!**

### 12.1 Get SSL Certificates

Run these commands **one at a time**:

```bash
# TAG
certbot --nginx -d transportactiongroup.com -d www.transportactiongroup.com

# GFA
certbot --nginx -d greenfreightacademy.com -d www.greenfreightacademy.com

# BetterDriver
certbot --nginx -d betterdriver.co.za -d www.betterdriver.co.za
```

For each command, you'll be asked:
1. **Email address:** Enter your email
2. **Terms of Service:** Type `A` (Agree)
3. **Share email:** Type `N` (No)
4. **Redirect HTTP to HTTPS:** Type `2` (Yes, redirect)

### 12.2 Test Auto-Renewal

```bash
certbot renew --dry-run
```

If successful, you'll see: `Congratulations, all simulated renewals succeeded`

---

## Step 13: Test Your Websites! 🎉

Open your browser and visit:

1. **TAG:** https://transportactiongroup.com
2. **GFA:** https://greenfreightacademy.com
3. **BetterDriver:** https://betterdriver.co.za

✅ **All three websites should be live with mock data!**

---

## Step 14: Temporary IP Access (If DNS Not Ready)

If you haven't set up DNS yet, you can test using the IP address:

### 14.1 Add this to your Nginx config temporarily:

```bash
cat > /etc/nginx/sites-available/ip-access << 'EOF'
server {
    listen 80 default_server;
    
    location /tag {
        rewrite ^/tag(.*) /$1 break;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    location /gfa {
        rewrite ^/gfa(.*) /$1 break;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    location /bd {
        rewrite ^/bd(.*) /$1 break;
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
EOF

ln -s /etc/nginx/sites-available/ip-access /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 14.2 Access via IP:

- **TAG:** http://YOUR_SERVER_IP/tag
- **GFA:** http://YOUR_SERVER_IP/gfa
- **BetterDriver:** http://YOUR_SERVER_IP/bd

**Note:** Some features may not work perfectly with IP access. DNS + proper domains is recommended.

---

## Troubleshooting

### Problem: Container won't start

```bash
# Check logs
docker-compose logs [service-name]

# Rebuild specific container
docker-compose up -d --build tag
```

### Problem: Can't access website

```bash
# Check if containers are running
docker-compose ps

# Check Nginx
systemctl status nginx

# Check firewall (Hetzner Cloud Firewall)
# In Hetzner Console, make sure ports 80 and 443 are open
```

### Problem: Build fails

```bash
# Clean and rebuild
docker-compose down
docker system prune -f
docker-compose up -d --build
```

### Problem: Out of disk space

```bash
# Check disk usage
df -h

# Clean Docker
docker system prune -a -f
```

---

## Useful Commands

```bash
# View all container logs
docker-compose logs -f

# View specific app logs
docker-compose logs -f tag

# Restart all containers
docker-compose restart

# Stop all containers
docker-compose down

# Start all containers
docker-compose up -d

# Rebuild and restart
docker-compose up -d --build

# Check Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx

# Check server resources
htop  # (install with: apt install htop)

# Check disk space
df -h
```

---

## What You Can Do Now

✅ **Browse all three websites** with mock data  
✅ **See all pages and UI components**  
✅ **Test navigation and forms** (forms won't submit - no backend yet)  
✅ **Review design and content**  
✅ **Understand what data/APIs are needed**

### What Won't Work Yet (Expected):

❌ Form submissions (no backend API)  
❌ User authentication (no Supabase setup)  
❌ Database-driven content (no database)  
❌ Payment processing (no Paystack integration)  
❌ Moodle integration  

**This is perfect for:**
- Showing the client what the websites look like
- Getting feedback on design and content
- Understanding requirements before building backend
- Planning the API endpoints needed

---

## Next Steps (After Review)

Once you've reviewed the frontends and understand what's needed:

1. **Set up Supabase** (database + authentication)
2. **Build API endpoints** as per the main deployment plan
3. **Integrate Moodle** via private network
4. **Set up Paystack** for payments
5. **Connect frontends to live data**
6. **Remove mock data** and go live

---

## Cost Breakdown

**Monthly Costs (Frontend Only):**
- Hetzner CPX31 Server: €11.90/month
- SSL Certificates: Free (Let's Encrypt)
- **Total: €11.90/month (~R235/month)**

**Once you add backend services:**
- Supabase: Free tier (or $25/month for Pro)
- Domain names: ~$10-15/year each

---

**END OF QUICK DEPLOYMENT GUIDE**

Need help? Check the logs or feel free to ask!
