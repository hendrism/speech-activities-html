const fs = require('fs');

const text = fs.readFileSync('/Users/Sean-Work/Desktop/speech-activities-html/activities/reading/late-winter-early-spring-reading.html', 'utf8');

const match = text.match(/const stories = (\[[\s\S]*?\]);\s*<\/script>/);
if (match) {
    const storiesJSON = match[1];
    
    // Evaluate the matching string as JavaScript
    let stories;
    try {
        stories = eval(storiesJSON);
    } catch (e) {
        console.error("Failed to eval stories:", e);
        process.exit(1);
    }

    let output = '';
    
    stories.forEach(story => {
        output += `\n=== Story: ${story.title} ===\n`;
        const versions = story.versions;
        for (const [vName, vData] of Object.entries(versions)) {
            output += `\n  -- Version: ${vName} --\n`;
            if (vData.questions) {
                for (const [qType, qList] of Object.entries(vData.questions)) {
                    output += `    - Type: ${qType}\n`;
                    qList.forEach((q, idx) => {
                        output += `      Q${idx+1}: ${q.prompt}\n`;
                        q.choices.forEach(c => {
                            const mark = c.isCorrect ? '*' : ' ';
                            output += `        [${mark}] ${c.text}\n`;
                        });
                    });
                }
            }
        }
    });
    
    fs.writeFileSync('questions_dump.txt', output);
    console.log("Successfully dumped to questions_dump.txt");
} else {
    console.log("No match found");
}
