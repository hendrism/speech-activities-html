# How to Remove Old/Duplicate Activities

## Safe Removal Process

To remove an activity, you need to do TWO things:

### Step 1: Remove from Index.html

1. Open `index.html` in your editor
2. Search (Cmd+F / Ctrl+F) for the activity filename (e.g., `fall_reading_simple.html`)
3. Delete the entire activity entry, which looks like this:

```javascript
{
    title: 'Fall Reading - Simple',
    file: 'fall_reading_simple.html',
    icon: '🍁',
    description: 'Simplified fall stories for beginning readers.',
    tags: ['Fall Theme', 'Beginning Level', 'Simple']
},  // ← Don't forget to clean up the comma!
```

4. Make sure the comma situation is correct:
   - If it's the last item in a category, remove the comma from the previous item
   - If it's in the middle, make sure there's still a comma after the item above it

5. Save the file

### Step 2: Delete the HTML File (Optional)

Now it's safe to delete the actual HTML file from your folder.

**OR** you can create an "archive" folder:
```
speech-activities-html/
├── archive/           ← Old/draft activities live here
│   └── (moved off the main index)
├── index.html
└── other activities...
```

Move old files to `archive/` instead of deleting them. That way you can restore them later if needed.

---

## Even Easier: Ask Me to Do It!

Just tell me which activities to remove, like:

> "Remove all the activities with 'copy' in the filename"

> "Remove the old fall-reading-combined activity"

> "Keep only the final version of story retelling, remove the others"

I'll:
1. Update index.html to remove the entries
2. Tell you which files are safe to delete
3. Optionally move them to an archive folder for you

---

## How to Identify Duplicates

Activities with " copy" in the filename are usually duplicates:
- `fall-reading-combined copy.html` ← Probably old
- `fall-reading-combined.html` ← Probably newer

Activities with version indicators:
- `hs_story_retelling.html` ← Older
- `hs_story_retelling_final.html` ← Probably the one to keep

Check the file dates:
- On Mac: Right-click → Get Info → look at "Modified" date
- On Windows: Right-click → Properties → look at "Date modified"

---

## Quick Reference: Current Duplicates I See

Copy-suffixed drafts were moved into `/archive` during the cleanup. Current archive contents:

- Active versions of the ones still in use were renamed without " copy" and are linked in `index.html`.

- `reading_comprehension copy.html`
- `fall-reading-combined copy.html`
- `reading_comprehension_accessible copy.html`
- `reading_comprehension_simple copy.html`
- `fall-reading-comprehension copy.html`
- `fall-reading-combined copy.html`
- `fall-reading-comprehension_SOAR copy.html`
- `fall-reading-literal_infer_retell_higher copy.html`
- `compare_contrast_dragdrop copy.html`
- `compare_contrast_fixed copy.html`
- `compare_contrast_template copy.html`
- `compare_contrast_double_bubble copy.html`
- `context_clues_activity copy.html`
- `context_clues_activity 2 copy.html`
- `context_clues_detective copy.html`
- `multi_level_reading_comp 2 copy.html`
- `multi_level_reading_comp_with_questions copy.html`
- `story-elements-form copy.html`
- `story_prompts_pages copy.html`
- `fall-noun-description copy.html`
- `grade9_inference_context_clues copy.html`
- `modern_past_tense copy.html`
- `initiate_conversations_generate_responses copy.html`

Would you like me to:
1. Create a list of ALL duplicates with recommendations on which to keep?
2. Automatically remove all " copy" versions from the index?
3. Show you which ones are actually listed in the index currently?
