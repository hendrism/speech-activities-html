/**
 * Shared Quiz Engine for Speech Therapy Activities
 * Handles common logic for quiz-style activities (Context Clues, Definitions, etc.)
 */

window.QuizEngine = class QuizEngine {
    constructor(config) {
        this.data = config.data;
        this.containerId = config.containerId || 'activity-container';
        this.config = config.config || {}; // Specific activity config

        this.onComplete = config.onComplete;

        this.currentIndex = 0;
        this.helpLevel = 0; // 0: Input, 1: Hint, 2: Choices
        this.shuffledData = this.shuffleArray([...this.data]); // Keep for random, but maybe we want sequential for nav? 
        // User screenshot shows "Word 1 of 20", so maybe sequential or just shuffled once. 
        // Let's keep shuffled for now but allow navigation.

        this.state = {
            correctCount: 0,
            answers: {}
        };

        this.init();
    }

    init() {
        // Expose helper functions to window for inline onclicks
        window.checkAnswer = (btn, selected, correct) => this.checkAnswer(btn, selected, correct);
        window.toggleHint = () => this.toggleHint(); // Legacy support
        window.nextQuestion = () => this.next();
        window.jumpToQuestion = (index) => this.jumpTo(index);
        window.requestHelp = () => this.increaseHelpLevel();
        window.checkInputAnswer = () => this.checkInputAnswer();

        this.renderNavigation();
        this.renderCurrentItem();
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    getCurrentItem() {
        return this.shuffledData[this.currentIndex];
    }

    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.shuffledData.length,
            percent: ((this.currentIndex + 1) / this.shuffledData.length) * 100
        };
    }

    next() {
        if (this.currentIndex < this.shuffledData.length - 1) {
            this.currentIndex++;
            this.helpLevel = 0; // Reset help level
            this.renderNavigation();
            this.renderCurrentItem();
            return true;
        } else {
            if (this.onComplete) this.onComplete(this.state);
            return false;
        }
    }

    jumpTo(index) {
        if (index >= 0 && index < this.shuffledData.length) {
            this.currentIndex = index;
            this.helpLevel = 0;
            this.renderNavigation();
            this.renderCurrentItem();
        }
    }

    increaseHelpLevel() {
        console.log('Increasing help level from', this.helpLevel);
        this.helpLevel++;
        console.log('New help level:', this.helpLevel);
        this.renderCurrentItem();
    }

    checkInputAnswer() {
        const input = document.getElementById('user-input');
        const feedback = document.getElementById('feedback-area');
        const item = this.getCurrentItem();

        // Simple check: just see if it's not empty for now, or match against word?
        // The user said "input the definition if the student is able to". 
        // Usually this is self-graded or just "good job". 
        // Let's just give positive feedback and show next button.

        if (input.value.trim().length > 0) {
            feedback.textContent = "Great effort! Let's see how close you were.";
            feedback.style.display = 'block';
            feedback.style.background = "#dcfce7";
            feedback.style.color = "#166534";
            // Auto-advance to choices or just show next?
            // Maybe show choices now to confirm?
            this.helpLevel = 2;
            this.renderCurrentItem();
        } else {
            feedback.textContent = "Please type something first.";
            feedback.style.display = 'block';
            feedback.style.background = "#fee2e2";
            feedback.style.color = "#991b1b";
        }
    }

    checkAnswer(btn, selected, correct) {
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.disabled = true);

        const feedback = document.getElementById('feedback-area');
        feedback.style.display = 'block';

        if (selected === correct) {
            btn.classList.add('correct');
            feedback.textContent = "🎉 Correct! Great job.";
            feedback.style.background = "#dcfce7";
            feedback.style.color = "#166534";
            this.state.correctCount++;
        } else {
            btn.classList.add('incorrect');
            allBtns.forEach(b => {
                // We need to match the text content or value
                // Since we passed the raw value, we can check against that
                // But the button text might be different? 
                // In our current setup, value == text usually.
                // Let's rely on the data-value attribute if we added one, or just text.
                if (b.getAttribute('data-value') === correct) b.classList.add('correct');
            });
            feedback.textContent = "Not quite. The correct answer is highlighted.";
            feedback.style.background = "#fee2e2";
            feedback.style.color = "#991b1b";
        }

        document.getElementById('next-btn').style.display = 'block';
    }

    toggleHint() {
        // Legacy toggle
        const hint = document.getElementById('hint-box');
        if (hint) hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
    }

    renderNavigation() {
        const navContainer = document.getElementById('nav-container');
        if (!navContainer) return; // Needs to be added to HTML

        let html = '<div class="nav-buttons">';
        this.shuffledData.forEach((item, index) => {
            const activeClass = index === this.currentIndex ? 'active' : '';
            // Use item.word or just number? User screenshot shows "1. feast", "2. pardon"
            const label = `${index + 1}. ${item.word || 'Item'}`;
            html += `<button class="nav-btn ${activeClass}" onclick="window.jumpToQuestion(${index})">${label}</button>`;
        });
        html += '</div>';
        navContainer.innerHTML = html;
    }

    renderCurrentItem() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const item = this.getCurrentItem();
        const progress = this.getProgress();

        // Clear container
        container.innerHTML = '';

        const card = document.createElement('div');
        card.className = 'quiz-card';

        // 1. Progress
        const progressHtml = `
            <div class="progress-container" style="margin-bottom: 20px;">
                <div class="progress-bar" style="width: ${progress.percent}%"></div>
                <div style="text-align: right; font-size: 0.9em; color: #666; margin-top: 5px;">
                    Word ${progress.current} of ${progress.total}
                </div>
            </div>
        `;

        // 2. Image (if exists)
        let imageHtml = '';
        if (item.imageUrl) {
            imageHtml = `
                <div class="image-container">
                    <img src="${item.imageUrl}" alt="Activity Image" class="activity-image">
                </div>
            `;
        }

        // 3. Question Content (from config)
        const questionHtml = this.config.questionTemplate(item);

        // 4. Progressive Help Logic
        let interactionHtml = '';
        const hintText = this.config.hintTemplate ? this.config.hintTemplate(item) : '';

        // Helper to generate options
        const generateOptions = () => {
            const choices = this.config.getOptions(item, this);
            const correctAnswer = this.config.getCorrectAnswer(item);
            const optionsHtml = choices.map(choice => {
                const choiceSafe = choice.replace(/'/g, "\\'");
                const correctSafe = correctAnswer.replace(/'/g, "\\'");
                return `<button class="option-btn" data-value="${choiceSafe}" onclick="window.checkAnswer(this, '${choiceSafe}', '${correctSafe}')">${choice}</button>`;
            }).join('');
            return `<div class="options-grid">${optionsHtml}</div>`;
        };

        if (this.config.progressive) {
            // Progressive Mode

            // Input Box (Always shown in levels 0, 1, 2? Or replaced? User says "first... next... then")
            // Usually input stays.
            const inputHtml = `
                <div class="input-area" style="margin-bottom: 15px;">
                    <textarea id="user-input" placeholder="Type your own definition before checking the choices..." rows="3" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px;"></textarea>
                    <!-- <button class="btn btn-secondary" onclick="window.checkInputAnswer()" style="margin-top: 5px;">Check My Definition</button> -->
                </div>
            `;

            // Hint (Level 1+)
            const hintHtml = (this.helpLevel >= 1 && hintText) ? `
                <div class="hint-box" style="display: block; background: #fffbeb; border: 1px solid #fcd34d; padding: 10px; border-radius: 8px; margin-bottom: 15px; color: #92400e;">
                    <strong>💡 Hint:</strong> ${hintText}
                </div>
            ` : '';

            // Options (Level 2+)
            const optionsHtml = (this.helpLevel >= 2) ? generateOptions() : '';

            // Control Buttons
            let buttonsHtml = '';
            if (this.helpLevel === 0) {
                buttonsHtml = `<button class="btn btn-help" onclick="window.requestHelp()">💡 I need help</button>`;
            } else if (this.helpLevel === 1) {
                buttonsHtml = `<button class="btn btn-help-more" onclick="window.requestHelp()">📘 I need more help</button>`;
            }

            interactionHtml = `
                ${inputHtml}
                <div class="help-controls" style="margin-bottom: 15px;">
                    ${buttonsHtml}
                </div>
                ${hintHtml}
                ${optionsHtml}
            `;

        } else {
            // Standard Mode (Legacy)
            const hintHtml = hintText ? `
                <div class="hint-box" id="hint-box" style="display:none;">
                    <strong>💡 Hint:</strong> ${hintText}
                </div>
            ` : '';
            interactionHtml = `
                ${hintHtml}
                ${generateOptions()}
            `;
        }

        card.innerHTML = `
            ${progressHtml}
            ${imageHtml}
            ${questionHtml}
            ${interactionHtml}
            <div class="feedback-area" id="feedback-area" style="display:none; margin-top: 15px; padding: 10px; border-radius: 8px;"></div>
            <div class="controls" style="margin-top: 20px; display: flex; justify-content: space-between;">
                ${!this.config.progressive && hintText ? '<button class="btn btn-secondary" onclick="window.toggleHint()">💡 Hint</button>' : '<div></div>'}
                <button class="btn btn-primary" id="next-btn" style="display:none;" onclick="window.nextQuestion()">Next ➡</button>
            </div>
        `;

        container.appendChild(card);
    }
}
