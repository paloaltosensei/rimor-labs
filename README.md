# RIMOR Labs — Stealth Pre-Launch & Interactive CLI Sneak-Peek Repository

> **Positioning:** Senior-led European cybersecurity bridging Offensive Security (Red Team), Defensive Detection Engineering (Blue/Purple Team), Zero-Trust Security Architecture, and Cyber Governance, Risk & Compliance (NIS2 · DORA · ISO 27001 · vCISO).

This repository contains the zero-cost, zero-dependency, static pre-launch website for **RIMOR Labs**. Inspired by **ShadowOpsEU**, it keeps the experience tight, atmospheric, and genuinely "Under Construction" while giving visitors an interactive **`rimor://cli` Sneak Peek** into what they can expect from RIMOR Labs as a service. It is engineered for **0-second deploys on Netlify's Free/Starter Plan**, native **Netlify Forms** lead capture without backend servers, and an **A+ HTTP security header posture** on [SecurityHeaders.com](https://securityheaders.com/) and [Mozilla Observatory](https://observatory.mozilla.org/).

---

## 1. Repository Architecture

```text
├── .github/
│   └── workflows/
│       └── validate-and-audit.yml   # GitHub Actions CI pipeline (HTML/asset validation & security header checks on push/PR)
├── .well-known/
│   └── security.txt                 # RFC 9116 compliant vulnerability disclosure policy
├── assets/
│   ├── css/
│   │   └── styles.css               # Obsidian & Violet design system, flashlight mask & responsive layout
│   ├── js/
│   │   └── app.js                   # Mouse flashlight scanner, interactive CLI sneak-peek, Netlify Forms AJAX
│   └── img/
│       ├── favicon.svg              # RIMOR Labs subsurface depth-probe & parted-strata emblem
│       ├── flashlight-cursor.svg    # Custom flashlight mouse cursor icon for the hero canvas
│       └── og-preview.svg           # Social sharing / OpenGraph preview graphic
├── index.html                       # Under-construction hero & interactive CLI sneak-peek page
├── 404.html                         # Custom cyber-themed 404 page
├── netlify.toml                     # Netlify deployment pipeline config, redirects & strict A+ HTTP Security Headers
├── _headers                         # Fallback Netlify headers file for SecurityHeaders.com A+ grade
├── robots.txt                       # Search engine crawler instructions
├── .gitignore                       # Standard macOS/Windows/Node/IDE ignore rules (.DS_Store, .netlify/, etc.)
└── README.md                        # Step-by-step GitHub push, Netlify linking, Netlify Forms & custom domain DNS guide
```

---

## 2. Local Preview

No build tools, bundlers, or `npm install` steps are required. To preview locally:

```bash
# Option A: Python built-in HTTP server
python3 -m http.server 8080

# Option B: Netlify CLI (optional)
npx netlify-cli serve
```

Then open `http://localhost:8080` in your browser. Both Netlify forms (`launch-notify` and `rimor-briefing`) automatically detect `localhost` and provide an on-page preview confirmation state.

---

## 3. Step-by-Step: Push to GitHub

This workspace is already initialized as a Git repository on the `main` branch (`git init -b main`).

1. **Create a new GitHub repository** (e.g., `rimor-labs-web`) under your GitHub account or organization (leave "Add a README" unchecked since this repository already contains all files).
2. **Stage, commit, and push** from this directory:

```bash
git add .
git commit -m "feat: initial RIMOR Labs pre-launch showcase & security pipeline"
git remote add origin git@github.com:<YOUR_GITHUB_ORG_OR_USER>/<YOUR_REPO_NAME>.git
git push -u origin main
```

3. Once pushed, navigate to the **Actions** tab on GitHub to see the `Validate Static Bundle & Security Posture` workflow (`.github/workflows/validate-and-audit.yml`) automatically verify all files, Netlify Forms hidden inputs, security headers, and asset paths.

---

## 4. Step-by-Step: Deploy on Netlify Free / Starter Plan

1. Log in to [app.netlify.com](https://app.netlify.com/) and click **Add new site → Import an existing project**.
2. Choose **GitHub** and select your repository.
3. Netlify will automatically read `netlify.toml` and populate:
   - **Branch to deploy:** `main`
   - **Build command:** *(automatically configured — static bundle requires 0 build minutes)*
   - **Publish directory:** `.`
4. Click **Deploy site**. Your site will be live in ~3 seconds.

---

## 5. Enabling & Receiving Netlify Forms Notifications (Zero Backend Cost)

The repository includes two pre-configured HTML forms with `data-netlify="true"`, spam honeypots (`netlify-honeypot="bot-field"`), and matching `<input type="hidden" name="form-name" ... />` fields:
- **`launch-notify`** — Hero inline quick-notify email capture.
- **`rimor-briefing`** — Full consultation & early briefing request form (`#contact`).

### Enable Form Detection & Email/Slack Alerts:
1. In your Netlify site dashboard, go to **Forms** (or **Project configuration → Forms**).
2. Ensure **Form detection** is enabled (enabled by default on new sites; if prompted, click **Enable form detection** and trigger a redeploy).
3. Go to **Forms → Notifications** (or **Project configuration → Notifications → Emails and webhooks**).
4. Click **Add notification → Email notification**:
   - **Event to listen for:** `New form submission`
   - **Form:** Leave blank to receive alerts for *both* `launch-notify` and `rimor-briefing` (or create separate routing rules).
   - **Email to notify:** Enter your RIMOR Labs inbox (e.g., `security@rimorlabs.eu`).

---

## 6. Custom Domain & DNS Configuration on Netlify

1. In your Netlify dashboard, navigate to **Domain management → Add a domain**.
2. Enter your custom domain (e.g., `rimorlabs.eu` or `rimorlabs.com`) and click **Verify**.
3. Configure DNS at your domain registrar using either **Netlify DNS** or **External DNS records**:

### Option A: External DNS Records (Recommended if keeping email/MX at your current DNS provider)
Add the following records at your DNS provider:

| Type | Host / Name | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (root/apex) | `75.2.60.5` | `3600` |
| **CNAME** | `www` | `<your-site-subdomain>.netlify.app.` | `3600` |
| **CAA** *(optional)* | `@` | `0 issue "letsencrypt.org"` | `3600` |

### Option B: Netlify Managed DNS
Delegate your domain's nameservers to the 4 `dns1.p0X.nsone.net` nameservers shown in the Netlify dashboard.

4. **TLS / HTTPS Provisioning:** Once DNS propagates, go to **Domain management → HTTPS** and click **Verify DNS configuration → Provision certificate**. Netlify automatically provisions and renews a free Let's Encrypt TLS certificate, and our `Strict-Transport-Security` header in `netlify.toml` and `_headers` enforces HTTPS across all routes.

---

## 7. Security Posture Checklist

- **RFC 9116 Disclosure Policy:** Update the expiration date, contact email, canonical URL, and OpenPGP fingerprint in [`.well-known/security.txt`](./.well-known/security.txt) and [`index.html`](./index.html) when rotating keys.
- **Security Headers Verification:** After connecting your custom domain, test your live URL on [SecurityHeaders.com](https://securityheaders.com/) to confirm your **A+** grade.
