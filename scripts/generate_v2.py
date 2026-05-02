import re

with open('index.html', 'r') as f:
    content = f.read()

# Extract the activities array
match = re.search(r'const activities = \[(.*?)\];', content, re.DOTALL)
if match:
    activities_js = 'const activities = [' + match.group(1) + '];'
else:
    print("Could not find activities array!")
    exit(1)

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speech Therapy Activities Hub - V2</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --primary-light: #818cf8;
            --accent: #f43f5e;
            --bg-color: #f8fafc;
            --sidebar-bg: rgba(255, 255, 255, 0.85);
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border-color: rgba(226, 232, 240, 0.8);
            --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        }

        body {
            font-family: 'Outfit', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--bg-color);
            color: var(--text-main);
            display: flex;
            height: 100vh;
            overflow: hidden;
            background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.1) 0%, rgba(248, 250, 252, 1) 90%);
        }

        /* --- Sidebar --- */
        .sidebar {
            width: 280px;
            background: var(--sidebar-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            padding: 24px;
            box-shadow: 2px 0 15px rgba(0,0,0,0.02);
            z-index: 10;
        }

        .sidebar-header {
            margin-bottom: 32px;
        }

        .sidebar-header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            color: var(--primary);
            line-height: 1.2;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 8px;
            overflow-y: auto;
            padding-right: 8px;
        }

        .sidebar-nav::-webkit-scrollbar {
            width: 4px;
        }
        .sidebar-nav::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 4px;
        }

        .nav-item {
            padding: 12px 16px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 500;
            color: var(--text-muted);
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .nav-item:hover {
            background: var(--border-color);
            color: var(--text-main);
        }

        .nav-item.active {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .nav-item .count {
            background: rgba(0,0,0,0.05);
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
        }

        .nav-item.active .count {
            background: rgba(255,255,255,0.2);
        }

        /* --- Main Content --- */
        .main-content {
            flex: 1;
            overflow-y: auto;
            padding: 32px 48px;
            position: relative;
        }

        .main-content::-webkit-scrollbar {
            width: 8px;
        }
        .main-content::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 8px;
        }

        /* Header / Search */
        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            position: sticky;
            top: 0;
            background: rgba(248, 250, 252, 0.85);
            backdrop-filter: blur(8px);
            padding: 16px 0;
            z-index: 5;
        }

        .page-title {
            font-size: 2rem;
            font-weight: 700;
            margin: 0;
        }

        .search-container {
            width: 350px;
            position: relative;
        }

        .search-input {
            width: 100%;
            padding: 14px 20px 14px 45px;
            border-radius: 100px;
            border: 1px solid var(--border-color);
            background: white;
            font-family: 'Outfit', sans-serif;
            font-size: 1rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
            width: 400px; /* Slight expand on focus */
        }

        .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            color: var(--text-muted);
        }

        /* --- Featured Row --- */
        .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .featured-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 48px;
        }

        .featured-card {
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            border-radius: 20px;
            padding: 24px;
            color: white;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
            text-decoration: none;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
        }

        .featured-card:hover {
            transform: translateY(-5px);
        }

        .featured-card::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
        }

        .featured-tag {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(4px);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 12px;
            align-self: flex-start;
        }

        .featured-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            line-height: 1.2;
        }

        .featured-desc {
            font-size: 0.95rem;
            opacity: 0.9;
            margin-bottom: 0;
            flex-grow: 1;
        }

        /* --- Activities Grid --- */
        .activities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
            padding-bottom: 40px;
        }

        .card {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 20px;
            border: 1px solid var(--border-color);
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
            position: relative;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
            border-color: var(--primary-light);
        }

        .card-header {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 12px;
        }

        .card-icon {
            font-size: 2rem;
            width: 48px;
            height: 48px;
            background: #f1f5f9;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: transform 0.3s ease;
        }

        .card:hover .card-icon {
            transform: scale(1.1) rotate(5deg);
        }

        .card-title {
            font-size: 1.15rem;
            font-weight: 600;
            color: var(--text-main);
            margin: 0 0 4px 0;
            line-height: 1.3;
        }

        .card-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin: 0;
            line-height: 1.5;
            flex-grow: 1;
        }

        .card-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
        }

        .tag {
            font-size: 0.75rem;
            padding: 4px 10px;
            border-radius: 12px;
            background: #f1f5f9;
            color: #475569;
            font-weight: 500;
        }
        
        .tag.new-system { background: #dbeafe; color: #1e40af; }
        .tag.winter { background: #e0f2fe; color: #0284c7; }
        .tag.thanksgiving, .tag.fall { background: #ffedd5; color: #9a3412; }

        /* Empty state */
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 16px;
            border: 1px dashed var(--border-color);
        }

        .empty-state-icon {
            font-size: 4rem;
            margin-bottom: 16px;
            opacity: 0.5;
        }

        .empty-state h3 {
            margin: 0 0 8px;
            color: var(--text-main);
        }

        .empty-state p {
            color: var(--text-muted);
            margin: 0;
        }
    </style>
</head>
<body>

    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <h1>🗣️ Speech Hub</h1>
        </div>
        <nav class="sidebar-nav" id="sidebarNav">
            <!-- Populated by JS -->
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <div class="top-bar">
            <h2 class="page-title" id="pageTitle">Browse Activities</h2>
            <div class="search-container">
                <span class="search-icon">🔍</span>
                <input type="text" id="searchInput" class="search-input" placeholder="Search therapies, topics, or keywords...">
            </div>
        </div>

        <div id="featuredSection">
            <h3 class="section-title">✨ Featured & New</h3>
            <div class="featured-row" id="featuredContainer">
                <!-- Populated by JS -->
            </div>
        </div>

        <h3 class="section-title" id="gridTitle">All Activities</h3>
        <div class="activities-grid" id="activitiesGrid">
            <!-- Populated by JS -->
        </div>
    </main>

    <script>
        // Data block injected from original file
        ===ACTIVITIES_JS===

        // State
        let currentFilter = 'all';
        let searchQuery = '';
        let allItems = [];

        // Flatten items for easy filtering and searching
        function flattenActivities() {
            allItems = [];
            activities.forEach(category => {
                category.items.forEach(item => {
                    if (item.levels) {
                        item.levels.forEach(level => {
                            let mixedTags = [...(item.tags || [])];
                            if (level.badge) mixedTags.push(level.badge);
                            allItems.push({
                                ...level,
                                categoryId: category.category,
                                categoryTitle: category.title,
                                icon: item.icon,
                                tags: mixedTags,
                                fullTitle: `${item.title}: ${level.title}`
                            });
                        });
                    } else {
                        allItems.push({
                            ...item,
                            categoryId: category.category,
                            categoryTitle: category.title,
                            fullTitle: item.title
                        });
                    }
                });
            });
        }

        function initSidebar() {
            const nav = document.getElementById('sidebarNav');
            
            // All items count
            nav.innerHTML = `
                <div class="nav-item active" data-id="all">
                    <span>🌟 All Activities</span>
                    <span class="count">${allItems.length}</span>
                </div>
            `;

            activities.forEach(category => {
                // Count items in category
                let count = 0;
                category.items.forEach(item => {
                    if(item.levels) count += item.levels.length;
                    else count++;
                });

                // determine category icon
                let icon = '📁';
                if(category.category === 'new-system') icon = '✨';
                if(category.category === 'articulation') icon = '🎯';
                if(category.category === 'fluency') icon = '🌊';
                if(category.category === 'grammar') icon = '🧩';
                if(category.category === 'vocabulary') icon = '📖';
                if(category.category === 'syntax') icon = '🏗️';
                if(category.category === 'reading') icon = '📚';
                if(category.category === 'inference') icon = '🔎';
                if(category.category === 'writing') icon = '✍️';
                if(category.category === 'pragmatics') icon = '💬';
                if(category.category === 'social') icon = '��';
                if(category.category === 'executive') icon = '🧠';

                nav.innerHTML += `
                    <div class="nav-item" data-id="${category.category}" data-title="${category.title}">
                        <span>${icon} ${category.title.split(' & ')[0]}</span>
                        <span class="count">${count}</span>
                    </div>
                `;
            });

            // Add click listeners
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                    item.classList.add('active');
                    currentFilter = item.dataset.id;
                    
                    const catTitle = item.dataset.title || 'All Activities';
                    document.getElementById('pageTitle').textContent = currentFilter === 'all' ? 'Browse Activities' : catTitle;
                    
                    // Hide featured row if filtering
                    document.getElementById('featuredSection').style.display = (currentFilter === 'all' && searchQuery === '') ? 'block' : 'none';
                    
                    document.getElementById('gridTitle').textContent = (currentFilter === 'all' && searchQuery === '') ? 'All Activities' : catTitle;

                    renderGrid();
                });
            });
        }

        function renderFeatured() {
            const container = document.getElementById('featuredContainer');
            
            // Just picking a few specific ones to be "Featured" for the demo
            const featuredItems = allItems.filter(i => 
                (i.tags && i.tags.includes('New System')) || 
                i.title.includes('Interactive') || 
                i.title.includes('Builder')
            ).slice(0, 3);

            // Give them some vibrant gradient variations
            const gradients = [
                'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            ];

            container.innerHTML = featuredItems.map((item, index) => `
                <a href="${item.file || '#'}" target="_blank" class="featured-card" style="background: ${gradients[index % gradients.length]}">
                    <span class="featured-tag">${item.categoryTitle.split(' & ')[0]}</span>
                    <h4 class="featured-title">${item.icon} ${item.fullTitle}</h4>
                    <p class="featured-desc">${item.description}</p>
                </a>
            `).join('');
        }

        function getTagClass(tag) {
            const t = tag.toLowerCase();
            if (t.includes('new')) return 'tag new-system';
            if (t.includes('winter')) return 'tag winter';
            if (t.includes('fall') || t.includes('thanksgiving')) return 'tag thanksgiving';
            return 'tag';
        }

        function renderGrid() {
            const container = document.getElementById('activitiesGrid');
            const searchLower = searchQuery.trim().toLowerCase();
            
            const filtered = allItems.filter(item => {
                // Category filter
                if (currentFilter !== 'all' && item.categoryId !== currentFilter) return false;

                // Search filter
                if (searchLower) {
                    const matchesSearch = 
                        item.fullTitle.toLowerCase().includes(searchLower) ||
                        (item.description && item.description.toLowerCase().includes(searchLower)) ||
                        (item.tags && item.tags.some(t => t.toLowerCase().includes(searchLower)));
                    if (!matchesSearch) return false;
                }

                return true;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🌵</div>
                        <h3>No activities found</h3>
                        <p>Try adjusting your search or category filter.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(item => `
                <a href="${item.file || '#'}" target="_blank" class="card">
                    <div class="card-header">
                        <div class="card-icon">${item.icon || '📄'}</div>
                        <div>
                            <h4 class="card-title">${item.fullTitle}</h4>
                            <p class="card-desc">${item.description}</p>
                        </div>
                    </div>
                    <div class="card-tags">
                        ${(item.tags || []).slice(0, 3).map(tag => `<span class="${getTagClass(tag)}">${tag}</span>`).join('')}
                    </div>
                </a>
            `).join('');
        }

        // Initialize
        flattenActivities();
        initSidebar();
        renderFeatured();
        renderGrid();

        // Search listener
        document.getElementById('searchInput').addEventListener('input', (e) => {
            searchQuery = e.target.value;
            
            // Hide featured if searching
            document.getElementById('featuredSection').style.display = (currentFilter === 'all' && searchQuery === '') ? 'block' : 'none';
            document.getElementById('gridTitle').textContent = searchQuery ? 'Search Results' : 
                (currentFilter === 'all' ? 'All Activities' : document.querySelector('.nav-item.active').dataset.title);
            
            renderGrid();
        });

    </script>
</body>
</html>
"""

html_out = html_template.replace("===ACTIVITIES_JS===", activities_js)

with open('index_v2.html', 'w') as f:
    f.write(html_out)

print("Generated index_v2.html successfully.")
