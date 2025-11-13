# Quick Reference Guide

## 🚀 Getting Started (For Any Session)

### First Steps
1. Open `index.html` in your browser
2. Bookmark it as your activities home page
3. Browse available activities by category

### Want to Make Changes?
1. Read `SESSION_SUMMARY.md` - What was done in last session
2. Read `ACTIVITY_GUIDE.md` - How to add/edit activities
3. Just ask Claude - Easiest option!

---

## 📁 Important Files & What They Do

| File | Purpose |
|------|---------|
| `index.html` | **START HERE** - Your activity hub |
| `SESSION_SUMMARY.md` | What happened in last session |
| `ACTIVITY_GUIDE.md` | How to create/edit activities |
| `IMAGE_GUIDE.md` | How to add/use images |
| `FILE_COMPARISON.md` | Duplicate files analysis |
| `REMOVE_ACTIVITIES.md` | How to safely delete activities |
| `resources/README.md` | How to use word lists |

---

## 📂 Directory Structure

```
speech-activities-html/
├── index.html              ← Open this first!
├── images/                 ← Organized image library
├── resources/              ← Word lists & materials
├── files-from-other-directory/  ← Files to review/merge
└── [58+ activity HTML files]
```

---

## 🎯 Common Tasks

### I Want To...

#### **See all my activities**
→ Open `index.html`

#### **Create a new activity**
→ Ask Claude: "Create a new activity for [whatever]"
→ OR follow `ACTIVITY_GUIDE.md`

#### **Modify an existing activity**
→ Ask Claude: "In [activity name], change [whatever]"
→ OR edit directly in VS Code (see ACTIVITY_GUIDE.md)

#### **Add images to an activity**
→ See `IMAGE_GUIDE.md` for complete examples
→ OR ask Claude: "Add images to [activity]"

#### **Create a word list**
→ Ask Claude: "Create a word list for [sound/theme]"
→ Claude will put it in `resources/word-lists/`

#### **Remove old activities**
→ Follow `REMOVE_ACTIVITIES.md` (2-step process)
→ OR ask Claude: "Remove [activity name] from index"

#### **Find duplicate files**
→ Check `FILE_COMPARISON.md`

#### **Convert JSX activities to HTML**
→ Ask Claude: "Convert [activity name] from src copy folder"

---

## 🆕 New Activities (This Session)

1. **Articulation Practice - Drag & Drop**
   - Drag words into sentences
   - 20 sentences, 2 pages

2. **Articulation Practice - Sequential**
   - Pick word, reveal sentence
   - Includes Initial /r/ category

3. **Vocalic R Practice**
   - Comprehensive vocalic R sounds
   - Multiple positions

4. **Articulation Story Builder** ⭐
   - Pick 2-4 words
   - Write multi-sentence stories

---

## 💡 Quick Commands for Claude

Copy and paste these:

```
"Show me all available activities"
→ Claude will open index.html info

"Create a new activity for practicing [skill]"
→ Claude will create HTML file and add to index

"Add [X] more questions to [activity name]"
→ Claude will edit the activity

"Create a word list for [sound/theme]"
→ Claude will create in resources/word-lists/

"Convert [JSX activity name] to HTML"
→ Claude will convert from src copy folder

"Add images to [activity name]"
→ Claude will integrate image system

"Help me clean up duplicate files"
→ Claude will use FILE_COMPARISON.md
```

---

## 🔧 Technical Setup (If Editing Manually)

### Recommended: VS Code
1. Download: https://code.visualstudio.com/
2. Install "Live Server" extension
3. Right-click HTML file → "Open with Live Server"
4. Changes show instantly!

### File Editing Tips
- **HTML files are standalone** - Everything is inline
- **Purple gradient background** - Standard across all activities
- **Color coding:**
  - Blue = Nouns
  - Green = Verbs
  - Purple = Adjectives

---

## 📊 Current Stats

- **Activities:** 60+ HTML files
- **Categories:** 8 main categories in index
- **Articulation Activities:** 4 (including new conversions)
- **Image Folders:** 8 organized categories
- **Resource Files:** Initial /r/ word list created
- **Documentation Files:** 6 comprehensive guides

---

## 🎓 Learning Resources

### Understanding the Codebase
1. All activities are **standalone HTML**
2. **No external dependencies** needed
3. CSS is inline in `<style>` tags
4. JavaScript is inline in `<script>` tags
5. Open any HTML file to see how it works

### Want to Learn More?
- **HTML basics:** https://www.w3schools.com/html/
- **CSS styling:** https://www.w3schools.com/css/
- **JavaScript:** https://javascript.info/

---

## 🚨 Important Notes

### Before Deleting Files
1. **Always check index.html first**
2. Remove from index before deleting file
3. Consider moving to `archive/` folder instead
4. See `REMOVE_ACTIVITIES.md` for details

### File Naming
- Use lowercase
- Use hyphens for spaces
- Be descriptive
- Example: `articulation-practice-sequential.html`

### When Stuck
1. Check relevant documentation file
2. Ask Claude for help
3. Try opening file in browser to test
4. Use browser DevTools (F12) to debug

---

## 📝 Session Notes Template

Use this when starting a new session:

```markdown
## Session Date: [Date]

### Goals:
- [ ] Goal 1
- [ ] Goal 2

### Completed:
- ✅ Task 1
- ✅ Task 2

### Next Steps:
- Idea 1
- Idea 2

### Files Modified:
- file1.html
- file2.html
```

---

## 🔗 Related Files

| Want to... | See this file |
|------------|---------------|
| Understand last session | `SESSION_SUMMARY.md` |
| Create/edit activities | `ACTIVITY_GUIDE.md` |
| Add images | `IMAGE_GUIDE.md` |
| Manage word lists | `resources/README.md` |
| Handle duplicates | `FILE_COMPARISON.md` |
| Remove activities | `REMOVE_ACTIVITIES.md` |

---

**Remember: You can always ask Claude for help! Just describe what you want to do.**
