import json
import re

def parse_stories(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split stories by "Story X:"
    story_blocks = re.split(r'\nStory \d+:', content)
    stories = []
    
    # First block is preamble, skip it if not a story
    for i, block in enumerate(story_blocks):
        if i == 0 and "Version 1 — Simple" not in block:
            continue
            
        lines = block.strip().split('\n')
        if not lines:
            continue
            
        title_line = lines[0].strip()
        
        # Build story structure
        story = {
            "id": f"story-{len(stories)+1}",
            "title": title_line,
            "image": f"late_winter_early_spring_story_images/{len(stories)+1}.png",
            "alt": f"Image for {title_line}",
            "vocabulary": "",
            "versions": {
                "simple": {"text": [], "questions": {"literal": [], "inferential": []}},
                "complex": {"text": [], "questions": {"literal": [], "inferential": []}}
            }
        }
        
        # Extract vocabulary
        vocab_match = re.search(r'Vocabulary Nouns\s*(.*)', block)
        if vocab_match:
            story["vocabulary"] = vocab_match.group(1).strip()
            
        # Extract versions
        versions = re.split(r'📖 Version \d+ — (Simple|More Complex)', block)
        # versions will be [junk, "Simple", text_simple, "More Complex", text_complex]
        for v_idx in range(1, len(versions), 2):
            v_type = "simple" if versions[v_idx] == "Simple" else "complex"
            v_text_block = versions[v_idx+1]
            
            # Extract story text
            text_match = re.match(r'\s*(.*?)(?=Literal Questions)', v_text_block, re.DOTALL)
            if text_match:
                # Splitting into sentences or paragraphs. The text seems to be one block.
                # Let's clean up line breaks
                clean_text = re.sub(r'\s+', ' ', text_match.group(1)).strip()
                story["versions"][v_type]["text"] = [clean_text]
                
            # Extract Literal Questions
            literal_block = re.search(r'Literal Questions(.*?)(?=Inferential Questions)', v_text_block, re.DOTALL)
            if literal_block:
                story["versions"][v_type]["questions"]["literal"] = parse_questions(literal_block.group(1))
                
            # Extract Inferential Questions
            inferential_block = re.search(r'Inferential Questions(.*?)$', v_text_block, re.DOTALL)
            if inferential_block:
                # Split at another 📖 Version or end
                q_text = re.split(r'📖', inferential_block.group(1))[0]
                story["versions"][v_type]["questions"]["inferential"] = parse_questions(q_text)
                
        stories.append(story)
        
    return stories

def parse_questions(text):
    questions = []
    q_blocks = re.split(r'Q\d+:', text)
    for q in q_blocks[1:]:
        lines = q.strip().split('\n')
        prompt = lines[0].strip()
        
        hint_match = re.search(r'💡 Hint:\s*(.*)', q)
        hint = hint_match.group(1).strip() if hint_match else ""
        
        # Find choices (A), B), C), D))
        choices = []
        choices_text = re.search(r'([A-D]\).*)', q, re.DOTALL)
        if choices_text:
            choice_lines = re.findall(r'([A-D]\).*?(?=(?:[A-D]\)|$)))', choices_text.group(1), re.DOTALL)
            for c in choice_lines:
                c_clean = re.sub(r'\s+', ' ', c).strip()
                is_correct = '✓' in c_clean or '(Correct)' in c_clean
                c_text = re.sub(r'^[A-D]\)\s*', '', c_clean).replace('✓', '').replace('(Correct)', '').strip()
                choices.append({"text": c_text, "isCorrect": is_correct})
                
        questions.append({
            "prompt": prompt,
            "clue": hint,
            "choices": choices
        })
    return questions

def generate_html(stories):
    js_data = json.dumps(stories, indent=4)
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reading Comprehension Activity</title>
    <style>
        :root {{
            --midnight: #0f172a;
            --frost: #e2e8f0;
            --sky: #38bdf8;
            --sun: #fbbf24;
            --snow: #f8fafc;
            --spruce: #0b6e4f;
        }}
        * {{ box-sizing: border-box; }}
        body {{
            margin: 0;
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: radial-gradient(circle at 20% 20%, #f1f5f9, #e0f2fe 45%, #f8fafc);
            color: var(--midnight);
        }}
        .page {{
            max-width: 1100px;
            margin: 0 auto;
            padding: 28px 18px 40px;
        }}
        h1 {{ text-align: center; margin: 0 0 10px; letter-spacing: 0.3px; }}
        .intro {{
            background: white; border: 1px solid var(--frost);
            border-radius: 14px; padding: 14px 16px;
            box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
            line-height: 1.6; margin-bottom: 16px;
        }}
        .top-tabs {{
            display: flex; gap: 8px; justify-content: center; margin-bottom: 20px;
        }}
        .nav-bar {{
            display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 8px; position: sticky; top: 0;
            background: rgba(241, 245, 249, 0.92); padding: 8px 0 4px;
            backdrop-filter: blur(4px); z-index: 10;
        }}
        .nav-btn, .top-tab-btn {{
            border: 1px solid var(--frost); background: white;
            border-radius: 12px; padding: 10px 12px; cursor: pointer;
            font-weight: 700; color: var(--midnight);
            box-shadow: 0 6px 16px rgba(15, 23, 42, 0.07);
            transition: all 0.2s ease;
        }}
        .nav-btn:hover, .top-tab-btn:hover {{ border-color: var(--sky); transform: translateY(-1px); }}
        .nav-btn.active, .top-tab-btn.active {{
            background: linear-gradient(135deg, #e0f2fe, #fef9c3);
            border-color: var(--sun); color: #92400e;
        }}
        .story-card {{
            background: white; border: 1px solid var(--frost);
            border-radius: 16px; padding: 18px;
            box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12); margin-top: 12px;
        }}
        .story-top {{
            display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 14px; align-items: start;
        }}
        .story-text {{
            background: var(--snow); border: 1px solid var(--frost);
            border-radius: 12px; padding: 12px; line-height: 1.6;
        }}
        .story-text p {{ margin: 0 0 8px; font-size: 1.1rem; }}
        .vocab-list {{ font-weight: bold; color: var(--spruce); margin-top: 10px; }}
        .image-placeholder {{
            border: 2px dashed #cbd5e1; border-radius: 12px;
            background: repeating-linear-gradient(45deg, #f8fafc, #f8fafc 10px, #eef2ff 10px, #eef2ff 20px);
            min-height: 250px; display: flex; align-items: center; justify-content: center;
            padding: 12px; color: #475569; text-align: center; font-weight: 700;
        }}
        .question-tabs {{
            display: inline-flex; gap: 8px; border-radius: 12px;
            background: #f1f5f9; padding: 6px; margin: 12px 0;
        }}
        .tab-btn {{
            border: none; background: transparent; padding: 9px 14px;
            border-radius: 10px; cursor: pointer; font-weight: 700;
            color: #475569; transition: all 0.15s ease;
        }}
        .tab-btn.active {{
            background: white; color: var(--midnight);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); border: 1px solid var(--frost);
        }}
        .questions {{ display: grid; gap: 12px; }}
        .question-card {{
            border: 1px solid var(--frost); border-radius: 12px;
            padding: 12px; background: #f8fafc;
        }}
        .question-header {{ display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }}
        .question-label {{ font-size: 0.95rem; color: #475569; }}
        .question-prompt {{ font-weight: 700; margin: 6px 0 10px; font-size: 1.05rem; }}
        .help-row {{ display: flex; gap: 8px; flex-wrap: wrap; }}
        .btn {{
            border: none; border-radius: 10px; padding: 9px 12px;
            cursor: pointer; font-weight: 700; transition: all 0.2s ease;
        }}
        .btn-clue {{ background: #0ea5e9; color: white; }}
        .btn-choices {{ background: var(--sun); color: #92400e; }}
        .btn:hover {{ filter: brightness(0.95); transform: translateY(-1px); }}
        .clue {{
            display: none; margin: 8px 0; padding: 10px; border-radius: 10px;
            background: #ecfeff; border: 1px solid #bae6fd; color: #0f172a;
        }}
        .choices-wrap {{
            display: none; margin-top: 8px; grid-template-columns: 1fr; gap: 8px;
        }}
        .choice-btn {{
            border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 12px;
            background: white; cursor: pointer; font-weight: 700;
            text-align: left; transition: all 0.2s ease; font-size: 1rem;
        }}
        .choice-btn:hover {{ border-color: var(--sky); transform: translateY(-1px); }}
        .choice-btn.correct {{ background: #dcfce7; border-color: #22c55e; color: #166534; }}
        .choice-btn.incorrect {{ background: #fee2e2; border-color: #ef4444; color: #7f1d1d; }}
        @media (max-width: 820px) {{ .story-top {{ grid-template-columns: 1fr; }} }}
    </style>
</head>
<body>
    <div class="page">
        <h1>Reading Comprehension Activities</h1>
        <div class="intro">
            Read the story and answer the literal and inferential questions. You can toggle between Simple and Regular versions of the stories, as well as use hints and multiple-choice options.
        </div>
        
        <div class="top-tabs" id="complexity-tabs">
            <button class="top-tab-btn active" data-level="simple">Simple Stories</button>
            <button class="top-tab-btn" data-level="complex">Regular Stories</button>
        </div>

        <div class="nav-bar" id="story-nav"></div>
        <div id="story-container"></div>
    </div>

    <script>
        const stories = {js_data};
        
        let currentStoryId = stories[0].id;
        let currentComplexity = 'simple'; // simple or complex
        let currentQuestionType = 'literal'; // literal or inferential

        function init() {{
            renderNav();
            bindEvents();
            renderStory();
        }}

        function bindEvents() {{
            document.querySelectorAll('#complexity-tabs .top-tab-btn').forEach(btn => {{
                btn.addEventListener('click', (e) => {{
                    document.querySelectorAll('#complexity-tabs .top-tab-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    currentComplexity = e.target.dataset.level;
                    renderStory();
                }});
            }});
        }}

        function renderNav() {{
            const nav = document.getElementById('story-nav');
            nav.innerHTML = '';
            stories.forEach((story, idx) => {{
                const btn = document.createElement('button');
                btn.className = `nav-btn ${{story.id === currentStoryId ? 'active' : ''}}`;
                btn.textContent = `Story ${{idx + 1}}`;
                btn.onclick = () => {{
                    currentStoryId = story.id;
                    renderNav();
                    renderStory();
                }};
                nav.appendChild(btn);
            }});
        }}

        function renderStory() {{
            const container = document.getElementById('story-container');
            const story = stories.find(s => s.id === currentStoryId);
            if (!story) return;

            const versionData = story.versions[currentComplexity];
            const textParagraphs = versionData.text.map(p => `<p>${{p}}</p>`).join('');
            const vocabHtml = story.vocabulary ? `<div class="vocab-list">Vocabulary: ${{story.vocabulary}}</div>` : '';

            container.innerHTML = `
                <div class="story-card">
                    <h2 style="margin-top:0;">${{story.title}}</h2>
                    <div class="story-top">
                        <div class="story-text">
                            ${{textParagraphs}}
                            ${{vocabHtml}}
                        </div>
                        <div class="image-wrapper" style="display:flex; align-items:flex-start; justify-content:center;">
                            <img src="${{story.image}}" alt="${{story.alt}}" style="max-width:100%; border-radius:12px; display:block; border: 1px solid var(--frost); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);" />
                        </div>
                    </div>
                    
                    <div class="question-tabs">
                        <button class="tab-btn ${{currentQuestionType === 'literal' ? 'active' : ''}}" onclick="setQuestionType('literal')">Literal</button>
                        <button class="tab-btn ${{currentQuestionType === 'inferential' ? 'active' : ''}}" onclick="setQuestionType('inferential')">Inferential</button>
                    </div>
                    
                    <div class="questions" id="questions-container">
                        ${{renderQuestions(versionData.questions[currentQuestionType])}}
                    </div>
                </div>
            `;
        }}

        window.setQuestionType = function(type) {{
            currentQuestionType = type;
            renderStory();
        }};

        function renderQuestions(questions) {{
            if (!questions || !questions.length) return '<p>No questions available.</p>';
            
            return questions.map((q, idx) => `
                <div class="question-card">
                    <div class="question-header">
                        <span class="question-label">Question ${{idx + 1}}</span>
                    </div>
                    <div class="question-prompt">${{q.prompt}}</div>
                    <div class="help-row">
                        <button class="btn btn-clue" onclick="toggleClue(this)">I need help</button>
                        <button class="btn btn-choices" onclick="toggleChoices(this)">I need more help</button>
                    </div>
                    <div class="clue">💡 ${{q.clue}}</div>
                    <div class="choices-wrap" style="display:none;">
                        ${{q.choices.map((c, cIdx) => `
                            <button class="choice-btn" 
                                    data-correct="${{c.isCorrect}}" 
                                    onclick="checkAnswer(this, ${{c.isCorrect}})">
                                ${{String.fromCharCode(65 + cIdx)}}) ${{c.text}}
                            </button>
                        `).join('')}}
                    </div>
                </div>
            `).join('');
        }}

        window.toggleClue = function(btn) {{
            const clue = btn.parentElement.nextElementSibling;
            clue.style.display = clue.style.display === 'block' ? 'none' : 'block';
            btn.textContent = clue.style.display === 'block' ? 'Hide hint' : 'I need help';
        }};

        window.toggleChoices = function(btn) {{
            const choices = btn.parentElement.nextElementSibling.nextElementSibling;
            choices.style.display = choices.style.display === 'grid' ? 'none' : 'grid';
            btn.textContent = choices.style.display === 'grid' ? 'Hide choices' : 'I need more help';
        }};

        window.checkAnswer = function(btn, isCorrect) {{
            if (isCorrect) {{
                btn.classList.add('correct');
                btn.classList.remove('incorrect');
                // Optional: disable siblings when correct? The user said "if the wrong answer is selected, just make that answer choice red, don't show the real answer, i want to be able to try more than once." 
                // So correct = green.
                const siblings = btn.parentElement.querySelectorAll('.choice-btn');
                siblings.forEach(s => s.disabled = true);
            }} else {{
                btn.classList.add('incorrect');
            }}
        }};

        init();
    </script>
</body>
</html>
"""
    with open('late_winter_early_spring_reading.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Generated late_winter_early_spring_reading.html successfully!")

if __name__ == "__main__":
    stories = parse_stories('/Users/Sean-Work/Desktop/speech-activities-html/speech_text.txt')
    # Let's do some minor cleanup for the first story which doesn't have a "Story 1:" prefix matching our split rule but wait...
    # Actually wait. Does it have "Story 1:"?
    # We should run it and check.
    generate_html(stories)
