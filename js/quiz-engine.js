/**
 * Shared Quiz Engine for Speech Therapy Activities
 * Handles common logic for quiz-style activities (Context Clues, Definitions, etc.)
 */

export class QuizEngine {
    constructor(config) {
        this.data = config.data;
        this.containerId = config.containerId || 'activity-container';
        this.onRender = config.onRender; // Function to render a card
        this.onComplete = config.onComplete; // Function called when all items are done

        this.currentIndex = 0;
        this.shuffledData = this.shuffleArray([...this.data]);
        this.state = {
            correctCount: 0,
            answers: {}
        };

        this.init();
    }

    init() {
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

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderCurrentItem();
            return true;
        }
        return false;
    }

    renderCurrentItem() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const item = this.getCurrentItem();
        const progress = this.getProgress();

        // Clear container
        container.innerHTML = '';

        // Call the custom render function provided by the specific activity
        if (this.onRender) {
            const element = this.onRender(item, progress, this);
            container.appendChild(element);
        }
    }
}
