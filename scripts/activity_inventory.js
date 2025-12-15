const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === ".git") continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(full));
        } else if (entry.isFile() && entry.name.endsWith(".html")) {
            files.push(full);
        }
    }
    return files;
}

const keywordCategories = [
    ["winter", "Winter"],
    ["fall", "Fall"],
    ["thanksgiving", "Thanksgiving"],
    ["articulation", "Articulation"],
    ["fluency", "Fluency"],
    ["inference", "Inference"],
    ["context", "Context clues"],
    ["synonym", "Synonyms"],
    ["definition", "Definitions"],
    ["reading", "Reading"],
    ["social", "Social"],
    ["conversation", "Conversation"],
    ["compare", "Compare/contrast"],
    ["direction", "Directions"],
    ["story", "Story"],
    ["vocabulary", "Vocabulary"]
];

function guessCategory(file) {
    const name = path.basename(file).toLowerCase();
    const matches = keywordCategories
        .filter(([key]) => name.includes(key))
        .map(([, label]) => label);
    return Array.from(new Set(matches));
}

function extractTitle(content) {
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) return titleMatch[1].trim();
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match) return h1Match[1].trim();
    return null;
}

function extractDescription(content) {
    const meta = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    if (meta) return meta[1].trim();
    const firstP = content.match(/<p[^>]*>([^<]{20,400})<\/p>/i);
    if (firstP) return firstP[1].replace(/\s+/g, " ").trim();
    return null;
}

function detectComponents(content) {
    const checks = [
        ["stories", /stories\s*=\s*\[/i],
        ["modeToggle", /mode-toggle/i],
        ["literalQuestions", /literal\s*:\s*\[/i],
        ["inferentialQuestions", /inferential\s*:\s*\[/i],
        ["futureTense", /future\s*:\s*\[/i],
        ["retell", /retell\s*:\s*\[/i],
        ["wordMeaning", /definitions\s*:\s*\[/i],
        ["synonyms", /synonyms\s*:\s*\[/i],
        ["images", /<img/i],
        ["audio", /<audio/i],
        ["dragDrop", /drag|draggable|dropzone/i],
        ["multipleChoice", /choices\s*:\s*\[/i],
        ["tabs", /tab-list|tabs/i],
        ["sliders", /input[^>]+type=["']range["']/i],
        ["speechControls", /playBtn|pauseBtn|speak\(/i],
        ["prompts", /prompt/i],
        ["wordBank", /word-bank/i],
        ["timer", /timer/i]
    ];
    return checks
        .filter(([, regex]) => regex.test(content))
        .map(([name]) => name);
}

function summarizeFile(file) {
    const content = fs.readFileSync(file, "utf8");
    const title = extractTitle(content);
    const description = extractDescription(content);
    const components = detectComponents(content);
    const categories = guessCategory(file);
    const imageCount = (content.match(/<img/gi) || []).length;
    const storyCount = (content.match(/stories\s*=\s*\[/gi) || []).length;
    return {
        file: path.relative(root, file),
        title,
        categories,
        description,
        components,
        imageCount,
        storyCount
    };
}

const htmlFiles = walk(root);
const summaries = htmlFiles.map(summarizeFile);

fs.writeFileSync(
    path.join(root, "activity_inventory.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), count: summaries.length, summaries }, null, 2),
    "utf8"
);

console.log(`Generated activity_inventory.json for ${summaries.length} HTML files.`);
