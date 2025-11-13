# Image Management Guide for Speech Therapy Activities

## Overview
This guide explains how to organize and use images across your speech therapy activities.

## Directory Structure

```
images/
├── food/           # Food items (apple, pizza, sandwich, etc.)
├── animals/        # Animals (dog, cat, bird, fish, etc.)
├── objects/        # Common objects (ball, book, chair, etc.)
├── seasons/        # Seasonal items (pumpkin, snowflake, flower, etc.)
├── emotions/       # Emotion faces (happy, sad, angry, etc.)
├── people/         # People doing activities
├── places/         # Locations (school, park, home, etc.)
└── activities/     # Action images (running, eating, playing, etc.)
```

## How to Add Images

### 1. Organize Your Images
When you get new images, save them in the appropriate folder:
- **Food**: `images/food/apple.png`, `images/food/pizza.jpg`
- **Animals**: `images/animals/dog.png`, `images/animals/cat.jpg`
- **Objects**: `images/objects/ball.png`, `images/objects/book.jpg`
- And so on...

### 2. Naming Convention
Use clear, simple names in lowercase with hyphens for spaces:
- ✅ Good: `red-apple.png`, `happy-face.jpg`, `autumn-leaves.png`
- ❌ Avoid: `IMG_1234.jpg`, `MyImage.PNG`, `photo 1.jpg`

## How to Use Images in Your Activities

### Basic Image Display

```html
<!-- Simple image -->
<img src="images/food/apple.png" alt="Apple" width="200">

<!-- Image with styling -->
<img src="images/animals/dog.jpg" alt="Dog" style="width: 150px; border-radius: 10px;">
```

### Creating an Image Grid

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <div style="text-align: center;">
        <img src="images/food/apple.png" alt="Apple" style="width: 100%;">
        <p>Apple</p>
    </div>
    <div style="text-align: center;">
        <img src="images/food/banana.png" alt="Banana" style="width: 100%;">
        <p>Banana</p>
    </div>
    <div style="text-align: center;">
        <img src="images/food/orange.png" alt="Orange" style="width: 100%;">
        <p>Orange</p>
    </div>
</div>
```

### Interactive Image Selection

```html
<style>
.image-option {
    cursor: pointer;
    border: 3px solid transparent;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.image-option:hover {
    border-color: #667eea;
    transform: scale(1.05);
}

.image-option.selected {
    border-color: #4CAF50;
    background: #e8f5e9;
}
</style>

<div class="image-option" onclick="selectImage(this)">
    <img src="images/animals/dog.png" alt="Dog" style="width: 150px;">
    <p>Dog</p>
</div>

<script>
function selectImage(element) {
    // Remove selection from all images
    document.querySelectorAll('.image-option').forEach(el => {
        el.classList.remove('selected');
    });
    // Select clicked image
    element.classList.add('selected');
}
</script>
```

### Drag and Drop Images

```html
<style>
.draggable-image {
    cursor: move;
    width: 100px;
    padding: 10px;
}

.drop-zone {
    min-height: 150px;
    border: 3px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
}

.drop-zone.drag-over {
    background: #e3f2fd;
    border-color: #2196F3;
}
</style>

<div>
    <img src="images/food/apple.png" class="draggable-image" draggable="true"
         ondragstart="drag(event)" alt="Apple">
</div>

<div class="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    Drop image here
</div>

<script>
function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('drag-over');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.src);
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('drag-over');
    const src = ev.dataTransfer.getData("text");
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100px";
    ev.currentTarget.appendChild(img);
}
</script>
```

## Example: Complete Activity with Images

Here's a complete example of a simple matching activity:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Matching Activity</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f0f0f0;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 15px;
        }

        .image-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 20px 0;
        }

        .image-card {
            text-align: center;
            padding: 15px;
            border: 3px solid #ddd;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .image-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .image-card.selected {
            border-color: #4CAF50;
            background: #e8f5e9;
        }

        .image-card img {
            width: 100%;
            height: 150px;
            object-fit: contain;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Find All the Animals!</h1>
        <p>Click on all the animals you see.</p>

        <div class="image-grid">
            <div class="image-card" data-type="animal" onclick="selectImage(this)">
                <img src="images/animals/dog.png" alt="Dog">
                <p>Dog</p>
            </div>
            <div class="image-card" data-type="food" onclick="selectImage(this)">
                <img src="images/food/apple.png" alt="Apple">
                <p>Apple</p>
            </div>
            <div class="image-card" data-type="animal" onclick="selectImage(this)">
                <img src="images/animals/cat.png" alt="Cat">
                <p>Cat</p>
            </div>
            <div class="image-card" data-type="object" onclick="selectImage(this)">
                <img src="images/objects/ball.png" alt="Ball">
                <p>Ball</p>
            </div>
            <div class="image-card" data-type="animal" onclick="selectImage(this)">
                <img src="images/animals/bird.png" alt="Bird">
                <p>Bird</p>
            </div>
            <div class="image-card" data-type="food" onclick="selectImage(this)">
                <img src="images/food/banana.png" alt="Banana">
                <p>Banana</p>
            </div>
        </div>

        <button onclick="checkAnswers()" style="padding: 15px 30px; font-size: 18px;
                background: #4CAF50; color: white; border: none; border-radius: 10px;
                cursor: pointer;">Check Answers</button>

        <div id="feedback" style="margin-top: 20px; padding: 20px; border-radius: 10px;"></div>
    </div>

    <script>
        function selectImage(element) {
            element.classList.toggle('selected');
        }

        function checkAnswers() {
            const selected = document.querySelectorAll('.image-card.selected');
            const animals = document.querySelectorAll('.image-card[data-type="animal"]');
            const feedback = document.getElementById('feedback');

            let correct = 0;
            let incorrect = 0;

            selected.forEach(card => {
                if (card.dataset.type === 'animal') {
                    correct++;
                } else {
                    incorrect++;
                }
            });

            const total = animals.length;
            const missed = total - correct;

            if (correct === total && incorrect === 0) {
                feedback.innerHTML = '🎉 Perfect! You found all the animals!';
                feedback.style.background = '#c6f6d5';
                feedback.style.color = '#22543d';
            } else {
                feedback.innerHTML = `You found ${correct} out of ${total} animals. ${incorrect > 0 ? 'You selected ' + incorrect + ' non-animals.' : ''}`;
                feedback.style.background = '#fed7d7';
                feedback.style.color = '#742a2a';
            }
        }
    </script>
</body>
</html>
```

## Tips for Using Images

### 1. **Image Size**
- Keep images under 500KB for fast loading
- Use appropriate dimensions (usually 200-500px wide is good)
- Consider using compressed formats (WebP, optimized PNG/JPEG)

### 2. **Accessibility**
- Always include `alt` text describing the image
- Use descriptive names that match the content

### 3. **Responsive Design**
```css
img {
    max-width: 100%;
    height: auto;
}
```

### 4. **Finding Free Images**
- **Unsplash** (unsplash.com) - High-quality photos
- **Pexels** (pexels.com) - Free stock photos
- **Pixabay** (pixabay.com) - Free images and illustrations
- **Freepik** (freepik.com) - Icons and illustrations (check license)
- **The Noun Project** (thenounproject.com) - Simple icons

### 5. **Creating Your Own Images**
- Use **Canva** (free account) to create simple graphics
- Use **Remove.bg** to remove backgrounds from images
- Use screenshot tools to capture specific items

## Common Image Scenarios

### Food Images for Naming Activities
```html
<div class="food-grid">
    <img src="images/food/apple.png" alt="Apple">
    <img src="images/food/banana.png" alt="Banana">
    <img src="images/food/pizza.png" alt="Pizza">
    <img src="images/food/sandwich.png" alt="Sandwich">
</div>
```

### Emotion Cards
```html
<div class="emotion-cards">
    <img src="images/emotions/happy.png" alt="Happy face">
    <img src="images/emotions/sad.png" alt="Sad face">
    <img src="images/emotions/angry.png" alt="Angry face">
    <img src="images/emotions/surprised.png" alt="Surprised face">
</div>
```

### Seasonal Activities
```html
<div class="seasonal-images">
    <img src="images/seasons/pumpkin.png" alt="Pumpkin">
    <img src="images/seasons/leaves.png" alt="Fall leaves">
    <img src="images/seasons/acorn.png" alt="Acorn">
</div>
```

## Troubleshooting

**Image not showing?**
1. Check the file path is correct
2. Verify the image file exists in the specified folder
3. Check the file extension matches (.png, .jpg, .jpeg)
4. Make sure the filename matches exactly (case-sensitive on some systems)

**Image too large/small?**
Use CSS to control size:
```html
<img src="images/food/apple.png" style="width: 200px; height: auto;">
```

## Quick Reference: Common Image Paths

```
images/food/apple.png
images/food/banana.png
images/food/pizza.png
images/animals/dog.png
images/animals/cat.png
images/animals/bird.png
images/objects/ball.png
images/objects/book.png
images/objects/chair.png
images/seasons/pumpkin.png
images/seasons/snowflake.png
images/emotions/happy.png
images/emotions/sad.png
```

---

**Remember**: The images folder works like a library. Add images once, use them in multiple activities!
