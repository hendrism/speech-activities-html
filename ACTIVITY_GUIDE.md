# Guide to Adding & Editing Speech Therapy Activities

## Quick Overview

You have three main options for creating and editing HTML activities:

1. **Use Claude Code** (Easiest) - Ask me to create or modify activities
2. **Use a Code Editor** (Recommended) - VS Code, Sublime Text, or similar
3. **Use a Text Editor** (Simple edits) - TextEdit (Mac), Notepad (Windows)

---

## Option 1: Using Claude Code (Ask Me!)

### Creating a New Activity

Just tell me what you want! For example:

> "Create a new activity for practicing pronouns with drag-and-drop"

> "Make an activity for sequencing fall events with 5 scenarios"

> "Build a multiple choice activity about emotions with pictures"

I'll create the complete HTML file for you, add it to the folder, and update the index.html so it appears in your hub.

### Editing Existing Activities

Tell me what to change:

> "In the fluency activity, change the practice words to include more vowel sounds"

> "Add 5 more analogies to the analogies activity"

> "Make the text bigger in the social Q&A activity"

> "Change the color scheme in the reading comprehension to be more blue"

---

## Option 2: Using a Code Editor (Recommended for You)

### Best Free Code Editors

**Visual Studio Code (VS Code)** - Most popular, free
- Download: https://code.visualstudio.com/
- Great for HTML, has live preview
- Install "Live Server" extension to see changes instantly

**Other Options:**
- Sublime Text (fast and clean)
- Atom (simple and friendly)

### How to Edit Activities in VS Code

1. **Open the folder**
   - Open VS Code
   - File → Open Folder
   - Select your `speech-activities-html` folder

2. **Find the activity**
   - Look in the file list on the left
   - Click the HTML file you want to edit

3. **Make changes**
   - The file has three sections:
     - `<style>` - Controls colors, sizes, layout
     - `<body>` - The content you see
     - `<script>` - The interactive behavior

4. **Preview changes**
   - Install "Live Server" extension
   - Right-click the HTML file → "Open with Live Server"
   - Changes show up automatically as you edit!

5. **Save**
   - Cmd+S (Mac) or Ctrl+S (Windows)

### Common Edits You Might Want

#### Change Text Content
Look for the text between `>` and `<`:
```html
<h1>Old Title</h1>
<!-- Change to: -->
<h1>New Title</h1>
```

#### Change Colors
Find the `<style>` section and look for color codes:
```css
background: #667eea;  /* Purple - change to any color code */
color: #4CAF50;       /* Green text */
```

Use a color picker: https://htmlcolorcodes.com/

#### Change Font Sizes
```css
font-size: 18px;  /* Make bigger: 24px, smaller: 14px */
```

#### Add More Questions/Items
Find the JavaScript data array and copy the pattern:
```javascript
const questions = [
    {
        question: "Existing question?",
        answer: "answer"
    },
    // Copy and paste this block, then change the text:
    {
        question: "New question?",
        answer: "new answer"
    }
];
```

---

## Option 3: Text Editor (Simple Changes Only)

### On Mac (TextEdit)

1. **Open TextEdit**
2. TextEdit → Preferences
   - Uncheck "Smart quotes"
   - Under "Open and Save", check "Display HTML files as HTML code"
3. **Open your HTML file**
   - File → Open
   - Select the activity HTML file
4. **Make simple text changes**
   - Change titles, questions, instructions
   - Be VERY careful not to delete `<` or `>` symbols
5. **Save**
   - File → Save

### On Windows (Notepad++)

Download Notepad++: https://notepad-plus-plus.org/

1. Open Notepad++
2. File → Open → select your HTML file
3. Make changes
4. File → Save

### ⚠️ Warning for Text Editors
- Don't use Microsoft Word (it breaks HTML)
- Be careful not to delete `<` `>` or `"` symbols
- Only change the actual text content, not the code

---

## Creating a New Activity from Scratch

### Template Structure

Every activity has the same basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activity Name</title>
    <style>
        /* Your CSS styles here */
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
    </style>
</head>
<body>
    <!-- Your content here -->
    <h1>Activity Title</h1>
    <p>Instructions go here</p>

    <script>
        // Your JavaScript code here
        console.log('Activity loaded');
    </script>
</body>
</html>
```

### Easy Way: Copy an Existing Activity

1. Find an activity similar to what you want
2. Make a copy of the HTML file
3. Rename it (e.g., `my-new-activity.html`)
4. Edit the content to match your needs
5. Add it to index.html (see below)

---

## Adding Your New Activity to the Index

After creating a new activity, add it to `index.html` so it appears in your hub.

### Steps:

1. **Open index.html** in your editor

2. **Find the activities array** (around line 230)

3. **Find the right category** (reading, pragmatics, fluency, etc.)

4. **Add your activity** to the items array:

```javascript
{
    title: 'My New Activity Name',
    file: 'my-new-activity.html',
    icon: '📝',  // Choose an emoji
    description: 'Short description of what this activity does',
    tags: ['Tag1', 'Tag2', 'Tag3']
}
```

### Example:

```javascript
{
    category: 'language',
    title: 'Language & Vocabulary',
    items: [
        {
            title: 'Analogies Activity',
            file: 'analogies_activity.html',
            icon: '🔗',
            description: 'Practice understanding and completing analogies',
            tags: ['Analogies', 'Reasoning', 'Vocabulary']
        },
        // ADD YOUR NEW ACTIVITY HERE:
        {
            title: 'Synonym Practice',
            file: 'synonym-practice.html',
            icon: '📖',
            description: 'Match words with similar meanings',
            tags: ['Synonyms', 'Vocabulary', 'Matching']
        }
    ]
}
```

5. **Save** and refresh your browser!

---

## Common Tasks

### Task: Change Activity Colors

1. Open the HTML file
2. Find the `<style>` section
3. Look for color codes like `#667eea` or color names like `blue`
4. Replace with your desired color
5. Test by opening the file in a browser

### Task: Add More Questions

1. Find the JavaScript section (usually at the bottom, between `<script>` tags)
2. Look for an array (starts with `[` and ends with `]`)
3. Copy one existing question/item
4. Paste it below, making sure to add a comma after the previous item
5. Change the content

Example:
```javascript
const questions = [
    {
        question: "First question?",
        answer: "answer 1"
    },  // ← Don't forget the comma!
    {
        question: "Second question?",
        answer: "answer 2"
    }
];
```

### Task: Change Button Text

Find the button in the HTML:
```html
<button onclick="checkAnswer()">Check Answer</button>
```
Change the text between `>` and `</button>`:
```html
<button onclick="checkAnswer()">Submit</button>
```

### Task: Make Text Bigger for Students

In the `<style>` section, add or modify:
```css
body {
    font-size: 20px;  /* Increase from default 16px */
}

h1 {
    font-size: 2.5em;  /* Even bigger headers */
}
```

---

## Getting Help

### Option 1: Ask Me (Claude Code)
Just describe what you want to do, and I'll help you make the changes or create new activities.

### Option 2: Use Browser Developer Tools
- Right-click on any element → "Inspect"
- See what styles are being applied
- Test changes live (won't save, but good for experimenting)

### Option 3: Online Resources
- **W3Schools HTML Tutorial**: https://www.w3schools.com/html/
- **W3Schools CSS Tutorial**: https://www.w3schools.com/css/
- **JavaScript Basics**: https://javascript.info/

---

## Tips & Best Practices

### ✅ Do This:
- Save a backup copy before making big changes
- Test in a browser after every change
- Use consistent naming (lowercase, hyphens for spaces)
- Add comments to explain what you changed
- Keep activities simple and focused on one skill

### ❌ Avoid This:
- Editing in Microsoft Word or Pages
- Deleting files without removing from index.html
- Making too many changes at once without testing
- Using special characters in filenames (stick to letters, numbers, hyphens)

---

## Troubleshooting

### "My changes aren't showing up!"
1. Make sure you saved the file (Cmd+S / Ctrl+S)
2. Refresh your browser (Cmd+R / Ctrl+R or F5)
3. Try a "hard refresh" (Cmd+Shift+R / Ctrl+Shift+R)

### "The page looks broken!"
1. Check if you accidentally deleted a `<`, `>`, or `"` character
2. Use Cmd+Z / Ctrl+Z to undo recent changes
3. If using VS Code, look for red error indicators
4. Ask me to help fix it!

### "Activity doesn't appear in index"
1. Check that you added it to the activities array in index.html
2. Make sure the filename matches exactly
3. Refresh the browser

### "Images aren't showing"
1. Check the image path is correct: `images/folder/filename.png`
2. Make sure the image file exists in that location
3. Check the filename matches exactly (case-sensitive)

---

## Quick Reference: File Locations

- **All activities**: Root folder (same level as index.html)
- **Index page**: `index.html`
- **Images**: `images/` folder and subfolders
- **Documentation**: `IMAGE_GUIDE.md`, `ACTIVITY_GUIDE.md`

---

## Examples of What to Ask Me

- "Create a new category in the index for articulation drills"
- "Make all the buttons bigger across all activities"
- "Add a print button to the fluency activity"
- "Create a template activity I can copy for making new exercises"
- "Fix the responsive design on the reading activity for tablets"
- "Add sound effects when correct answers are selected"

Remember: I'm here to help! Just describe what you want, and I'll handle the technical details.
