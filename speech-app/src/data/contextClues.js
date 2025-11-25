export const contextClues = [
    {
        text: "My best <span class='target-word font-bold text-blue-600'>friend</span>, someone who likes me and I like them back, invited me to her birthday party.",
        type: "Definition",
        word: "friend",
        hint: "Look for the part that explains what a friend is. It's right after the word.",
        choices: ["a person you like and who likes you", "a book you read", "a game you play", "a place you visit"]
    },
    {
        text: "Mom told us to <span class='target-word font-bold text-blue-600'>whisper</span>, to talk very quietly, because the baby was sleeping.",
        type: "Definition",
        word: "whisper",
        hint: "The sentence tells you how to whisper. What does it mean to talk this way?",
        choices: ["to talk very quietly", "to talk very loudly", "to run very fast", "to walk very slowly"]
    },
    {
        text: "I jumped over the <span class='target-word font-bold text-blue-600'>puddle</span>, a small pool of water on the ground, so my shoes wouldn't get wet.",
        type: "Definition",
        word: "puddle",
        hint: "Look for what a puddle is described as - it comes right after the word.",
        choices: ["a small pool of water", "a big rock", "a tall tree", "a soft pillow"]
    },
    {
        text: "The joke made me <span class='target-word font-bold text-blue-600'>giggle</span>, which means to laugh in a silly, quiet way.",
        type: "Definition",
        word: "giggle",
        hint: "The sentence explains what giggling means. Look after the word 'means'.",
        choices: ["to laugh quietly", "to cry loudly", "to run quickly", "to sleep deeply"]
    },
    {
        text: "I ate a <span class='target-word font-bold text-blue-600'>snack</span>, a small amount of food between meals, because I was a little hungry.",
        type: "Definition",
        word: "snack",
        hint: "Find the part that tells you when and how much food a snack is.",
        choices: ["a small amount of food", "a big dinner", "a warm drink", "a cold dessert"]
    },
    {
        text: "The puppy was <span class='target-word font-bold text-blue-600'>tiny</span>; it was so small it fit in my hand!",
        type: "Synonym",
        word: "tiny",
        hint: "Look for another word in the sentence that means the same as tiny.",
        choices: ["very small", "very large", "very loud", "very quiet"]
    },
    {
        text: "I was <span class='target-word font-bold text-blue-600'>glad</span> to see my friend; I felt so happy when she arrived.",
        type: "Synonym",
        word: "glad",
        hint: "Find a word that means the same thing as glad.",
        choices: ["happy", "angry", "tired", "hungry"]
    },
    {
        text: "The baby was <span class='target-word font-bold text-blue-600'>sleepy</span> and tired after playing all day.",
        type: "Synonym",
        word: "sleepy",
        hint: "What word in the sentence means the same as sleepy?",
        choices: ["tired", "awake", "excited", "scared"]
    },
    {
        text: "The ice cream was <span class='target-word font-bold text-blue-600'>delicious</span>; it tasted really good and I wanted more.",
        type: "Synonym",
        word: "delicious",
        hint: "Look for words that tell you how the ice cream tasted.",
        choices: ["tasted really good", "tasted really bad", "looked very big", "felt very cold"]
    },
    {
        text: "The test was <span class='target-word font-bold text-blue-600'>easy</span>; it was so simple that I finished quickly.",
        type: "Synonym",
        word: "easy",
        hint: "Find another word that describes something that's not hard.",
        choices: ["simple", "difficult", "long", "short"]
    },
    {
        text: "The pillow was <span class='target-word font-bold text-blue-600'>soft</span>, not hard like a rock.",
        type: "Antonym",
        word: "soft",
        hint: "The sentence tells you what soft is NOT. Think of the opposite.",
        choices: ["not hard", "not small", "not fast", "not cold"]
    },
    {
        text: "My backpack was <span class='target-word font-bold text-blue-600'>heavy</span>, not light, and it hurt my shoulders.",
        type: "Antonym",
        word: "heavy",
        hint: "Look for the word 'not' - it shows you the opposite of heavy.",
        choices: ["not light", "not dark", "not big", "not wet"]
    },
    {
        text: "The turtle was <span class='target-word font-bold text-blue-600'>slow</span>, not fast like the rabbit.",
        type: "Antonym",
        word: "slow",
        hint: "What is the opposite of slow? The sentence tells you.",
        choices: ["not fast", "not big", "not small", "not green"]
    },
    {
        text: "The room was <span class='target-word font-bold text-blue-600'>dark</span>, not bright, so we turned on the lights.",
        type: "Antonym",
        word: "dark",
        hint: "Find what dark is NOT to understand what it IS.",
        choices: ["not bright", "not clean", "not messy", "not quiet"]
    },
    {
        text: "My hands were <span class='target-word font-bold text-blue-600'>dirty</span>, not clean, after playing in the mud.",
        type: "Antonym",
        word: "dirty",
        hint: "The opposite of dirty is mentioned in the sentence.",
        choices: ["not clean", "not dry", "not warm", "not soft"]
    },
    {
        text: "We saw many <span class='target-word font-bold text-blue-600'>insects</span>, like bees, ants, and butterflies, in the garden.",
        type: "Example",
        word: "insects",
        hint: "Look at the examples given. What are bees, ants, and butterflies?",
        choices: ["small bugs", "big animals", "pretty flowers", "tall trees"]
    },
    {
        text: "I like to eat <span class='target-word font-bold text-blue-600'>fruit</span>, such as apples, bananas, and grapes, for a healthy snack.",
        type: "Example",
        word: "fruit",
        hint: "The examples tell you what fruit is. What do apples, bananas, and grapes have in common?",
        choices: ["healthy foods from plants", "types of candy", "different drinks", "kinds of bread"]
    },
    {
        text: "The farm had many <span class='target-word font-bold text-blue-600'>animals</span>, including cows, pigs, and chickens.",
        type: "Example",
        word: "animals",
        hint: "Think about what cows, pigs, and chickens all are.",
        choices: ["living creatures", "farm buildings", "types of food", "kinds of plants"]
    },
    {
        text: "We played different <span class='target-word font-bold text-blue-600'>games</span>, like tag, hide and seek, and hopscotch, at recess.",
        type: "Example",
        word: "games",
        hint: "What do tag, hide and seek, and hopscotch have in common?",
        choices: ["fun activities to play", "things to eat", "books to read", "places to visit"]
    },
    {
        text: "Mom bought <span class='target-word font-bold text-blue-600'>vegetables</span>, such as carrots, broccoli, and tomatoes, at the store.",
        type: "Example",
        word: "vegetables",
        hint: "Look at the examples. What kind of foods are carrots, broccoli, and tomatoes?",
        choices: ["healthy plant foods", "sweet desserts", "cold drinks", "hot soups"]
    },
    {
        text: "She was <span class='target-word font-bold text-blue-600'>hungry</span> because she hadn't eaten all day and her stomach was growling loudly.",
        type: "Inference",
        word: "hungry",
        hint: "Think about how you feel when you haven't eaten and your stomach growls.",
        choices: ["wanting to eat food", "wanting to sleep", "wanting to play", "wanting to read"]
    },
    {
        text: "The boy was <span class='target-word font-bold text-blue-600'>excited</span> about his birthday party and couldn't stop smiling and jumping around.",
        type: "Inference",
        word: "excited",
        hint: "When someone smiles a lot and jumps around, how are they feeling?",
        choices: ["very happy and eager", "very sad and upset", "very tired and sleepy", "very angry and mad"]
    },
    {
        text: "After playing outside in the hot sun all day, I was really <span class='target-word font-bold text-blue-600'>thirsty</span> and drank three glasses of water.",
        type: "Inference",
        word: "thirsty",
        hint: "What do you need when you've been in the sun and you drink lots of water?",
        choices: ["needing a drink", "needing food", "needing sleep", "needing a bath"]
    },
    {
        text: "The kitten was <span class='target-word font-bold text-blue-600'>afraid</span> of the loud thunder and hid under the bed shaking.",
        type: "Inference",
        word: "afraid",
        hint: "When someone hides and shakes because of loud noises, what are they feeling?",
        choices: ["scared or frightened", "happy or joyful", "hungry or starving", "tired or sleepy"]
    },
    {
        text: "She felt <span class='target-word font-bold text-blue-600'>proud</span> when she won first place in the race and smiled as everyone clapped for her.",
        type: "Inference",
        word: "proud",
        hint: "How do you feel when you win something and people clap for you?",
        choices: ["feeling good about yourself", "feeling bad about yourself", "feeling sick", "feeling cold"]
    }
];
