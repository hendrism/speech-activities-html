# Resources Directory

This folder contains centralized resources that can be used across multiple activities.

## Folder Structure

```
resources/
├── word-lists/           # Word lists organized by sound, theme, or category
├── sound-lists/          # Lists by phoneme or sound pattern
├── sentence-templates/   # Reusable sentence frames and templates
├── worksheets/          # Printable worksheets and handouts
└── reference-materials/  # Quick reference guides and charts
```

## How to Use

### 1. Word Lists

Store word lists as simple text files or JSON for easy reuse:

**Example: `/resources/word-lists/r-initial-words.txt`**
```
red
run
rain
rabbit
rocket
rainbow
```

**Or as JSON: `/resources/word-lists/r-initial-words.json`**
```json
{
  "sound": "r-initial",
  "level": "beginning",
  "words": ["red", "run", "rain", "rabbit", "rocket", "rainbow"]
}
```

### 2. Sound Lists

Organize by phoneme position:

```
sound-lists/
├── r-sounds/
│   ├── initial-r.txt
│   ├── medial-r.txt
│   ├── final-r.txt
│   └── vocalic-r.txt
├── s-sounds/
│   ├── initial-s.txt
│   ├── s-blends.txt
│   └── final-s.txt
└── th-sounds/
    ├── voiced-th.txt
    └── voiceless-th.txt
```

### 3. Sentence Templates

Reusable sentence frames for different activities:

**Example: `sentence-templates/past-tense-frames.txt`**
```
Yesterday I ___ to the park.
Last week we ___ a movie.
This morning she ___ breakfast.
```

### 4. Using Resources in Your Activities

#### Load from a text file:
```javascript
// Fetch word list
fetch('resources/word-lists/r-initial-words.txt')
  .then(response => response.text())
  .then(data => {
    const words = data.split('\n').filter(word => word.trim());
    // Use words in your activity
  });
```

#### Load from JSON:
```javascript
fetch('resources/word-lists/r-initial-words.json')
  .then(response => response.json())
  .then(data => {
    const words = data.words;
    // Use words in your activity
  });
```

#### Embed directly in HTML:
```html
<script>
const rInitialWords = ["red", "run", "rain", "rabbit", "rocket", "rainbow"];
const sInitialWords = ["sun", "sit", "sock", "sand", "seal", "soup"];

// Use in your activity
</script>
```

## Quick Start Examples

### Example 1: Simple Word List (TXT format)

Create: `resources/word-lists/fall-vocabulary.txt`
```
pumpkin
leaves
autumn
harvest
scarecrow
apple
```

### Example 2: Organized Sound List (JSON format)

Create: `resources/sound-lists/l-blends.json`
```json
{
  "soundPattern": "l-blends",
  "description": "Words with L blend combinations",
  "blends": {
    "bl": ["blue", "black", "bless", "blend"],
    "cl": ["clap", "clean", "close", "climb"],
    "fl": ["fly", "flag", "floor", "flower"],
    "gl": ["glad", "glass", "globe", "glove"],
    "pl": ["play", "plan", "please", "plug"],
    "sl": ["slide", "sleep", "slow", "slip"]
  }
}
```

### Example 3: Sentence Templates

Create: `resources/sentence-templates/wh-questions.txt`
```
WHO
Who is your best friend?
Who helps you at school?
Who do you play with?

WHAT
What is your favorite food?
What do you like to do?
What makes you happy?

WHERE
Where do you live?
Where do you go to school?
Where is your favorite place?

WHEN
When is your birthday?
When do you eat lunch?
When do you go to bed?

WHY
Why do we brush our teeth?
Why do leaves fall in autumn?
Why is it important to share?
```

### Example 4: Category Lists

Create: `resources/word-lists/categories.json`
```json
{
  "animals": ["dog", "cat", "bird", "fish", "rabbit", "horse"],
  "food": ["apple", "pizza", "banana", "sandwich", "cookie", "milk"],
  "colors": ["red", "blue", "green", "yellow", "purple", "orange"],
  "actions": ["run", "jump", "eat", "sleep", "play", "read"],
  "places": ["school", "park", "home", "store", "library", "playground"]
}
```

## Pre-Made Resource Templates

I can create any of these for you - just ask!

### Articulation Resources:
- Initial/medial/final word lists for all phonemes
- Minimal pairs lists
- Blend and digraph combinations
- Vocalic R word lists

### Language Resources:
- Category word lists (animals, food, clothing, etc.)
- Seasonal vocabulary (fall, winter, spring, summer)
- Common irregular verbs
- Pronoun reference lists
- Preposition lists with example phrases

### Social Skills Resources:
- Conversation starters
- Feeling words with synonyms
- Social scenario descriptions
- Question frames

### Reading Resources:
- High-frequency words by level
- Sight word lists
- Prefix/suffix reference
- Common idioms and figurative language

## Best Practices

✅ **Do:**
- Use clear, consistent naming (lowercase, hyphens)
- Organize by category or skill
- Keep lists focused and manageable
- Use JSON for complex data
- Use TXT for simple lists

❌ **Avoid:**
- Mixing different sounds/skills in one file
- Very long lists (break into smaller files)
- Special characters in filenames

## Ask Me for Help!

Tell me what resources you need:

- "Create a word list for final /s/ sounds"
- "Make a JSON file with all the fall vocabulary"
- "Generate sentence templates for practicing pronouns"
- "Create category lists for describing functions"

I'll create properly formatted resource files you can use immediately!
