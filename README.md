# Team XOX (AXOXTEAM)

A modern portfolio and team site built with Next.js App Router, Tailwind CSS, and shadcn/ui. It showcases a hero, team members, skills, values, projects, and modals with smooth animations and strong accessibility.

- Demo entry: `app/page.tsx`
- Fonts: Inter (sans), JetBrains Mono (mono) via `next/font/google`
- Design tokens themed in `app/globals.css`
- UI kit: shadcn/ui (Radix under the hood)

## Tech Stack (Exact Versions)

- Next.js: 14.2.25
- React: ^19 / React DOM: ^19
- TypeScript: 5.7.3
- Tailwind CSS: ^3.4.17
- PostCSS: ^8.5
- shadcn/ui (Radix UI components)
- Framer Motion: 12.23.18

Recommended tooling for development/production:
- Node.js: 20.18.0 (LTS)
- Bun: 1.2.22 (for install/build/start; optional but used in examples)
- PM2: 5.3.0 (process manager)
- Nginx: 1.18.0 (Ubuntu 22.04 default repo)
- OS: Ubuntu 22.04 LTS

## Getting Started (Local)

Prereqs:
- Node 20.18.0
- Bun 1.2.22 (or use npm/pnpm if preferred)

Install and run:
\`\`\`bash
# Install deps
bun install

# Dev server
bun run dev
# http://localhost:3000

# Build for production
bun run build

# Start production server
bun start
\`\`\`

Scripts (package.json):
- `dev`: next dev
- `build`: next build
- `start`: next start

No environment variables are required for basic operation.

## Project Structure (Highlights)

- `app/` - App Router pages, layout, and globals
  - `app/layout.tsx` - Fonts, metadata, theme provider, header/footer
  - `app/page.tsx` - Landing
  - `app/{about,services,projects,blog,members,contact}` - Sections
- `components/` - UI and feature components
  - `components/ui/*` - shadcn/ui components
  - `components/modals/*` - Join, Contact, Project Details
  - `components/layout/*` - Header, Footer, PageWrapper
- `lib/` - utils, constants, animations/types
- `public/` - images and icons
- `tailwind.config.ts` / `app/globals.css` - theme tokens and styles

## Production Deployment on a VPS (IP only)

These steps host directly on your VPS IP without a domain. For HTTPS with a domain, use Let’s Encrypt instead.

1) System setup (Ubuntu 22.04 LTS)
\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip software-properties-common
\`\`\`

2) Install Node.js 20.18.0 and Bun 1.2.22
\`\`\`bash
# Node 20.x (will install the latest 20.x; verify it is 20.18.0)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v    # v20.18.0 (ensure 20.x; if not 20.18.0 specifically, use n/nvm to pin)

# Bun 1.2.22
curl -fsSL https://bun.sh/install | bash
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
bun -v     # 1.2.22
\`\`\`

3) Get the app on the server
\`\`\`bash
# Option A: Clone
git clone https://github.com/yourusername/axoxteam.git
cd axoxteam

# Option B: Place code in /var/www/axoxteam
sudo mkdir -p /var/www/axoxteam
sudo chown -R $USER:$USER /var/www/axoxteam
cp -r ~/axoxteam/* /var/www/axoxteam/
cd /var/www/axoxteam
\`\`\`

4) Install, build, and test locally
\`\`\`bash
bun install
bun run build
bun start   # Ctrl+C to stop after verifying it runs
\`\`\`

5) Run under PM2 5.3.0
\`\`\`bash
sudo npm i -g pm2@5.3.0

# ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'axoxteam',
    script: 'bun',
    args: 'start',
    cwd: '/var/www/axoxteam',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    }
  }]
}
EOF

pm2 start ecosystem.config.js
pm2 save
pm2 startup   # follow the printed command to enable on boot
\`\`\`

6) Install and configure Nginx 1.18.0 (reverse proxy to Next.js)
\`\`\`bash
sudo apt install -y nginx

sudo tee /etc/nginx/sites-available/axoxteam << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;  # serve by IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/axoxteam /etc/nginx/sites-enabled/axoxteam
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

7) Firewall (UFW)
\`\`\`bash
sudo apt install -y ufw
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp   # for future HTTPS
sudo ufw allow ssh
sudo ufw --force enable
sudo ufw status
\`\`\`

8) Visit your site
- Open: `http://YOUR_VPS_IP`

Logs and monitoring:
\`\`\`bash
pm2 logs axoxteam
pm2 monit
sudo tail -f /var/log/nginx/error.log
\`\`\`

### Optional: HTTPS without a domain (self-signed)
Browsers will warn on self-signed certs. Prefer a real domain + Let’s Encrypt.
\`\`\`bash
sudo mkdir -p /etc/ssl/private
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt \
  -subj "/C=US/ST=State/L=City/O=TeamXOX/CN=YOUR_VPS_IP"
# Update Nginx server block to listen 443 ssl with the certs; restart nginx.
\`\`\`

## Accessibility, Performance, and Theming

- Uses design tokens in CSS variables (see `app/globals.css`)
- Accessible focus rings, proper landmarks, and alt text where meaningful
- Prefers motion-reduced behavior for users with that preference
- Framer Motion for subtle animations, optimized with `whileInView` and `viewport`

## Troubleshooting

- apt/dpkg lock on Ubuntu:
\`\`\`bash
sudo lsof /var/lib/dpkg/lock-frontend
sudo killall apt apt-get || true
sudo rm -f /var/lib/apt/lists/lock /var/cache/apt/archives/lock /var/lib/dpkg/lock*
sudo dpkg --configure -a
sudo apt update
\`\`\`

- Port already in use:
\`\`\`bash
sudo lsof -i :3000
kill -9 <PID>
pm2 restart axoxteam
\`\`\`

- Fonts build error: This project uses Inter and JetBrains Mono via `next/font/google` in `app/layout.tsx`. Ensure these imports exist and that `app/globals.css` is included.




preview : https://team-xox.vercel.app/
