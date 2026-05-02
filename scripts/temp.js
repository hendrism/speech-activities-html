
        let imageData = {};
        let allTags = [];
        let selectedTags = new Set();
        let searchQuery = '';
        let sortBy = 'name-asc';

        async function init() {
            try {
                const res = await fetch('data/vocabulary-images.json');
                imageData = await res.json();
                
                // Try to fetch new images from admin server
                try {
                    const imgRes = await fetch('/api/images');
                    if (imgRes.ok) {
                        const allImages = await imgRes.json();
                        for (const category in allImages) {
                            for (const path of allImages[category]) {
                                // path is like "/images/animals/bee.png"
                                let key = path.startsWith('/images/') ? path.slice(8) : path;
                                key = key.startsWith('images/') ? key.slice(7) : key;
                                if (!imageData[key]) {
                                    // Auto-create a local entry for display
                                    const filename = key.split('/').pop();
                                    const name = filename.split('.')[0]
                                        .replace(/[-_]/g, ' ')
                                        .replace(/\\b\\w/g, c => c.toUpperCase());
                                    
                                    imageData[key] = {
                                        name: name,
                                        tags: [],
                                        isNew: true
                                    };
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log('Admin API not running, cannot discover new images.');
                }
                
                const tagSet = new Set();
                Object.values(imageData).forEach(item => {
                    if (item.tags) {
                        item.tags.forEach(t => tagSet.add(t));
                    }
                });
                allTags = Array.from(tagSet).sort();
                
                renderTags();
                setupListeners();
                renderGrid();
            } catch (err) {
                document.getElementById('stats').textContent = 'Error loading data/vocabulary-images.json';
                console.error(err);
            }
        }

        function setupListeners() {
            document.getElementById('searchInput').addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase();
                renderGrid();
            });

            document.getElementById('sortSelect').addEventListener('change', (e) => {
                sortBy = e.target.value;
                renderGrid();
            });
        }

        function toggleTag(tag) {
            if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
            } else {
                selectedTags.add(tag);
            }
            renderTags();
            renderGrid();
        }

        function renderTags() {
            const container = document.getElementById('tagsContainer');
            container.innerHTML = allTags.map(tag => `
                <button class="tag-btn ${selectedTags.has(tag) ? 'active' : ''}" onclick="toggleTag('${tag}')">
                    ${tag}
                </button>
            `).join('');
        }

        async function openInFinder(key) {
            try {
                const res = await fetch('/api/open-in-finder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key })
                });
                if (!res.ok) {
                    throw new Error('API not available. Are you running the admin server?');
                }
            } catch (err) {
                alert('Could not open in Finder. Make sure you are accessing this via the python admin server (python3 scripts/admin.py) on port 8090.');
            }
        }

        async function handleTagInput(e, key) {
            if (e.key === 'Enter') {
                const newTag = e.target.value.trim().toLowerCase();
                if (!newTag) return;
                
                const currentTags = imageData[key].tags || [];
                if (currentTags.includes(newTag)) {
                    e.target.value = '';
                    return;
                }
                
                const updatedTags = [...currentTags, newTag];
                
                try {
                    const res = await fetch('/api/vocabulary/tags', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key, tags: updatedTags })
                    });
                    
                    if (!res.ok) {
                        throw new Error('Failed to update tags.');
                    }
                    
                    const data = await res.json();
                    
                    // Update local state
                    imageData[key].tags = data.tags;
                    
                    if (!allTags.includes(newTag)) {
                        allTags.push(newTag);
                        allTags.sort();
                        renderTags();
                    }
                    
                    renderGrid(); // Re-render to show new tag
                } catch (err) {
                    alert('Could not update tags. Make sure you are accessing this via the python admin server (python3 scripts/admin.py) on port 8090.');
                }
            }
        }
        
        async function removeTag(key, tagToRemove) {
            const currentTags = imageData[key].tags || [];
            const updatedTags = currentTags.filter(t => t !== tagToRemove);
            
            try {
                const res = await fetch('/api/vocabulary/tags', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key, tags: updatedTags })
                });
                
                if (!res.ok) throw new Error('API error');
                
                const data = await res.json();
                imageData[key].tags = data.tags;
                renderGrid();
            } catch (err) {
                alert('Could not remove tag. Make sure you are accessing this via the python admin server (python3 scripts/admin.py) on port 8090.');
            }
        }

        function renderGrid() {
            const grid = document.getElementById('grid');
            const stats = document.getElementById('stats');
            
            let keys = Object.keys(imageData);
            
            // Filter
            keys = keys.filter(key => {
                const item = imageData[key];
                
                // Text search
                const textMatch = !searchQuery || 
                                 item.name.toLowerCase().includes(searchQuery) || 
                                 key.toLowerCase().includes(searchQuery);
                                 
                // Tag search (must have ALL selected tags)
                let tagMatch = true;
                if (selectedTags.size > 0) {
                    if (!item.tags) {
                        tagMatch = false;
                    } else {
                        for (const tag of selectedTags) {
                            if (!item.tags.includes(tag)) {
                                tagMatch = false;
                                break;
                            }
                        }
                    }
                }
                
                return textMatch && tagMatch;
            });
            
            // Sort
            keys.sort((a, b) => {
                if (sortBy === 'name-asc') {
                    return imageData[a].name.localeCompare(imageData[b].name);
                } else if (sortBy === 'name-desc') {
                    return imageData[b].name.localeCompare(imageData[a].name);
                } else {
                    return a.localeCompare(b);
                }
            });
            
            stats.textContent = `Showing ${keys.length} of ${Object.keys(imageData).length} images`;
            
            grid.innerHTML = keys.map(key => {
                const item = imageData[key];
                const tagsHtml = item.tags ? item.tags.map(t => `<span class="card-tag" onclick="removeTag('${key}', '${t}')" title="Click to remove">${t}</span>`).join('') : '';
                const newBadge = item.isNew ? '<span style="background: #fef08a; color: #854d0e; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-left: 6px;">NEW</span>' : '';
                
                return `
                    <div class="image-card">
                        <div class="img-container" onclick="openInFinder('${key}')" style="cursor: pointer;" title="Click to reveal in Finder">
                            <img src="images/${key}" alt="${item.name}" loading="lazy">
                        </div>
                        <div class="card-content">
                            <div class="card-title">${item.name}${newBadge}</div>
                            <div class="card-path">${key}</div>
                            <div class="card-tags">
                                ${tagsHtml}
                                <input type="text" class="add-tag-input" placeholder="+ tag" onkeypress="handleTagInput(event, '${key}')">
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        init();
    