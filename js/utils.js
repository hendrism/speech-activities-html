/**
 * utils.js — Shared utility functions for Speech Therapy Activities
 *
 * Usage (in any activity HTML file):
 *   <script src="../js/utils.js"></script>   <!-- if activity is in a subfolder -->
 *   <script src="js/utils.js"></script>       <!-- if activity is in root -->
 *
 * Then call any function directly, e.g.:
 *   const shuffled = shuffleArray(myArray);
 *   updateProgress('progress-bar', 3, 10);
 *   showFeedback('feedback', true);
 *   renderNavPills('word-nav', items, onSelect);
 */

// ---------------------------------------------------------------------------
// Array Utilities
// ---------------------------------------------------------------------------

/**
 * Returns a shuffled copy of the array (Fisher-Yates). Does not mutate original.
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// ---------------------------------------------------------------------------
// Progress Bar
// ---------------------------------------------------------------------------

/**
 * Updates a progress bar element and optional counter label.
 *
 * @param {string} fillId   - id of the progress fill <div> (width is set as %)
 * @param {number} current  - 1-based current index
 * @param {number} total    - total number of items
 * @param {string} [labelId] - optional id of a text label element
 *                             rendered as "3 of 10" (or "3 of 10 correct" with correct param)
 * @param {number} [correct] - optional correct-answer count for detailed label
 */
function updateProgress(fillId, current, total, labelId, correct) {
    const fill = document.getElementById(fillId);
    if (fill) {
        fill.style.width = ((current / total) * 100) + '%';
    }

    if (labelId) {
        const label = document.getElementById(labelId);
        if (label) {
            label.textContent = correct !== undefined
                ? `${correct} of ${total} correct • ${current} of ${total} answered`
                : `${current} of ${total}`;
        }
    }
}

// ---------------------------------------------------------------------------
// Feedback Display
// ---------------------------------------------------------------------------

/**
 * Shows feedback in an element, styled for correct/incorrect.
 *
 * @param {string|HTMLElement} elementOrId - id string or direct DOM element
 * @param {boolean} isCorrect
 * @param {Object} [messages]
 * @param {string} [messages.correct]   - override default correct message
 * @param {string} [messages.incorrect] - override default incorrect message
 */
function showFeedback(elementOrId, isCorrect, messages = {}) {
    const el = typeof elementOrId === 'string'
        ? document.getElementById(elementOrId)
        : elementOrId;
    if (!el) return;

    const correctMsg   = messages.correct   || '🎉 Correct! Great job.';
    const incorrectMsg = messages.incorrect || 'Not quite. The correct answer is highlighted.';

    el.textContent = isCorrect ? correctMsg : incorrectMsg;
    el.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
    el.style.color       = isCorrect ? '#166534' : '#991b1b';
    el.style.display     = 'block';
}

/**
 * Hides a feedback element and clears its content.
 * @param {string|HTMLElement} elementOrId
 */
function hideFeedback(elementOrId) {
    const el = typeof elementOrId === 'string'
        ? document.getElementById(elementOrId)
        : elementOrId;
    if (!el) return;
    el.style.display = 'none';
    el.textContent = '';
}

// ---------------------------------------------------------------------------
// Navigation Pills
// ---------------------------------------------------------------------------

/**
 * Renders a row of pill/tab navigation buttons into a container.
 *
 * @param {string} containerId - id of the container element
 * @param {Array}  items       - array of data objects
 * @param {Function} onSelect  - callback(index, item) called on click
 * @param {Object} [options]
 * @param {number}   [options.activeIndex=0]      - which index starts active
 * @param {Function} [options.labelFn]            - (item, index) => string for button label
 *                                                   defaults to "1. word" or just the index+1
 */
function renderNavPills(containerId, items, onSelect, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { activeIndex = 0, labelFn } = options;

    container.innerHTML = items.map((item, i) => {
        const label = labelFn
            ? labelFn(item, i)
            : (item.word ? `${i + 1}. ${item.word}` : String(i + 1));
        const activeClass = i === activeIndex ? ' active' : '';
        return `<button class="nav-pill${activeClass}" data-index="${i}">${label}</button>`;
    }).join('');

    container.querySelectorAll('.nav-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index, 10);
            setNavActive(containerId, idx);
            onSelect(idx, items[idx]);
        });
    });
}

/**
 * Updates the active pill in a nav container.
 * @param {string} containerId
 * @param {number} activeIndex
 */
function setNavActive(containerId, activeIndex) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.nav-pill').forEach((btn, i) => {
        btn.classList.toggle('active', i === activeIndex);
    });
}

// ---------------------------------------------------------------------------
// Export to window (for non-module HTML files)
// ---------------------------------------------------------------------------
window.shuffleArray    = shuffleArray;
window.updateProgress  = updateProgress;
window.showFeedback    = showFeedback;
window.hideFeedback    = hideFeedback;
window.renderNavPills  = renderNavPills;
window.setNavActive    = setNavActive;
