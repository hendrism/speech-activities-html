const fs = require('fs');

const raw = fs.readFileSync('data/stories.js', 'utf8');

// Fake the window environment
global.window = {};

eval(raw); // This will populate window.ActivityData

if (!window.ActivityData || !window.ActivityData.stories) {
    console.log("FAILED to load window.ActivityData.stories");
} else {
    const data = window.ActivityData.stories;
    const config = data['spring-informational-texts-advanced'];
    
    if (!config) {
        console.log("CONFIG IS UNDEFINED! Key not found.");
    } else {
        console.log("CONFIG LOADED! Display mode:", config._meta.displayMode);
        console.log("Stories:", config.stories.length);
    }
}
