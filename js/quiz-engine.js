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
        this.shuffledData = this.shuffleArray([...this.data]);
        this.state = {
            correctCount: 0,
            answers: {}
        };

        this.init();
    }

    init() {
        // Expose helper functions to window for inline onclicks
        window.checkAnswer = (btn, selected, correct) => this.checkAnswer(btn, selected, correct);
        window.toggleHint = () => this.toggleHint();
        window.nextQuestion = () => this.next();

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
            this.renderCurrentItem();
            return true;
        } else {
            if (this.onComplete) this.onComplete(this.state);
            return false;
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
        const hint = document.getElementById('hint-box');
        hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
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
                    Question ${progress.current} of ${progress.total}
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

        // 4. Hint (from config)
        const hintText = this.config.hintTemplate ? this.config.hintTemplate(item) : '';
        const hintHtml = hintText ? `
            <div class="hint-box" id="hint-box">
                <strong>💡 Hint:</strong> ${hintText}
            </div>
        ` : '';

        // 5. Options (from config)
        const choices = this.config.getOptions(item, this);
        const correctAnswer = this.config.getCorrectAnswer(item);

        const optionsHtml = choices.map(choice => {
            // Escape quotes for the onclick handler
            const choiceSafe = choice.replace(/'/g, "\\'");
            const correctSafe = correctAnswer.replace(/'/g, "\\'");
            return `<button class="option-btn" data-value="${choiceSafe}" onclick="window.checkAnswer(this, '${choiceSafe}', '${correctSafe}')">${choice}</button>`;
        }).join('');

        card.innerHTML = `
            ${progressHtml}
            ${imageHtml}
            ${questionHtml}
            ${hintHtml}
            <div class="options-grid">
                ${optionsHtml}
            </div>
            <div class="feedback-area" id="feedback-area"></div>
            <div class="controls">
                ${hintText ? '<button class="btn btn-secondary" onclick="window.toggleHint()">💡 Hint</button>' : '<div></div>'}
                <button class="btn btn-primary" id="next-btn" style="display:none;" onclick="window.nextQuestion()">Next ➡</button>
            </div>
        `;

        container.appendChild(card);
    }
}
