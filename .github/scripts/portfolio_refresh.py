from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
INDEX = ROOT / "index.html"
CSS = ROOT / "css/style.css"
CV_DIR = ROOT / "CV"

html = INDEX.read_text(encoding="utf-8")

replacements = {
    '<title>Asim Ali | Laravel & PHP Backend Developer</title>': '<title>Asim Ali | Senior Laravel Backend Developer | Full-Stack PHP Developer</title>',
    '<meta name="description" content="Portfolio of Asim Ali, a Laravel & PHP Backend Developer specializing in REST APIs, MySQL database design, CodeIgniter, feature development, and web application maintenance.">': '<meta name="description" content="Portfolio of Asim Ali, Senior Laravel Backend Developer and Full-Stack PHP Developer with 4+ years of experience building web applications, RESTful APIs, MySQL databases, third-party integrations, and production deployments.">',
    '<meta name="keywords" content="Asim Ali, Laravel Developer, PHP Developer, Backend Developer, MySQL Expert, CodeIgniter, REST APIs, Freelancer Sahiwal, Pakistan">': '<meta name="keywords" content="Asim Ali, Senior Laravel Backend Developer, Full-Stack PHP Developer, Laravel, PHP, CodeIgniter 3, RESTful APIs, MySQL, Docker, AWS, Pakistan Remote">',
    '<meta property="og:title" content="Asim Ali | Laravel & PHP Backend Developer">': '<meta property="og:title" content="Asim Ali | Senior Laravel Backend Developer | Full-Stack PHP Developer">',
    '<meta property="og:description" content="I help businesses and development agencies fix Laravel/PHP issues, build backend features, integrate APIs, optimize MySQL databases, and deploy web applications.">': '<meta property="og:description" content="Backend-focused Laravel and PHP developer with 4+ years of experience building web applications, RESTful APIs, optimized MySQL databases, third-party integrations, and production deployments.">',
    '<meta name="twitter:title" content="Asim Ali | Laravel & PHP Backend Developer">': '<meta name="twitter:title" content="Asim Ali | Senior Laravel Backend Developer | Full-Stack PHP Developer">',
    '<meta name="twitter:description" content="I help businesses and development agencies fix Laravel/PHP issues, build backend features, integrate APIs, optimize MySQL databases, and deploy web applications.">': '<meta name="twitter:description" content="Backend-focused Laravel and PHP developer with 4+ years of experience building web applications, RESTful APIs, optimized MySQL databases, third-party integrations, and production deployments.">',
    '"jobTitle": "Laravel & PHP Backend Developer"': '"jobTitle": "Senior Laravel Backend Developer | Full-Stack PHP Developer"',
    '"knowsAbout": ["PHP", "Laravel", "CodeIgniter", "MySQL", "API Design", "SEO Optimization", "Web Application Development"]': '"knowsAbout": ["PHP", "Laravel", "CodeIgniter 3", "RESTful APIs", "MySQL", "JavaScript", "AJAX", "Tailwind CSS", "Bootstrap", "Docker", "CI/CD", "AWS", "Linux", "VPS", "cPanel"]',
    '<span class="hero-subtitle">Laravel & PHP Backend Developer</span>': '<span class="hero-subtitle">Senior Laravel Backend Developer | Full-Stack PHP Developer</span>',
    '<p>I help businesses and development agencies fix Laravel/PHP issues, build backend features, integrate APIs, optimize MySQL databases, and deploy reliable web applications. Available for remote jobs, freelance projects, and monthly Laravel/PHP maintenance.</p>': '<p>Backend-focused Laravel and PHP developer with 4+ years of experience building and maintaining web applications, RESTful APIs, and MySQL databases. I deliver backend development, query optimization, third-party integrations, and production deployments for remote and freelance projects.</p>',
    '<p>Sahiwal, Pakistan (GMT+5)</p>': '<p>Pakistan (Remote)</p>',
    '+92 315 4936412': '+92 315-4936412',
}
for old, new in replacements.items():
    html = html.replace(old, new)

html = html.replace(
    '<li><a href="#about">About</a></li>\n                <li><a href="#skills">Skills</a></li>',
    '<li><a href="#about">About</a></li>\n                <li><a href="#services">Services</a></li>\n                <li><a href="#skills">Skills</a></li>'
)
html = html.replace(
    'I am a <span class="text-gradient multiple-text"></span>',
    'I am a <span class="text-gradient">Senior Laravel Backend Developer</span>'
)

about = '''    <!-- About Section -->
    <section class="section-padding container" id="about">
        <div class="about-grid">
            <div class="about-image reveal-left">
                <img src="img/asim-workspace-new.webp" alt="Asim Ali working as a Laravel and PHP developer" class="glass" style="padding: 1rem;">
            </div>
            <div class="about-info reveal-right">
                <span class="eyebrow">PROFESSIONAL SUMMARY</span>
                <h3>Backend-first engineering for <span class="text-gradient">reliable web products</span></h3>
                <p>Backend-focused Laravel and PHP developer with 4+ years of experience building and maintaining web applications, RESTful APIs, and MySQL databases. Delivered solutions across real estate, business directories, e-commerce, and point-of-sale systems.</p>
                <p>Skilled in backend development, query optimization, third-party integrations, and production deployment. Currently working as an independent full-stack freelance developer from Pakistan.</p>
                <div class="stats-grid cv-stats">
                    <div class="stat-item glass"><div class="stat-number" data-target="4" data-suffix="+">0</div><div class="stat-label">Years Experience</div></div>
                    <div class="stat-item glass"><div class="stat-number" data-target="4" data-suffix="">0</div><div class="stat-label">Industry Areas</div></div>
                    <div class="stat-item glass"><div class="stat-number" data-target="2" data-suffix="">0</div><div class="stat-label">Working Languages</div></div>
                </div>
            </div>
        </div>
    </section>
'''
html = re.sub(r'    <!-- About Section -->.*?    <!-- Services Section -->', about + '\n    <!-- Services Section -->', html, flags=re.S)

services = '''    <!-- Services Section -->
    <section class="section-padding services-section" id="services">
        <div class="container">
            <div class="section-title reveal-scale">
                <span class="eyebrow">WHAT I BUILD & SUPPORT</span>
                <h2>Modern <span class="text-gradient">Backend Services</span></h2>
                <p>Laravel/PHP development, APIs, MySQL, responsive frontend work, deployment, and production support.</p>
            </div>
            <div class="services-grid service-lab stagger-grid">
                <article class="service-card glass"><div class="service-visual"><div class="code-window"><span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span><div class="code-line w80"></div><div class="code-line w55"></div><div class="code-line w68"></div><div class="code-cursor"></div></div><div class="framework-orbit"><span>PHP</span><b>L</b></div></div><div class="service-copy"><div class="service-icon"><i data-lucide="braces"></i></div><h3>Laravel & PHP Development</h3><p>Custom web applications using Laravel, Core PHP, and CodeIgniter 3, with maintainable backend architecture and production-ready workflows.</p></div></article>
                <article class="service-card glass"><div class="service-visual api-visual"><div class="api-node"><i data-lucide="monitor-smartphone"></i></div><div class="api-track"><span class="packet"></span><span class="packet p2"></span></div><div class="api-node">API</div><div class="api-track"><span class="packet p3"></span></div><div class="api-node"><i data-lucide="cloud"></i></div></div><div class="service-copy"><div class="service-icon"><i data-lucide="network"></i></div><h3>REST APIs & Integrations</h3><p>RESTful API development plus third-party API, payment gateway, and external service integrations that keep systems synchronized.</p></div></article>
                <article class="service-card glass"><div class="service-visual database-visual"><div class="db-stack"><span></span><span></span><span></span></div><div class="query-beam"><span></span></div><div class="query-chip">SELECT • INDEX • OPTIMIZE</div></div><div class="service-copy"><div class="service-icon"><i data-lucide="database"></i></div><h3>MySQL Database Engineering</h3><p>Database design, indexing, query optimization, and performance tuning for transaction-heavy workflows and growing applications.</p></div></article>
                <article class="service-card glass"><div class="service-visual frontend-visual"><div class="device-frame desktop-frame"><span></span><span></span><span></span></div><div class="device-frame tablet-frame"><span></span><span></span></div><div class="device-frame mobile-frame"><span></span><span></span><span></span></div></div><div class="service-copy"><div class="service-icon"><i data-lucide="panels-top-left"></i></div><h3>Responsive Frontend Integration</h3><p>Responsive interfaces using JavaScript, AJAX, HTML5, CSS3, Tailwind CSS, and Bootstrap, connected cleanly to backend workflows.</p></div></article>
                <article class="service-card glass"><div class="service-visual devops-visual"><div class="deploy-source"><i data-lucide="git-branch"></i></div><div class="deploy-road"><span class="deploy-pulse"></span></div><div class="deploy-cloud"><i data-lucide="cloud-cog"></i></div><div class="server-rack"><span></span><span></span><span></span></div></div><div class="service-copy"><div class="service-icon"><i data-lucide="cloud-cog"></i></div><h3>Deployment & DevOps</h3><p>Docker, CI/CD, AWS, Git/GitHub, Linux, VPS, cPanel, Composer, and npm workflows for practical production deployments.</p></div></article>
                <article class="service-card glass"><div class="service-visual support-visual"><div class="health-ring"><i data-lucide="wrench"></i></div><div class="health-chart"><span></span><span></span><span></span><span></span><span></span></div><div class="status-pill"><span></span> Production healthy</div></div><div class="service-copy"><div class="service-icon"><i data-lucide="shield-check"></i></div><h3>Maintenance & Production Reliability</h3><p>Bug fixing, testing support, code review collaboration, production troubleshooting, and ongoing reliability improvements.</p></div></article>
            </div>
            <div class="section-cta reveal-scale"><a href="#contact" class="btn-primary"><i data-lucide="message-square-more"></i> Discuss Your Project</a></div>
        </div>
    </section>
'''
html = re.sub(r'    <!-- Services Section -->.*?    <!-- Skills Section -->', services + '\n    <!-- Skills Section -->', html, flags=re.S)

skills = '''    <!-- Skills Section -->
    <section class="section-padding container" id="skills">
        <div class="section-title reveal-scale"><span class="eyebrow">CV TECHNICAL SKILLS</span><h2>Technical <span class="text-gradient">Stack</span></h2><p>The technologies and engineering areas listed in my current professional CV.</p></div>
        <div class="skills-wrapper cv-skills-grid">
            <div class="skills-category-box glass reveal-left"><h3><i class="bx bx-server text-gradient"></i> Backend</h3><div class="skills-list"><span class="project-tag">PHP</span><span class="project-tag">Laravel</span><span class="project-tag">CodeIgniter 3</span><span class="project-tag">RESTful APIs</span><span class="project-tag">Third-party API integrations</span></div></div>
            <div class="skills-category-box glass reveal-right"><h3><i class="bx bx-code-block text-gradient"></i> Frontend</h3><div class="skills-list"><span class="project-tag">JavaScript</span><span class="project-tag">AJAX</span><span class="project-tag">HTML5</span><span class="project-tag">CSS3</span><span class="project-tag">Tailwind CSS</span><span class="project-tag">Bootstrap</span></div></div>
            <div class="skills-category-box glass reveal-left"><h3><i class="bx bx-data text-gradient"></i> Databases</h3><div class="skills-list"><span class="project-tag">MySQL</span><span class="project-tag">Database design</span><span class="project-tag">Indexing</span><span class="project-tag">Query optimization</span><span class="project-tag">Performance tuning</span></div></div>
            <div class="skills-category-box glass reveal-right"><h3><i class="bx bx-cog text-gradient"></i> DevOps & Tools</h3><div class="skills-list"><span class="project-tag">Docker</span><span class="project-tag">CI/CD</span><span class="project-tag">AWS</span><span class="project-tag">Git</span><span class="project-tag">GitHub</span><span class="project-tag">Linux</span><span class="project-tag">VPS</span><span class="project-tag">cPanel</span><span class="project-tag">Composer</span><span class="project-tag">npm</span></div></div>
        </div>
        <div class="language-strip glass reveal-scale"><div><i data-lucide="languages"></i><span><strong>English</strong><small>Professional Working</small></span></div><div><i data-lucide="message-circle"></i><span><strong>Urdu</strong><small>Native</small></span></div></div>
    </section>
'''
html = re.sub(r'    <!-- Skills Section -->.*?    <!-- Timeline Section -->', skills + '\n    <!-- Timeline Section -->', html, flags=re.S)

timeline = '''    <!-- Timeline Section -->
    <section class="section-padding" id="timeline" style="background: var(--bg-secondary);"><div class="container"><div class="section-title reveal-scale"><span class="eyebrow">CV EXPERIENCE & EDUCATION</span><h2>Professional <span class="text-gradient">Timeline</span></h2><p>Experience and education dates aligned with my current CV.</p></div><div class="timeline">
        <div class="timeline-item left reveal-left"><div class="timeline-content glass"><div class="timeline-date">Aug 2025 - Present</div><h3>Full-Stack Freelance Developer</h3><div class="timeline-institution">Fiverr / Self-Employed</div><ul><li>Develop custom web applications for international clients using Laravel, Core PHP, and CodeIgniter 3.</li><li>Build responsive interfaces with Tailwind CSS, Bootstrap, JavaScript, and AJAX.</li><li>Develop RESTful APIs, optimize database schemas, and deploy applications to production VPS environments.</li></ul></div></div>
        <div class="timeline-item right reveal-right"><div class="timeline-content glass"><div class="timeline-date">2022 - Aug 2025</div><h3>Backend Developer</h3><div class="timeline-institution">HaddockSoft</div><ul><li>Developed and maintained enterprise web applications using PHP, Laravel, and CodeIgniter 3.</li><li>Designed MySQL schemas and optimized queries for transaction-heavy application workflows.</li><li>Integrated payment gateways and third-party APIs; collaborated on code review, testing, and production reliability.</li></ul></div></div>
        <div class="timeline-item left reveal-left"><div class="timeline-content glass"><div class="timeline-date">2022 - 2023</div><h3>Backend Developer (Intern)</h3><div class="timeline-institution">POS Project</div><ul><li>Built PHP and MySQL backend modules for a multi-user point-of-sale management platform.</li><li>Developed RESTful APIs connecting sales, inventory, and reporting modules.</li></ul></div></div>
        <div class="timeline-item right reveal-right"><div class="timeline-content glass"><div class="timeline-date">2024 - Present</div><h3>BS Computer Science</h3><div class="timeline-institution">Govt. Postgraduate College, Sahiwal</div><p class="timeline-note">Currently in progress.</p></div></div>
        <div class="timeline-item left reveal-left"><div class="timeline-content glass"><div class="timeline-date">Completed 2022</div><h3>Intermediate (FSc)</h3><div class="timeline-institution">Govt. Postgraduate College, Sahiwal</div></div></div>
    </div></div></section>
'''
html = re.sub(r'    <!-- Timeline Section -->.*?    <!-- Projects Section -->', timeline + '\n    <!-- Projects Section -->', html, flags=re.S)

projects = '''    <!-- Projects Section -->
    <section class="section-padding container" id="portfolio"><div class="section-title reveal-scale"><span class="eyebrow">SELECTED PROJECTS FROM CV</span><h2>Project <span class="text-gradient">Experience</span></h2><p>Representative work listed in my current CV, with descriptions kept aligned to that document.</p></div><div class="projects-grid cv-projects-grid stagger-grid">
        <article class="project-card glass cv-project-card"><div class="project-img"><img src="img/portfolio pics/apnasahiwal.webp" alt="ApnaSahiwal.com business directory" loading="lazy"></div><div class="project-content"><div class="project-tags"><span class="project-tag">Laravel</span><span class="project-tag">MySQL</span><span class="project-tag">JavaScript</span><span class="project-tag">AJAX</span><span class="project-tag">Tailwind CSS</span></div><h3>ApnaSahiwal.com</h3><p>Built a business directory with dynamic categories, search, and an admin management panel.</p><a href="https://apnasahiwal.com" target="_blank" rel="noopener noreferrer" class="project-link"><i data-lucide="external-link"></i> Visit project</a></div></article>
        <article class="project-card glass cv-project-card"><div class="project-img"><img src="img/portfolio pics/Luxliving.webp" alt="LuxLiving and One Earth Properties" loading="lazy"></div><div class="project-content"><div class="project-tags"><span class="project-tag">Laravel</span><span class="project-tag">CodeIgniter 3</span><span class="project-tag">MySQL</span><span class="project-tag">REST APIs</span></div><h3>LuxLiving / One Earth Properties</h3><p>Developed property listing modules, inquiry tracking workflows, and backend search components.</p></div></article>
        <article class="project-card glass cv-project-card"><div class="project-img"><img src="img/portfolio pics/oshaacademy.webp" alt="OSHAAcademy.us and AllToolPro" loading="lazy"></div><div class="project-content"><div class="project-tags"><span class="project-tag">PHP</span><span class="project-tag">Laravel</span><span class="project-tag">REST APIs</span><span class="project-tag">MySQL</span></div><h3>OSHAAcademy.us / AllToolPro</h3><p>Developed backend modules, user workflows, and APIs for compliance and web utility platforms.</p></div></article>
        <article class="project-card glass cv-project-card"><div class="project-img project-collage"><img src="img/portfolio pics/skillfulsahiwal-image.webp" alt="Skillful Sahiwal" loading="lazy"><img src="img/portfolio pics/ibazar.webp" alt="iBazar" loading="lazy"><img src="img/portfolio pics/point-of-sale.webp" alt="POS System" loading="lazy"></div><div class="project-content"><div class="project-tags"><span class="project-tag">Laravel</span><span class="project-tag">PHP</span><span class="project-tag">MySQL</span></div><h3>Skillful Sahiwal / iBazar / POS System</h3><p>Worked on learning management, e-commerce, and POS applications covering user workflows, orders, payment integration, and inventory management.</p></div></article>
    </div></section>
'''
html = re.sub(r'    <!-- Projects Section -->.*?    <!-- GitHub Section -->', projects + '\n    <!-- GitHub Section -->', html, flags=re.S)
html = html.replace('Have a Laravel/PHP project, backend issue, API integration, or remote opportunity? Send me the project details and I will review the requirements.', 'Have a Laravel/PHP project, REST API, MySQL database task, deployment requirement, or remote opportunity? Send me the project details and I will review the requirements.')
INDEX.write_text(html, encoding="utf-8")

css = CSS.read_text(encoding="utf-8")
marker = 'CV-ALIGNED-SERVICE-REFRESH'
if marker not in css:
    css += r'''

/* CV-ALIGNED-SERVICE-REFRESH */
.eyebrow{display:inline-flex;align-items:center;gap:.55rem;margin-bottom:.9rem;color:var(--accent);font-family:'Outfit',sans-serif;font-size:.76rem;font-weight:800;letter-spacing:.16em}.eyebrow:before{content:'';width:28px;height:2px;border-radius:999px;background:var(--accent-gradient)}
.services-section{position:relative;overflow:hidden;background:radial-gradient(circle at 15% 15%,rgba(59,130,246,.14),transparent 28%),radial-gradient(circle at 85% 80%,rgba(139,92,246,.12),transparent 30%),var(--bg-secondary)}.services-section:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.18;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:42px 42px}.service-lab{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem}.service-lab .service-card{position:relative;display:grid;grid-template-columns:minmax(190px,.9fr) minmax(0,1.1fr);align-items:center;gap:1.6rem;min-height:290px;padding:1.35rem;overflow:hidden}.service-lab .service-card:hover{transform:translateY(-7px) perspective(900px) rotateX(1deg) rotateY(-1deg)}.service-copy .service-icon{margin-bottom:.85rem}.service-copy h3{margin-bottom:.65rem}.service-copy p{line-height:1.75}.service-visual{position:relative;min-height:190px;border-radius:18px;border:1px solid rgba(99,102,241,.2);background:linear-gradient(145deg,rgba(3,7,18,.92),rgba(15,23,42,.72));box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 20px 45px rgba(2,6,23,.26);overflow:hidden}.service-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(96,165,250,.12) 50%,transparent 65%);transform:translateX(-130%);animation:service-scan 5.5s ease-in-out infinite}[data-theme="light"] .service-visual{background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(239,246,255,.95))}
.code-window{position:absolute;left:18px;top:28px;width:70%;height:132px;padding:34px 16px 14px;border:1px solid rgba(96,165,250,.26);border-radius:13px;background:rgba(2,6,23,.58)}.window-dot{position:relative;display:inline-block;top:-25px;width:7px;height:7px;margin-right:4px;border-radius:50%;background:var(--accent)}.code-line{height:7px;margin-bottom:11px;border-radius:999px;background:linear-gradient(90deg,rgba(96,165,250,.95),rgba(139,92,246,.38));transform-origin:left;animation:code-build 3.4s ease-in-out infinite}.w80{width:80%}.w55{width:55%;animation-delay:.25s}.w68{width:68%;animation-delay:.5s}.code-cursor{width:2px;height:14px;background:#60a5fa;animation:cursor-blink .8s steps(1) infinite}.framework-orbit{position:absolute;right:12px;bottom:15px;width:72px;height:72px;border:1px dashed rgba(139,92,246,.55);border-radius:50%;animation:orbit-spin 8s linear infinite}.framework-orbit b,.framework-orbit span{position:absolute;display:grid;place-items:center;border-radius:9px;font-family:'Outfit';font-weight:800}.framework-orbit b{inset:17px;color:white;background:var(--accent-gradient)}.framework-orbit span{width:34px;height:24px;left:-17px;top:23px;color:#60a5fa;font-size:.7rem;background:#0f172a}
.api-visual{display:flex;align-items:center;justify-content:center;padding:20px}.api-node{z-index:2;width:54px;height:54px;display:grid;place-items:center;flex:0 0 54px;border-radius:14px;color:#dbeafe;font-weight:800;background:rgba(30,64,175,.35);border:1px solid rgba(96,165,250,.4)}.api-track{position:relative;width:46px;height:2px;background:linear-gradient(90deg,rgba(96,165,250,.15),rgba(96,165,250,.8),rgba(96,165,250,.15))}.packet{position:absolute;top:-4px;left:-5px;width:10px;height:10px;border-radius:50%;background:#60a5fa;box-shadow:0 0 16px #3b82f6;animation:packet-move 1.8s linear infinite}.p2{animation-delay:.9s}.p3{animation-delay:.45s}
.database-visual{display:grid;place-items:center}.db-stack{position:relative;width:92px;height:105px}.db-stack span{position:absolute;left:0;width:92px;height:36px;border-radius:50% / 28%;border:1px solid rgba(96,165,250,.5);background:linear-gradient(180deg,rgba(59,130,246,.38),rgba(30,64,175,.16))}.db-stack span:nth-child(1){top:0}.db-stack span:nth-child(2){top:28px}.db-stack span:nth-child(3){top:56px}.query-beam{position:absolute;left:24px;right:24px;top:50%;height:2px;background:rgba(139,92,246,.16);overflow:hidden}.query-beam span{display:block;width:34%;height:100%;background:linear-gradient(90deg,transparent,#a78bfa,transparent);animation:beam-move 2.1s linear infinite}.query-chip{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:.61rem;font-weight:700;letter-spacing:.08em;color:#93c5fd}
.device-frame{position:absolute;border:1px solid rgba(96,165,250,.4);background:rgba(15,23,42,.72);border-radius:10px;animation:device-float 4.6s ease-in-out infinite}.device-frame span{display:block;height:7px;margin:9px;border-radius:10px;background:linear-gradient(90deg,rgba(96,165,250,.9),rgba(139,92,246,.36))}.desktop-frame{width:128px;height:86px;left:22px;top:36px}.tablet-frame{width:75px;height:98px;right:24px;top:28px;animation-delay:.6s}.mobile-frame{width:46px;height:82px;right:70px;bottom:18px;animation-delay:1.1s}
.devops-visual{display:flex;align-items:center;justify-content:center;gap:10px;padding:20px}.deploy-source,.deploy-cloud{width:46px;height:46px;display:grid;place-items:center;border-radius:13px;border:1px solid rgba(96,165,250,.35);background:rgba(30,64,175,.22);color:#93c5fd;z-index:2}.deploy-road{position:relative;width:58px;height:4px;border-radius:999px;background:rgba(96,165,250,.22)}.deploy-pulse{position:absolute;top:-4px;left:-4px;width:12px;height:12px;border-radius:50%;background:#60a5fa;box-shadow:0 0 18px #3b82f6;animation:deploy-run 2s linear infinite}.server-rack{position:absolute;right:16px;bottom:14px;width:62px;padding:6px;border:1px solid rgba(139,92,246,.35);border-radius:9px;background:rgba(15,23,42,.7)}.server-rack span{display:block;height:8px;margin:4px 0;border-radius:3px;background:linear-gradient(90deg,#4f46e5,#60a5fa);animation:rack-pulse 1.8s ease-in-out infinite}
.support-visual{display:grid;place-items:center}.health-ring{width:76px;height:76px;display:grid;place-items:center;border-radius:50%;color:#93c5fd;border:1px solid rgba(96,165,250,.35);background:radial-gradient(circle,rgba(59,130,246,.22),transparent 68%);animation:health-pulse 2.3s ease-out infinite}.health-chart{position:absolute;left:16px;bottom:22px;display:flex;align-items:end;gap:4px;height:44px}.health-chart span{width:7px;border-radius:4px 4px 1px 1px;background:linear-gradient(#60a5fa,#4f46e5);animation:bar-wave 1.6s ease-in-out infinite}.health-chart span:nth-child(1){height:40%}.health-chart span:nth-child(2){height:70%}.health-chart span:nth-child(3){height:52%}.health-chart span:nth-child(4){height:88%}.health-chart span:nth-child(5){height:62%}.status-pill{position:absolute;right:12px;bottom:18px;padding:5px 8px;border-radius:999px;font-size:.58rem;color:#bfdbfe;border:1px solid rgba(96,165,250,.3);background:rgba(30,64,175,.22)}.status-pill span{display:inline-block;width:6px;height:6px;margin-right:4px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}
.section-cta{text-align:center;margin-top:3rem}.cv-skills-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem}.cv-skills-grid .skills-category-box{padding:2rem}.cv-skills-grid .skills-list{display:flex;flex-wrap:wrap;gap:.7rem}.language-strip{margin-top:1.4rem;padding:1.15rem 1.35rem;display:flex;gap:1rem}.language-strip>div{flex:1;display:flex;align-items:center;justify-content:center;gap:.75rem;padding:.9rem;border-radius:12px;background:rgba(59,130,246,.055);border:1px solid rgba(96,165,250,.12)}.language-strip span{display:flex;flex-direction:column}.language-strip small{color:var(--text-secondary)}.timeline-note{margin-top:.6rem;color:var(--text-secondary)}.cv-projects-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.cv-project-card{display:flex;flex-direction:column}.cv-project-card .project-content{flex:1;display:flex;flex-direction:column}.cv-project-card .project-content p{flex:1}.project-collage{display:grid!important;grid-template-columns:1.2fr .8fr;grid-template-rows:1fr 1fr;gap:3px}.project-collage img{width:100%;height:100%;object-fit:cover}.project-collage img:first-child{grid-row:1/3}
@keyframes service-scan{0%,58%{transform:translateX(-130%)}82%,100%{transform:translateX(130%)}}@keyframes code-build{0%,100%{transform:scaleX(.45);opacity:.45}45%,75%{transform:scaleX(1);opacity:1}}@keyframes cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes orbit-spin{to{transform:rotate(360deg)}}@keyframes packet-move{from{transform:translateX(0)}to{transform:translateX(50px)}}@keyframes beam-move{from{transform:translateX(-120%)}to{transform:translateX(330%)}}@keyframes device-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes deploy-run{from{transform:translateX(0)}to{transform:translateX(60px)}}@keyframes rack-pulse{0%,100%{opacity:.38}50%{opacity:1}}@keyframes health-pulse{0%{box-shadow:0 0 0 0 rgba(59,130,246,.3)}70%{box-shadow:0 0 0 22px rgba(59,130,246,0)}100%{box-shadow:0 0 0 0 rgba(59,130,246,0)}}@keyframes bar-wave{0%,100%{transform:scaleY(.6);opacity:.55}50%{transform:scaleY(1);opacity:1}}
@media(max-width:1050px){.service-lab{grid-template-columns:1fr}.service-lab .service-card{grid-template-columns:220px 1fr}}@media(max-width:768px){.service-lab .service-card{grid-template-columns:1fr;min-height:0;padding:1rem}.service-visual{min-height:168px}.cv-skills-grid,.cv-projects-grid{grid-template-columns:1fr}.language-strip{flex-direction:column}}@media(prefers-reduced-motion:reduce){.service-visual:after,.code-line,.code-cursor,.framework-orbit,.packet,.query-beam span,.device-frame,.deploy-pulse,.server-rack span,.health-ring,.health-chart span{animation:none!important}}
'''
    CSS.write_text(css, encoding="utf-8")

cv_md = '''# ASIM ALI
**Senior Laravel Backend Developer | Full-Stack PHP Developer**

Pakistan (Remote) | +92 315-4936412 | asimgee105@gmail.com  
Portfolio: https://asimgee105.github.io/Portfolio/

## PROFESSIONAL SUMMARY
Backend-focused Laravel and PHP developer with 4+ years of experience building and maintaining web applications, RESTful APIs, and MySQL databases. Delivered solutions across real estate, business directories, e-commerce, and point-of-sale systems. Skilled in backend development, query optimization, third-party integrations, and production deployment. Currently working as an independent full-stack freelance developer.

## TECHNICAL SKILLS
- **Backend:** PHP, Laravel, CodeIgniter 3, RESTful APIs, third-party API integrations
- **Frontend:** JavaScript, AJAX, HTML5, CSS3, Tailwind CSS, Bootstrap
- **Databases:** MySQL, database design, indexing, query optimization, performance tuning
- **DevOps and tools:** Docker, CI/CD, AWS, Git, GitHub, Linux, VPS, cPanel, Composer, npm

## PROFESSIONAL EXPERIENCE
### Full-Stack Freelance Developer | Fiverr / Self-Employed | Aug 2025 - Present
- Develop custom web applications for international clients using Laravel, Core PHP, and CodeIgniter 3.
- Build responsive interfaces with Tailwind CSS, Bootstrap, JavaScript, and AJAX.
- Develop RESTful APIs, optimize database schemas, and deploy applications to production VPS environments.

### Backend Developer | HaddockSoft | 2022 - Aug 2025
- Developed and maintained enterprise web applications using PHP, Laravel, and CodeIgniter 3.
- Designed MySQL schemas and optimized queries for transaction-heavy application workflows.
- Integrated payment gateways and third-party APIs to synchronize data across systems.
- Collaborated with frontend developers, reviewed code, and supported testing and production reliability.

### Backend Developer (Intern) | POS Project | 2022 - 2023
- Built PHP and MySQL backend modules for a multi-user point-of-sale management platform.
- Developed RESTful APIs connecting sales, inventory, and reporting modules.

## SELECTED PROJECTS
### ApnaSahiwal.com | Laravel, MySQL, JavaScript, AJAX, Tailwind CSS
Built a business directory with dynamic categories, search, and an admin management panel.

### LuxLiving / One Earth Properties | Laravel, CodeIgniter 3, MySQL, REST APIs
Developed property listing modules, inquiry tracking workflows, and backend search components.

### OSHAAcademy.us / AllToolPro | PHP, Laravel, REST APIs, MySQL
Developed backend modules, user workflows, and APIs for compliance and web utility platforms.

### Skillful Sahiwal / iBazar / POS System | Laravel, PHP, MySQL
Worked on learning management, e-commerce, and POS applications covering user workflows, orders, payment integration, and inventory management.

## EDUCATION
**BS Computer Science | Govt. Postgraduate College, Sahiwal | 2024 - Present**  
**Intermediate (FSc) | Govt. Postgraduate College, Sahiwal | Completed 2022**

## LANGUAGES
English: Professional Working | Urdu: Native
'''
(CV_DIR / 'Asim-Ali-Laravel-PHP-Developer-Resume.md').write_text(cv_md, encoding='utf-8')

cv_html = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Asim Ali — Professional CV</title><style>body{font-family:Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 24px;color:#172033;line-height:1.55}h1{margin-bottom:0}h2{border-bottom:2px solid #e5e7eb;padding-bottom:6px;margin-top:28px}h3{margin-bottom:4px}.role{font-weight:700;color:#1d4ed8}.meta{color:#475569}</style></head><body><h1>ASIM ALI</h1><p class="role">Senior Laravel Backend Developer | Full-Stack PHP Developer</p><p class="meta">Pakistan (Remote) | +92 315-4936412 | asimgee105@gmail.com<br>Portfolio: asimgee105.github.io/Portfolio/</p><h2>PROFESSIONAL SUMMARY</h2><p>Backend-focused Laravel and PHP developer with 4+ years of experience building and maintaining web applications, RESTful APIs, and MySQL databases. Delivered solutions across real estate, business directories, e-commerce, and point-of-sale systems. Skilled in backend development, query optimization, third-party integrations, and production deployment. Currently working as an independent full-stack freelance developer.</p><h2>TECHNICAL SKILLS</h2><p><b>Backend:</b> PHP, Laravel, CodeIgniter 3, RESTful APIs, third-party API integrations</p><p><b>Frontend:</b> JavaScript, AJAX, HTML5, CSS3, Tailwind CSS, Bootstrap</p><p><b>Databases:</b> MySQL, database design, indexing, query optimization, performance tuning</p><p><b>DevOps and tools:</b> Docker, CI/CD, AWS, Git, GitHub, Linux, VPS, cPanel, Composer, npm</p><h2>PROFESSIONAL EXPERIENCE</h2><h3>Full-Stack Freelance Developer | Fiverr / Self-Employed | Aug 2025 - Present</h3><ul><li>Develop custom web applications for international clients using Laravel, Core PHP, and CodeIgniter 3.</li><li>Build responsive interfaces with Tailwind CSS, Bootstrap, JavaScript, and AJAX.</li><li>Develop RESTful APIs, optimize database schemas, and deploy applications to production VPS environments.</li></ul><h3>Backend Developer | HaddockSoft | 2022 - Aug 2025</h3><ul><li>Developed and maintained enterprise web applications using PHP, Laravel, and CodeIgniter 3.</li><li>Designed MySQL schemas and optimized queries for transaction-heavy application workflows.</li><li>Integrated payment gateways and third-party APIs to synchronize data across systems.</li><li>Collaborated with frontend developers, reviewed code, and supported testing and production reliability.</li></ul><h3>Backend Developer (Intern) | POS Project | 2022 - 2023</h3><ul><li>Built PHP and MySQL backend modules for a multi-user point-of-sale management platform.</li><li>Developed RESTful APIs connecting sales, inventory, and reporting modules.</li></ul><h2>SELECTED PROJECTS</h2><p><b>ApnaSahiwal.com | Laravel, MySQL, JavaScript, AJAX, Tailwind CSS</b><br>Built a business directory with dynamic categories, search, and an admin management panel.</p><p><b>LuxLiving / One Earth Properties | Laravel, CodeIgniter 3, MySQL, REST APIs</b><br>Developed property listing modules, inquiry tracking workflows, and backend search components.</p><p><b>OSHAAcademy.us / AllToolPro | PHP, Laravel, REST APIs, MySQL</b><br>Developed backend modules, user workflows, and APIs for compliance and web utility platforms.</p><p><b>Skillful Sahiwal / iBazar / POS System | Laravel, PHP, MySQL</b><br>Worked on learning management, e-commerce, and POS applications covering user workflows, orders, payment integration, and inventory management.</p><h2>EDUCATION</h2><p><b>BS Computer Science | Govt. Postgraduate College, Sahiwal | 2024 - Present</b></p><p><b>Intermediate (FSc) | Govt. Postgraduate College, Sahiwal | Completed 2022</b></p><h2>LANGUAGES</h2><p>English: Professional Working | Urdu: Native</p></body></html>'''
(CV_DIR / 'Asim-Ali-Laravel-PHP-Developer-Resume.html').write_text(cv_html, encoding='utf-8')

# Generate a clean PDF with the same current CV information.
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, KeepTogether
from reportlab.lib import colors
from reportlab.lib.units import mm

pdf_path = CV_DIR / 'Asim-Ali-Laravel-PHP-Developer-Resume.pdf'
doc = SimpleDocTemplate(str(pdf_path), pagesize=A4, rightMargin=16*mm, leftMargin=16*mm, topMargin=13*mm, bottomMargin=13*mm)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameX', parent=styles['Title'], fontSize=22, leading=24, alignment=TA_CENTER, spaceAfter=2))
styles.add(ParagraphStyle(name='RoleX', parent=styles['Normal'], fontSize=10.5, textColor=colors.HexColor('#1d4ed8'), alignment=TA_CENTER, spaceAfter=4))
styles.add(ParagraphStyle(name='MetaX', parent=styles['Normal'], fontSize=8.5, textColor=colors.HexColor('#475569'), alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name='HeadingX', parent=styles['Heading2'], fontSize=11, leading=13, textColor=colors.HexColor('#111827'), spaceBefore=7, spaceAfter=4))
styles.add(ParagraphStyle(name='BodyX', parent=styles['BodyText'], fontSize=8.4, leading=11, spaceAfter=3))
styles.add(ParagraphStyle(name='JobX', parent=styles['BodyText'], fontSize=8.8, leading=11, textColor=colors.HexColor('#111827'), spaceBefore=4, spaceAfter=2))

story = [Paragraph('ASIM ALI', styles['NameX']), Paragraph('Senior Laravel Backend Developer | Full-Stack PHP Developer', styles['RoleX']), Paragraph('Pakistan (Remote) | +92 315-4936412 | asimgee105@gmail.com<br/>Portfolio: asimgee105.github.io/Portfolio/', styles['MetaX'])]
def heading(t): story.append(Paragraph(t, styles['HeadingX']))
def body(t): story.append(Paragraph(t, styles['BodyX']))
def bullets(items): story.append(ListFlowable([ListItem(Paragraph(x, styles['BodyX'])) for x in items], bulletType='bullet', leftIndent=12, bulletFontSize=5, spaceAfter=2))
heading('PROFESSIONAL SUMMARY'); body('Backend-focused Laravel and PHP developer with 4+ years of experience building and maintaining web applications, RESTful APIs, and MySQL databases. Delivered solutions across real estate, business directories, e-commerce, and point-of-sale systems. Skilled in backend development, query optimization, third-party integrations, and production deployment. Currently working as an independent full-stack freelance developer.')
heading('TECHNICAL SKILLS'); body('<b>Backend:</b> PHP, Laravel, CodeIgniter 3, RESTful APIs, third-party API integrations'); body('<b>Frontend:</b> JavaScript, AJAX, HTML5, CSS3, Tailwind CSS, Bootstrap'); body('<b>Databases:</b> MySQL, database design, indexing, query optimization, performance tuning'); body('<b>DevOps and tools:</b> Docker, CI/CD, AWS, Git, GitHub, Linux, VPS, cPanel, Composer, npm')
heading('PROFESSIONAL EXPERIENCE'); story.append(Paragraph('<b>Full-Stack Freelance Developer</b> | Fiverr / Self-Employed | Aug 2025 - Present', styles['JobX'])); bullets(['Develop custom web applications for international clients using Laravel, Core PHP, and CodeIgniter 3.','Build responsive interfaces with Tailwind CSS, Bootstrap, JavaScript, and AJAX.','Develop RESTful APIs, optimize database schemas, and deploy applications to production VPS environments.']); story.append(Paragraph('<b>Backend Developer</b> | HaddockSoft | 2022 - Aug 2025', styles['JobX'])); bullets(['Developed and maintained enterprise web applications using PHP, Laravel, and CodeIgniter 3.','Designed MySQL schemas and optimized queries for transaction-heavy application workflows.','Integrated payment gateways and third-party APIs to synchronize data across systems.','Collaborated with frontend developers, reviewed code, and supported testing and production reliability.']); story.append(Paragraph('<b>Backend Developer (Intern)</b> | POS Project | 2022 - 2023', styles['JobX'])); bullets(['Built PHP and MySQL backend modules for a multi-user point-of-sale management platform.','Developed RESTful APIs connecting sales, inventory, and reporting modules.'])
heading('SELECTED PROJECTS'); body('<b>ApnaSahiwal.com | Laravel, MySQL, JavaScript, AJAX, Tailwind CSS</b><br/>Built a business directory with dynamic categories, search, and an admin management panel.'); body('<b>LuxLiving / One Earth Properties | Laravel, CodeIgniter 3, MySQL, REST APIs</b><br/>Developed property listing modules, inquiry tracking workflows, and backend search components.'); body('<b>OSHAAcademy.us / AllToolPro | PHP, Laravel, REST APIs, MySQL</b><br/>Developed backend modules, user workflows, and APIs for compliance and web utility platforms.'); body('<b>Skillful Sahiwal / iBazar / POS System | Laravel, PHP, MySQL</b><br/>Worked on learning management, e-commerce, and POS applications covering user workflows, orders, payment integration, and inventory management.')
heading('EDUCATION'); body('<b>BS Computer Science | Govt. Postgraduate College, Sahiwal | 2024 - Present</b>'); body('<b>Intermediate (FSc) | Govt. Postgraduate College, Sahiwal | Completed 2022</b>'); heading('LANGUAGES'); body('English: Professional Working | Urdu: Native')
doc.build(story)
print('Portfolio refresh files generated successfully.')
