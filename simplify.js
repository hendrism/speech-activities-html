const fs = require('fs');
const file = '/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html';
let text = fs.readFileSync(file, 'utf8');

const storiesStart = text.indexOf('const stories = [');
const storiesEnd = text.indexOf('];\n\n        // ── Figurative Language Questions') + 1;
let storiesCode = text.substring(storiesStart + 'const stories = '.length, storiesEnd);

let stories;
eval('stories = ' + storiesCode);

function simplifySentence(s) {
    if (!s) return s;
    s = s.trim();
    const parts = s.split(/(?<=[.?!])\s+(?=[A-Z])/);
    if (parts.length > 1) {
        let last = parts[parts.length - 1];
        last = last.replace(/What do you think (.*?)\s*will do/ig, function (match, subject) {
            return `What will ${subject} likely do`;
        });
        last = last.replace(/Do you think (.*?)\s*will/ig, function (match, subject) {
            return `Will ${subject} likely`;
        });
        last = last.replace(/What do you think/ig, "What will");
        return last;
    }
    return s;
}

function simplifyChoice(c) {
    if (!c) return c;
    c = c.trim();
    c = c.replace(/^(She|He|They|It) (will )?/i, '');
    c = c.replace(/^(She|He|They|It) /i, '');
    c = c.replace(/^Yes[:,] /i, 'Yes: ');
    c = c.replace(/^No[:,] /i, 'No: ');
    if (c.length > 0) {
        c = c.charAt(0).toUpperCase() + c.slice(1);
    }
    c = c.replace(/[.?!]$/, '');
    return c;
}

function simplifyClue(c) {
    if (!c) return c;
    c = c.trim();
    c = c.replace(/^Think about /, 'Consider ');
    return c;
}

stories.forEach(story => {
    Object.values(story.versions).forEach(version => {
        if (!version.questions) return;
        ['literal', 'inferential', 'prediction', 'vocabulary'].forEach(qType => {
            if (version.questions[qType]) {
                version.questions[qType].forEach(q => {
                    q.prompt = simplifySentence(q.prompt);
                    q.clue = simplifyClue(q.clue);
                    if (q.choices) {
                        q.choices.forEach(choice => {
                            choice.text = simplifyChoice(choice.text);
                        });
                    }
                });
            }
        });
    });
});

let newStoriesCode = JSON.stringify(stories, null, 4);

// figurative
const figStart = text.indexOf('const figurativeQuestions = {');
const figEndMatch = text.match(/const figurativeQuestions = (\{.*?\n        \});\s*let currentStoryId =/s);

let newFigCode = "";
if (figEndMatch) {
    let figCode = figEndMatch[1];
    let figQuestions;
    eval('figQuestions = ' + figCode);

    Object.keys(figQuestions).forEach(key => {
        figQuestions[key].forEach(q => {
            q.prompt = simplifySentence(q.prompt);
            q.clue = simplifyClue(q.clue);
            if (q.choices) {
                q.choices.forEach(choice => {
                    choice.text = simplifyChoice(choice.text);
                });
            }
        });
    });
    newFigCode = JSON.stringify(figQuestions, null, 4);

    let newText = text.substring(0, storiesStart) + 'const stories = ' + newStoriesCode + ';\n\n        // ── Figurative Language Questions ──────────────\n        const figurativeQuestions = ' + newFigCode + ';\n\n        let currentStoryId =' + text.substring(figStart + figEndMatch[0].length);

    fs.writeFileSync(file, newText, 'utf8');
    console.log("Successfully rewrote stories and figurativeQuestions!");
} else {
    console.log("Could not find figurativeQuestions!");
}
