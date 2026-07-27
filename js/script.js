// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 800);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
} else {
    initPreloader();
}

// Theme Switcher (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeIcon) {
        updateThemeIcon(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            updateThemeIcon(theme);
        }
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.className = 'bx bx-moon';
            } else {
                themeIcon.className = 'bx bx-sun';
            }
        }
    }
}

// Mobile Navigation
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('nav');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (icon) {
            if (navbar.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        }
    });

    // Close Mobile Menu on Link Click
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

// Sticky Header & Active Navigation Spy
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

if (header) {
    window.addEventListener('scroll', () => {
        // Sticky
        header.classList.toggle('sticky', window.scrollY > 50);

        // Spy
        if (sections.length > 0) {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#') && href.slice(1) === current) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// Canvas Particle Background
// Canvas Particle Background
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse collision
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 14000;
        numberOfParticles = Math.min(numberOfParticles, 80); // Cap particles for performance
        
        // Check dark/light mode for particle colors
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const particleColor = isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(59, 130, 246, 0.12)';

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.8) - 0.4;
            let directionY = (Math.random() * 0.8) - 0.4;

            particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
        }
    }

    function connect() {
        let opacityValue = 1;
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const lineColor = isLight ? 'rgba(37, 99, 235, ' : 'rgba(59, 130, 246, ';

        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = lineColor + opacityValue * 0.15 + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        // Dynamically update colors on theme change
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const particleColor = isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(59, 130, 246, 0.12)';
        particlesArray.forEach(p => p.color = particleColor);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    initParticles();
    animateParticles();
}

// Animated Counter-Up for Stats
const stats = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetVal = parseInt(target.getAttribute('data-target'));
            let currentVal = 0;
            const increment = Math.ceil(targetVal / 50);
            const timer = setInterval(() => {
                currentVal += increment;
                if (currentVal >= targetVal) {
                    target.textContent = targetVal + (target.getAttribute('data-suffix') || '');
                    clearInterval(timer);
                } else {
                    target.textContent = currentVal + (target.getAttribute('data-suffix') || '');
                }
            }, 30);
            observer.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statObserver.observe(stat));

// Skills Progress Bar Animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillFills.forEach(fill => {
                const percent = fill.getAttribute('data-percent');
                fill.style.width = percent;
            });
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// GitHub API Integration
async function fetchGitHubStats() {
    const username = 'asimgee105';
    // Exit early if we are not on the main page containing GitHub profile details
    const avatarEl = document.getElementById('github-avatar');
    if (!avatarEl) return;

    try {
        // Fetch User Info
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('GitHub user not found');
        const userData = await userRes.json();

        // Update profile card details
        avatarEl.src = userData.avatar_url;
        document.getElementById('github-name').textContent = userData.name || 'Asim Ali';
        document.getElementById('github-bio').textContent = userData.bio || 'Backend Architect & PHP/Laravel Specialist';
        document.getElementById('github-repos-count').textContent = userData.public_repos;
        document.getElementById('github-followers').textContent = userData.followers;

        // Fetch Repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!reposRes.ok) throw new Error('GitHub repos not found');
        const repos = await reposRes.json();

        // Calculate total stars and forks
        let totalStars = 0;
        let totalForks = 0;
        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
        });

        document.getElementById('github-stars-count').textContent = totalStars;

        // Sort repos by stars + forks, filter fork repos if wanted
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
            .slice(0, 4);

        const reposContainer = document.getElementById('github-repos');
        reposContainer.innerHTML = ''; // Clear skeleton

        filteredRepos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'github-repo-card glass';
            card.innerHTML = `
                <div>
                    <a href="${repo.html_url}" target="_blank" class="github-repo-name">${repo.name}</a>
                    <p class="github-repo-desc">${repo.description || 'No description provided.'}</p>
                </div>
                <div class="github-repo-meta">
                    <span><i class='bx bxs-circle' style="color: ${getLangColor(repo.language)}"></i> ${repo.language || 'HTML'}</span>
                    <span><i class='bx bxs-star'></i> ${repo.stargazers_count}</span>
                    <span><i class='bx bx-git-repo-forked'></i> ${repo.forks_count}</span>
                </div>
            `;
            reposContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fail gracefully, keep placeholder structure
    }
}

function getLangColor(lang) {
    const colors = {
        'PHP': '#4F5D95',
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Vue': '#41b883',
        'TypeScript': '#3178c6'
    };
    return colors[lang] || '#858b97';
}

fetchGitHubStats();

// AI Terminal Emulator
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');

const terminalCommands = {
    help: 'Available Commands:\n - <span class="success">about</span>      : Learn about my background\n - <span class="success">skills</span>     : View specialized technical skills\n - <span class="success">projects</span>   : List core software projects\n - <span class="success">ai</span>         : Show AI Integration highlights\n - <span class="success">contact</span>    : Get connection details\n - <span class="success">clear</span>      : Clear the screen',
    about: 'System Profile:\n Name        : Asim Ali\n Role        : Backend Architect & AI Integration Engineer\n Experience  : 3+ Years in Laravel, PHP Core, and System Design\n Location    : Sahiwal, Pakistan\n Philosophy  : Creating performant database structures and asynchronous API microservices.',
    skills: 'Technical Skills Matrix:\n [Backend]   : PHP (Laravel/Livewire, CodeIgniter 3), REST APIs\n [Databases] : MySQL (Advanced indexing, query tuning)\n [DevOps]    : Git, Apache/WAMP, Deployment workflows\n [SEO & Perf]: PageSpeed tuning, structured micro-data schemas\n [AI Dev]    : LLM fine-tuning API, autonomous agents, terminal simulators',
    projects: 'Featured Projects Catalog:\n 1. ApnaSahiwal       - Local community portal\n 2. OSHAAcademy       - Enterprise LMS with PDF automation\n 3. AllToolPro        - 100+ Free Online SEO Tools suite\n 4. LuxLiving         - Luxury real estate engine (Dubai)\n 5. POS System        - Local-first offline-sync POS platform',
    ai: 'AI Capabilities Integration:\n - Engineered custom API links to OpenAI and Claude models for content summaries.\n - Designed vector embeddings workflow for semantic searches in document management platforms.\n - Created prompt-optimization frameworks, saving 35% on token costs.\n - Built background job queues for large batch inference processing.',
    contact: 'Connection Details:\n - Email    : asimgee105@gmail.com\n - Phone    : +92 315 4936412\n - GitHub   : github.com/asimgee\n - LinkedIn : linkedin.com/in/asim-ali-3b879729b/',
};

// Start terminal welcome text
if (terminalBody && terminalInput) {
    printTerminalOutput('System Initialization Complete.\nType <span class="success">help</span> to begin exploring capabilities.\n\n', 'info');
    
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            // Print user command line
            const userCommandLine = `<div class="terminal-input-line"><span class="terminal-prompt">visitor@asim-dev:~$</span> <span>${input}</span></div>`;
            terminalBody.insertAdjacentHTML('beforeend', userCommandLine);

            if (input === 'clear') {
                terminalBody.innerHTML = '';
            } else if (terminalCommands[input]) {
                printTerminalOutput(terminalCommands[input], 'success');
            } else if (input !== '') {
                printTerminalOutput(`bash: command not found: ${input}. Type "help" for a list of commands.`, 'error');
            }
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}

function printTerminalOutput(text, status) {
    const output = document.createElement('div');
    output.className = `terminal-output ${status}`;
    output.innerHTML = text;
    terminalBody.appendChild(output);
}

// Project Details Modals Logic
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-project-body');
const closeBtn = document.querySelector('.modal-close-btn');

const projectData = {
    apnasahiwal: {
        title: "ApnaSahiwal City Portal",
        image: "img/portfolio pics/apnasahiwal.webp",
        role: "Lead Backend Developer & Database Designer",
        tech: "PHP, Laravel, MySQL, Bootstrap 5, AJAX, Google Maps API",
        features: [
            "Comprehensive business directory with dynamic maps search.",
            "Classifieds marketplace with interactive category filtering.",
            "Local job advertisement portal with resume submit actions.",
            "Integrated event listings with local calendar notifications."
        ],
        challenges: [
            "Optimizing search queries across thousands of businesses so results load under 1 second.",
            "Handling geospatial data queries effectively to display nearby businesses based on distance coordinates."
        ],
        solutions: [
            "Configured multi-column MySQL composite indexing on search columns.",
            "Integrated MySQL GIS functions (like ST_Distance_Sphere) to calculate real-time distance calculations from coordinates."
        ],
        performance: "Implemented query caching using Laravel Redis caching. Decreased directory page loads by 82% (from 2.4s to 430ms).",
        seo: "Implemented LocalBusiness and Breadcrumb schemas, dynamic daily sitemap builders, and SEO-optimized URLs.",
        ai: "Integrated automated spam filter utilizing lightweight RegExp-based classification to screen job applications.",
        db: [
            { name: "businesses", desc: "id, name, location (Point), category_id, details, rating_average" },
            { name: "classifieds", desc: "id, title, user_id, price, description, status, expires_at" },
            { name: "jobs", desc: "id, title, company, description, location, salary_range, created_at" }
        ],
        apis: "Google Maps API for plotting pins, custom REST API endpoints for internal directory requests."
    },
    oshaacademy: {
        title: "OSHA Academy LMS",
        image: "img/portfolio pics/oshaacademy.webp",
        role: "Full Stack Laravel Developer",
        tech: "Laravel, Livewire, MySQL, Tailwind CSS, Stripe API, Dompdf",
        features: [
            "Video lecture streaming player with course completion milestones.",
            "Timed compliance quizzes with randomized question sets.",
            "Automated PDF certificate generation upon passing quizzes.",
            "Dynamic course builder with drag-and-drop structures."
        ],
        challenges: [
            "High memory spikes and CPU usage during PDF certificate generation when hundreds of students complete courses concurrently."
        ],
        solutions: [
            "Offloaded PDF certificate assembly to background job workers via Laravel Queues with Redis.",
            "Optimized CSS styling inside HTML-to-PDF templates to speed up generation threads."
        ],
        performance: "Page responses remained responsive during heavy traffic. Certificate creation takes under 3 seconds asynchronous.",
        seo: "Configured Course and Breadcrumb Schemas for rich Google search listing card displays.",
        ai: "AI Quiz generator: Developed a background tool utilizing OpenAI API to suggest relevant review questions based on lecture notes.",
        db: [
            { name: "courses", desc: "id, title, slug, description, image_path, price" },
            { name: "quizzes", desc: "id, course_id, passing_score, duration_minutes" },
            { name: "certificates", desc: "id, student_id, course_id, certificate_number, created_at" }
        ],
        apis: "Stripe API for credit card transaction processing, OpenAI API, and post-completion webhooks."
    },
    alltoolpro: {
        title: "AllToolPro SEO Platform",
        image: "img/portfolio pics/alltoolpro-image.webp",
        role: "Creator & Lead Developer",
        tech: "Core PHP, JavaScript, AJAX, Bootstrap 5, MySQL",
        features: [
            "100+ free online SEO and developer utilities.",
            "Robots.txt, Sitemap, and Meta Tag generators.",
            "Page Speed, WHOIS database, and Domain Age analyzers.",
            "Real-time IP Lookup, Base64 encoder, and PNG compression."
        ],
        challenges: [
            "Securing server resource usage (CPU/RAM) from scraping script abuse or loop attacks."
        ],
        solutions: [
            "Programmed custom rate-limiting handlers in PHP using IP tracking files.",
            "Used streaming buffers for file processing to minimize heap memory overhead."
        ],
        performance: "Zero database bottleneck. Average utility response speed is under 200ms.",
        seo: "Perfect SEO architecture: semantic structures, Schema.org Person metadata, dynamic indexing templates.",
        ai: "Smart SEO Evaluator: Built local NLP logic that reads user pages and suggests headings and density recommendations.",
        db: [
            { name: "tool_logs", desc: "id, tool_name, ip_address, executed_at" },
            { name: "subscriptions", desc: "id, user_id, plan_type, expires_at" }
        ],
        apis: "IP Geolocation API, WHOIS lookup APIs, PageSpeed Insights API integration."
    },
    luxliving: {
        title: "LuxLiving Real Estate",
        image: "img/portfolio pics/Luxliving.webp",
        role: "Lead Backend Developer",
        tech: "PHP, CodeIgniter 3, MySQL, Tailwind CSS, AJAX, Google Maps API",
        features: [
            "Advanced property listings search with multi-select tags.",
            "Sync engine to pull listing updates from external XML sources.",
            "Agent admin board to upload listing details and images.",
            "WhatsApp lead submit and calendar scheduling buttons."
        ],
        challenges: [
            "Parser slowdowns and timeouts when syncing massive 20,000+ item property database files."
        ],
        solutions: [
            "Wrote a chunk-based CLI parser utilizing PHP XMLReader, executed in background tasks via cron schedules."
        ],
        performance: "Sync tasks complete under 4 minutes with minimal memory footprint. Page load speeds under 500ms.",
        seo: "RealEstateAgent structured data, dynamic SEO-friendly listings names, and automated canonical URLs.",
        ai: "Recommendation module: Analyzes search history and suggests matching luxury listings within budget limits.",
        db: [
            { name: "properties", desc: "id, title, price, bedrooms, area, location_id, agency_id, sync_hash" },
            { name: "agents", desc: "id, name, phone, email, profile_image" }
        ],
        apis: "Property Finder XML parser feeds, Whatsapp API integrations, Google Maps API."
    },
    oneearth: {
        title: "One Earth Properties",
        image: "img/portfolio pics/onearth.webp",
        role: "Full Stack Engineer",
        tech: "PHP, Laravel, MySQL, Bootstrap 5, AJAX, Google Maps API",
        features: [
            "Map-view property boundary plotting with listing cards.",
            "Client favorite list bookmark system with cookies.",
            "Agent listing performance and lead counter stats dashboards."
        ],
        challenges: [
            "Severe query slowdowns when joining multiple tables (amenities, areas, developers) during listing search."
        ],
        solutions: [
            "Denormalized listing features by storing amenities as indexed JSON fields, cutting down table joins."
        ],
        performance: "Search result queries optimized down to 80ms. Average page speeds increased by 65%.",
        seo: "OG tags, Twitter cards, local schemas, and optimized heading levels for UAE search targets.",
        ai: "Automated Description Creator: Integrated OpenAI API to draft listing summaries based on room and location details.",
        db: [
            { name: "properties", desc: "id, developer_id, price, location, coordinates, amenities_json" },
            { name: "leads", desc: "id, property_id, client_name, client_phone, agent_id, status" }
        ],
        apis: "CRM endpoint synchronization, Maps JavaScript API."
    },
    skillfulsahiwal: {
        title: "Skillful Sahiwal LMS",
        image: "img/portfolio pics/skillfulsahiwal-image.webp",
        role: "Lead Backend Developer",
        tech: "PHP, Laravel, Livewire, MySQL, Bootstrap 5, FFmpeg",
        features: [
            "Adaptive video lecture playback based on client speeds.",
            "Live student enrollment pipelines with digital billing.",
            "Course reviews, student messaging boards, and discussion feeds."
        ],
        challenges: [
            "Video streaming buffering issues for students in rural areas with low network bandwidth."
        ],
        solutions: [
            "Configured FFmpeg on the server to transcode video uploads into HLS stream files at 360p, 480p, and 720p resolutions."
        ],
        performance: "Students on 3G connections experience zero buffering. Video load times dropped by 70%.",
        seo: "Structured courses metadata, local business directories schemas.",
        ai: "Adaptive learning engine: Built standard quiz paths that adjust question difficulties based on initial scores.",
        db: [
            { name: "lessons", desc: "id, course_id, title, video_hls_path, duration_seconds" },
            { name: "progress", desc: "id, user_id, lesson_id, completed, watch_time" }
        ],
        apis: "Payment gateway APIs, video streaming transcoding webhooks."
    },
    ibazar: {
        title: "iBazar E-commerce Platform",
        image: "img/portfolio pics/ibazar.webp",
        role: "Senior Laravel Developer",
        tech: "PHP, Laravel, Livewire, MySQL, Tailwind CSS, Stripe API",
        features: [
            "Multi-vendor store registration and dashboard charts.",
            "Complex cart checkout with discount coupons.",
            "Live shipping tracking panels and automated receipt emails.",
            "Dynamic review boards with rating star inputs."
        ],
        challenges: [
            "Preventing payment transaction discrepancies when customers order items from multiple vendors in a single checkout."
        ],
        solutions: [
            "Wrapped the checkout process inside strict database transactions (DB::transaction) to ensure updates commit or rollback together."
        ],
        performance: "Fixed N+1 database querying issues by using eager load bindings. Reduced server response query counts from 110 to 14.",
        seo: "Product schemas, sitemap, category indexing, and unique meta descriptions.",
        ai: "Recommendation carousel: Implemented client-side collaborative filtering to display trending products to users.",
        db: [
            { name: "products", desc: "id, vendor_id, name, price, stock, details" },
            { name: "order_items", desc: "id, order_id, product_id, quantity, unit_price" },
            { name: "transactions", desc: "id, order_id, gateway, charge_id, status" }
        ],
        apis: "Stripe Payment APIs, Shipping partner webhook integrations."
    },
    pos: {
        title: "Modular POS Management System",
        image: "img/portfolio pics/point-of-sale.webp",
        role: "Lead Developer",
        tech: "Core PHP, JavaScript, IndexedDB, AJAX, Bootstrap 5, MySQL",
        features: [
            "Fast inventory checkout supporting keyboard barcode scans.",
            "Local-first cashier capability operating offline.",
            "Invoice print outputs configured for thermal hardware.",
            "Daily/Monthly sales analytics dashboard grids."
        ],
        challenges: [
            "Retaining transaction ability during internet drops so stores don't stop sales queues."
        ],
        solutions: [
            "Engineered local database caching inside the browser using IndexedDB. Sales sync to MySQL once online status returns."
        ],
        performance: "Checkout invoice execution under 300ms. Offline sync jobs take under 2 seconds.",
        seo: "Internal tool structure: excluded from search engines using header rules.",
        ai: "Predictive inventory: Developed forecasting algorithm to alert cashiers on items nearing reorder points based on monthly averages.",
        db: [
            { name: "products", desc: "id, name, barcode, purchase_price, retail_price, stock_count" },
            { name: "sales", desc: "id, branch_id, total_amount, discount, cashier_id, sync_status" },
            { name: "sale_items", desc: "id, sale_id, product_id, quantity, price" }
        ],
        apis: "Barcode scanner API, receipt printer integrations, branch sync APIs."
    },
    ai_binance: {
        title: "AI Binance Trading Platform",
        image: "img/portfolio pics/ai-binance.jpg",
        role: "Lead Developer",
        tech: "Node.js, TypeScript, Binance API, TensorFlow.js, Websockets, MongoDB",
        features: [
            "Real-time order book scanning & live transaction pipelines.",
            "Automated sentiment analysis of crypto news & social feeds.",
            "Bollinger Bands, RSI, & MACD trigger signals calculation.",
            "Discord and Telegram instant alert notification webhooks."
        ],
        challenges: [
            "Handling high-frequency exchange API rate limits without order blocks.",
            "Preventing memory leaks during continuous 24/7 web socket stream runs."
        ],
        solutions: [
            "Implemented request queue handlers with sliding window rate limiting.",
            "Programmed garbage collection calls and memory tracking profiles."
        ],
        performance: "Consistent execution latency under 45ms. Zero trade queue dropping.",
        seo: "Private algorithmic repository, indexation excluded.",
        ai: "TensorFlow.js classification: predicts short-term price momentum shifts.",
        db: [
            { name: "market_ticks", desc: "id, symbol, price, volume, event_time" },
            { name: "trades", desc: "id, order_id, side, price, qty, status, executed_at" },
            { name: "signals", desc: "id, indicator, value, action, confidence" }
        ],
        apis: "Binance Spot API, Binance Websockets, Discord Webhooks, CoinGecko API."
    },
    medguide: {
        title: "MedGuide Directory Portal",
        image: "img/portfolio pics/medguide.jpg",
        role: "Full Stack Developer",
        tech: "PHP, Laravel, MySQL, Bootstrap 5, Leaflet JS, AJAX",
        features: [
            "Doctor booking calendars with real-time slot selection.",
            "Nearby clinic location search using Leaflet JS geolocation.",
            "Live patient feedback threads with rating star validations.",
            "Emergency blood donor registry filters."
        ],
        challenges: [
            "Maintaining secure storage of medical and personal patient profile files."
        ],
        solutions: [
            "Applied AES-256 field encryption layers inside Laravel Eloquent models."
        ],
        performance: "Database listing queries load in under 120ms utilizing covering indexes.",
        seo: "MedicalWebPage & Physician structured data markup schemas.",
        ai: "Medical AI Assistant: Simple symptoms checklist logic to advise specialties.",
        db: [
            { name: "doctors", desc: "id, name, specialty, clinic_address, geo_lat, geo_lng" },
            { name: "appointments", desc: "id, doctor_id, patient_id, appointment_time, status" },
            { name: "reviews", desc: "id, doctor_id, rating, comment, verified_patient" }
        ],
        apis: "Leaflet Maps API, IP Geolocation API, SMTP mail delivery."
    },
    mobile_reviews: {
        title: "Mobile Specifications Hub",
        image: "img/portfolio pics/mobile-reviews.jpg",
        role: "Frontend Developer",
        tech: "HTML5, CSS3, JavaScript (ES6), Google Sheets API",
        features: [
            "Side-by-side flagship spec sheet comparison panels.",
            "Fast device search filter mapping specs database items.",
            "Responsive screen specs grid tables.",
            "User review star rating boards."
        ],
        challenges: [
            "Handling large specifications datasets without causing page shift lags."
        ],
        solutions: [
            "Designed flexbox comparison tables and lazy-loaded detail elements."
        ],
        performance: "Instant device comparison loading under 100ms. Perfect 100/100 mobile score.",
        seo: "Product and SpecSheet schema tags for rich search snippet cards.",
        ai: "Smart Recommender: Matches models to user budgets and hardware choices.",
        db: [
            { name: "mobiles", desc: "id, brand, model, processor, ram, battery, price" },
            { name: "specifications", desc: "id, mobile_id, camera, display_type, resolution" }
        ],
        apis: "Google Sheets API, Disqus Comment platform web hooks."
    },
    remotedev_ai: {
        title: "RemoteDev AI Reviewer",
        image: "img/portfolio pics/remotedev-ai.jpg",
        role: "Lead Developer",
        tech: "TypeScript, Node.js, OpenAI API, GitHub Octokit, Express",
        features: [
            "Automated pull request code review analysis.",
            "Security vulnerability scanning & static bug checkers.",
            "Unit test auto-generation drafts in TypeScript.",
            "Slack webhook message delivery loops."
        ],
        challenges: [
            "Running out of context token space when analyzing massive git diff files."
        ],
        solutions: [
            "Developed diff chunk parsers that strip lock files, assets, and vendor files."
        ],
        performance: "PR analysis logs complete in under 8 seconds. Review count limits kept.",
        seo: "GitHub App Store landing pages optimized for organic developer keywords.",
        ai: "OpenAI GPT-4o integration: reads code structures and targets logic fixes.",
        db: [
            { name: "repositories", desc: "id, github_id, repo_name, installation_id" },
            { name: "reviews", desc: "id, pr_number, files_scanned, security_issues, completed_at" }
        ],
        apis: "GitHub REST & Webhooks APIs, OpenAI Chat Completion API, Slack Webhook API."
    },
    super_dollar_app: {
        title: "Super Dollar Mobile App",
        image: "img/portfolio pics/super-dollar-app.jpg",
        role: "Mobile Developer",
        tech: "Flutter, Dart, Firebase Auth, Firebase Firestore, Hive DB",
        features: [
            "Live currency exchange conversion calculator.",
            "Local transaction history receipt files creation.",
            "Biometrics fingerprint security locks.",
            "Money transfer simulators."
        ],
        challenges: [
            "Syncing offline local ledger histories with Firebase databases when online."
        ],
        solutions: [
            "Used Hive DB local storage, launching automatic background sync queues."
        ],
        performance: "Exchange screen rendering rate runs at a smooth 120fps. Latency under 80ms.",
        seo: "Google Play Store app metadata optimization and app links schemas.",
        ai: "Exchange forecasting: Tracks currency rate trends and forecasts day changes.",
        db: [
            { name: "local_ledgers", desc: "id, sender, receiver, amount, currency, sync_pending" },
            { name: "rates_cache", desc: "currency_code, rate_to_usd, updated_timestamp" }
        ],
        apis: "Firebase Auth, Firestore REST API, Open Exchange Rates API."
    },
    superdollar_sahiwal: {
        title: "Super Dollar Sahiwal Web",
        image: "img/portfolio pics/superdollarsahiwal.jpg",
        role: "Backend Developer",
        tech: "PHP, Laravel, MySQL, AdminLTE, Cron Jobs",
        features: [
            "Daily currency rates dashboard listings.",
            "Automated bank exchange rates parsing loops.",
            "Interactive conversion trend charts.",
            "PDF transaction receipt builders."
        ],
        challenges: [
            "Scraping rate feeds from multiple banks reliably without trigger timeouts."
        ],
        solutions: [
            "Configured Laravel Queue jobs running concurrently with proxy rotating APIs."
        ],
        performance: "Background rate scraping completes in 45s. SQL reads take under 50ms.",
        seo: "Local currency exchanger structured data and breadcrumb navigation tags.",
        ai: "Anomaly screening: Detects rate entry inputs out of standard standard deviations.",
        db: [
            { name: "daily_rates", desc: "id, currency_id, buying_rate, selling_rate, updated_by" },
            { name: "scraping_logs", desc: "id, source_bank, status, records_parsed, executed_at" }
        ],
        apis: "State Bank of Pakistan rates feeds, custom admin CRUD API hooks."
    },
    ecomrace: {
        title: "Ecomrace Web App",
        image: "img/portfolio pics/ecomrace.jpg",
        role: "Frontend Developer",
        tech: "Vue.js, Vue Router, Pinia, Tailwind CSS, REST APIs",
        features: [
            "Instant product searches and tag sorting panels.",
            "Persistent cart states using local storage caching.",
            "Comprehensive user checkout payment sheets.",
            "Interactive product rating grids."
        ],
        challenges: [
            "Preventing UI freezes when rendering massive product grids with images."
        ],
        solutions: [
            "Integrated virtual scroller elements to render only elements visible in viewport."
        ],
        performance: "Cart updates execute instantly (0ms). Page routing transition under 150ms.",
        seo: "Search engine crawl schemas, dynamic meta title keywords, and sitemap.",
        ai: "Similar Item recommendations: matches item properties for listing carousels.",
        db: [
            { name: "products", desc: "id, title, category, description, price, rating" },
            { name: "cart_items", desc: "id, product_id, quantity, user_id" }
        ],
        apis: "Commerce backend APIs, Stripe Checkout webhooks, SendGrid API."
    },
    world_best_mobiles: {
        title: "World Best Mobiles Blog",
        image: "img/portfolio pics/world-best-mobiles.jpg",
        role: "Web Designer & Developer",
        tech: "HTML5, CSS3, JavaScript, Disqus, Google Fonts",
        features: [
            "Responsive magazine grid post articles.",
            "Dynamic categories tag filter searches.",
            "Disqus review comments boxes integration.",
            "Social share bookmark overlays."
        ],
        challenges: [
            "Keeping page speed scores above 95 on mobile pages containing large graphics."
        ],
        solutions: [
            "Used WebP image formatting, responsive srcset markers, and lazy loading."
        ],
        performance: "Page Speed index score of 98 on mobile, and 100 on desktop viewports.",
        seo: "BlogPosting & Article JSON-LD schema graphs, index header redirects.",
        ai: "Auto Tags: Suggests post category terms based on content heading patterns.",
        db: [
            { name: "articles", desc: "id, title, category, slug, author, body, read_time" },
            { name: "comments_cache", desc: "id, article_id, comment_author, content" }
        ],
        apis: "Disqus Thread API, AddToAny Social API, Google Fonts API."
    }
};

document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        const data = projectData[projectId];

        if (data) {
            let featuresHtml = '';
            data.features.forEach(f => featuresHtml += `<li>${f}</li>`);

            let challengesHtml = '';
            data.challenges.forEach(c => challengesHtml += `<li>${c}</li>`);

            let solutionsHtml = '';
            data.solutions.forEach(s => solutionsHtml += `<li>${s}</li>`);

            let dbHtml = '';
            data.db.forEach(table => {
                dbHtml += `
                    <div class="modal-db-card">
                        <h5>${table.name}</h5>
                        <p>${table.desc}</p>
                    </div>
                `;
            });

            modalBody.innerHTML = `
                <img class="modal-header-img" src="${data.image}" alt="${data.title}">
                <h2>${data.title}</h2>
                <div class="modal-meta">
                    <div class="modal-meta-item"><strong>My Role:</strong> ${data.role}</div>
                    <div class="modal-meta-item"><strong>Technologies:</strong> ${data.tech}</div>
                </div>
                
                <div class="modal-section">
                    <h4><i class='bx bx-list-check'></i> Core Features</h4>
                    <ul>${featuresHtml}</ul>
                </div>
                
                <div class="modal-section">
                    <h4><i class='bx bx-error-alt'></i> Challenges Faced</h4>
                    <ul>${challengesHtml}</ul>
                </div>
                
                <div class="modal-section">
                    <h4><i class='bx bx-check-shield'></i> Technical Solutions</h4>
                    <ul>${solutionsHtml}</ul>
                </div>

                <div class="modal-section">
                    <h4><i class='bx bx-rocket'></i> Performance Improvements</h4>
                    <p>${data.performance}</p>
                </div>

                <div class="modal-section">
                    <h4><i class='bx bx-search-alt'></i> SEO Optimization</h4>
                    <p>${data.seo}</p>
                </div>

                <div class="modal-section">
                    <h4><i class='bx bx-brain'></i> AI Capabilities</h4>
                    <p>${data.ai}</p>
                </div>

                <div class="modal-section">
                    <h4><i class='bx bx-server'></i> Backend Architecture & Database Schema</h4>
                    <p><strong>DB Tables:</strong></p>
                    <div class="modal-db-grid">${dbHtml}</div>
                </div>

                <div class="modal-section">
                    <h4><i class='bx bx-network-chart'></i> APIs Implemented</h4>
                    <p>${data.apis}</p>
                </div>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Stop background scroll
        }
    });
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        let hasErrors = false;
        
        // Name
        const nameInput = contactForm.querySelector('input[name="name"]');
        const nameError = document.getElementById('name-error');
        if (!nameInput.value.trim()) {
            nameError.style.display = 'block';
            hasErrors = true;
        } else {
            nameError.style.display = 'none';
        }

        // Email
        const emailInput = contactForm.querySelector('input[name="email"]');
        const emailError = document.getElementById('email-error');
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailInput.value.trim() || !emailInput.value.match(emailPattern)) {
            emailError.style.display = 'block';
            hasErrors = true;
        } else {
            emailError.style.display = 'none';
        }

        // Message
        const msgInput = contactForm.querySelector('textarea[name="message"]');
        const msgError = document.getElementById('message-error');
        if (!msgInput.value.trim()) {
            msgError.style.display = 'block';
            hasErrors = true;
        } else {
            msgError.style.display = 'none';
        }

        if (hasErrors) {
            e.preventDefault();
        }
    });
}

// Typewriter Effect for Hero Subtitle
const typedTextSpan = document.querySelector(".multiple-text");
if (typedTextSpan) {
    const textArray = ["Backend Architect", "PHP/Laravel Developer", "Full Stack Engineer", "AI Integration Developer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 100);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(type, newTextDelay + 250);
        });
    } else {
        setTimeout(type, newTextDelay + 250);
    }
}

// ==========================================================================
// Scroll Reveal & Stagger Animation Setup
// ==========================================================================
function initReveal() {
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Automatically apply reveals and staggered delays to lists/grids
    const staggerGrids = document.querySelectorAll(".stagger-grid");
    staggerGrids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.classList.add("reveal");
            item.style.transitionDelay = `${index * 0.08}s`;
            revealObserver.observe(item);
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveal);
} else {
    initReveal();
}

