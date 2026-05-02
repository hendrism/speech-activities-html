const fs = require('fs');
let text = fs.readFileSync('/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html', 'utf8');
let startIndex = text.indexOf('const stories =');
let endIndex = text.indexOf('</script>', startIndex);
let code = text.substring(startIndex, endIndex);

try {
    eval(code); // defines 'stories'
    let out = '';
    stories.forEach(s => {
        out += `\n################################################\n`;
        out += `STORY: ${s.title}\n`;
        out += `################################################\n`;
        for (let v in s.versions) {
            out += `\n  === VERSION: ${v} ===\n`;
            let qData = s.versions[v].questions;
            if (qData) {
                for (let qType in qData) {
                    out += `    --- ${qType} ---\n`;
                    qData[qType].forEach((q, i) => {
                        out += `    Q${i + 1}: ${q.prompt}\n`;
                        out += `    Clue: ${q.clue}\n`;
                        q.choices.forEach((c, ci) => {
                            let mark = c.isCorrect ? '[x]' : '[ ]';
                            out += `      ${['A', 'B', 'C', 'D'][ci]}. ${mark} ${c.text}\n`;
                        });
                    });
                }
            }
        }
    });
    fs.writeFileSync('questions_dump.txt', out);
    console.log("Success! Extracted to questions_dump.txt");
} catch (e) {
    console.error("Eval error:", e);
}
