# How to Remove Old/Duplicate Activities

## Safe Removal Process

To remove an activity, you need to do TWO things:

### Step 1: Remove from Index.html

1. Open `index.html` in your editor
2. Search (Cmd+F / Ctrl+F) for the activity filename (e.g., `fall-reading-combined copy.html`)
3. Delete the entire activity entry, which looks like this:

```javascript
{
    title: 'Fall Reading Combined',
    file: 'fall-reading-combined copy.html',
    icon: '🍁',
    description: 'Combined fall reading activities',
    tags: ['Fall', 'Reading']
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
├── archive/           ← Create this folder
│   └── old-activities go here
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

Based on your files, these look like duplicates (all have " copy" suffix):

**Reading/Stories:**
- `reading_comprehension copy.html`
- `fall-reading-combined copy.html`
- `inference_activity copy.html`
- `fall-reading-comprehension_infer copy.html`
- `multi_level_reading_comp copy.html`
- `multi_level_reading_comp 2 copy.html`
- `story-retelling-worksheet copy.html`
- `story-elements-form copy.html`

**Language/Vocabulary:**
- `compare_contrast_dragdrop copy.html`
- `fall_nouns_category_function_expanded copy.html`
- `context_clues_activity 2 copy.html`
- `context_clues_activity copy.html`
- `fall_antonym_practice copy.html`

**Pragmatics/Social:**
- `relevant_social_q_and_a copy.html`
- `perspective_pair_inference copy.html`
- `high_school_social_conflict_reflection copy.html`
- `communication_breakdown_practice copy.html`
- `initiate_conversations_predict_response copy.html`
- `initiate_conversations_predict_response copy.html`
- `social_story_practice copy.html`

**And many more...**

Would you like me to:
1. Create a list of ALL duplicates with recommendations on which to keep?
2. Automatically remove all " copy" versions from the index?
3. Show you which ones are actually listed in the index currently?
