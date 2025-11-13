import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './FigurativeLanguage.css';

const FigurativeLanguage = () => {
  const iconManager = useIconManager();
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const examples = [
    // Similes
    {
      id: 1,
      type: 'simile',
      sentence: 'Her smile was as bright as the sun.',
      figurativePhrase: 'as bright as the sun',
      meaning: 'Her smile was very happy and cheerful.',
      literalMeaning: 'Literally bright like the actual sun',
      figurativeMeaning: 'Very happy, warm, and cheerful',
      explanation: 'A simile compares two things using "like" or "as". This compares a smile to the sun.',
      scaffoldingQuestions: [
        { q: 'What is being described in this sentence?', hint: 'her smile' },
        { q: 'What is it being compared to?', hint: 'the sun' },
        { q: 'Is her smile actually as bright as the sun?', hint: 'no' },
        { q: 'What does this comparison tell us about her smile?', hint: 'it\'s very cheerful and happy' }
      ]
    },
    {
      id: 2,
      type: 'simile',
      sentence: 'He runs like the wind.',
      figurativePhrase: 'like the wind',
      meaning: 'He runs very fast.',
      literalMeaning: 'Running exactly like wind moves',
      figurativeMeaning: 'Running very quickly',
      explanation: 'This simile compares running speed to wind, which moves very fast.',
      scaffoldingQuestions: [
        { q: 'What is being described?', hint: 'how he runs' },
        { q: 'What is his running being compared to?', hint: 'the wind' },
        { q: 'Does he actually move like wind?', hint: 'no' },
        { q: 'What does comparing him to wind tell us?', hint: 'he runs very fast' }
      ]
    },
    {
      id: 3,
      type: 'simile',
      sentence: 'The baby was as quiet as a mouse.',
      figurativePhrase: 'as quiet as a mouse',
      meaning: 'The baby was very quiet and made no noise.',
      literalMeaning: 'Silent like an actual mouse',
      figurativeMeaning: 'Making very little or no sound',
      explanation: 'Mice move silently, so this simile means extremely quiet.',
      scaffoldingQuestions: [
        { q: 'What is being described?', hint: 'the baby' },
        { q: 'What is the baby compared to?', hint: 'a mouse' },
        { q: 'What word signals this is a simile?', hint: 'as' },
        { q: 'Why are mice a good comparison for quietness?', hint: 'they move silently' }
      ]
    },
    // Metaphors
    {
      id: 4,
      type: 'metaphor',
      sentence: 'Time is money.',
      figurativePhrase: 'Time is money',
      meaning: 'Time is valuable and shouldn\'t be wasted.',
      literalMeaning: 'Time is actual dollars and cents',
      figurativeMeaning: 'Time is valuable like money',
      explanation: 'A metaphor says one thing IS another thing. Time isn\'t actually money, but it\'s valuable like money.',
      scaffoldingQuestions: [
        { q: 'What two things are being compared?', hint: 'time and money' },
        { q: 'Is time actually money?', hint: 'no' },
        { q: 'What do time and money have in common?', hint: 'they are both valuable' },
        { q: 'What is the message about time?', hint: 'don\'t waste it' }
      ]
    },
    {
      id: 5,
      type: 'metaphor',
      sentence: 'Her voice was music to his ears.',
      figurativePhrase: 'Her voice was music',
      meaning: 'He loved hearing her voice; it sounded pleasant.',
      literalMeaning: 'Her voice is literally a song or instrument',
      figurativeMeaning: 'Her voice sounded beautiful and pleasant',
      explanation: 'This metaphor compares a voice to music without using "like" or "as".',
      scaffoldingQuestions: [
        { q: 'What is being called music?', hint: 'her voice' },
        { q: 'Is her voice actually music?', hint: 'no' },
        { q: 'How is a voice like music?', hint: 'it sounds beautiful and pleasant' },
        { q: 'How does he feel about her voice?', hint: 'he loves it' }
      ]
    },
    {
      id: 6,
      type: 'metaphor',
      sentence: 'The classroom was a zoo.',
      figurativePhrase: 'The classroom was a zoo',
      meaning: 'The classroom was loud, messy, and chaotic.',
      literalMeaning: 'The classroom is an actual zoo with animals',
      figurativeMeaning: 'The classroom is noisy and out of control',
      explanation: 'Comparing the classroom to a zoo means it was wild and disorganized.',
      scaffoldingQuestions: [
        { q: 'What is being called a zoo?', hint: 'the classroom' },
        { q: 'Is the classroom actually a zoo?', hint: 'no' },
        { q: 'What is a zoo like?', hint: 'loud, wild, and chaotic' },
        { q: 'What does this tell us about the classroom?', hint: 'it was noisy and out of control' }
      ]
    },
    // Idioms
    {
      id: 7,
      type: 'idiom',
      sentence: 'It\'s raining cats and dogs outside.',
      figurativePhrase: 'raining cats and dogs',
      meaning: 'It\'s raining very heavily.',
      literalMeaning: 'Cats and dogs are falling from the sky',
      figurativeMeaning: 'It\'s raining really hard',
      explanation: 'This idiom is a common expression that means heavy rain. It doesn\'t make literal sense.',
      scaffoldingQuestions: [
        { q: 'What is the phrase describing?', hint: 'the rain' },
        { q: 'Are cats and dogs really falling from the sky?', hint: 'no' },
        { q: 'What does this expression mean?', hint: 'it\'s raining very hard' },
        { q: 'Does this phrase make literal sense?', hint: 'no, it\'s an idiom' }
      ]
    },
    {
      id: 8,
      type: 'idiom',
      sentence: 'Break a leg at your performance tonight!',
      figurativePhrase: 'Break a leg',
      meaning: 'Good luck! Do well!',
      literalMeaning: 'Actually break your leg bone',
      figurativeMeaning: 'Good luck, perform well',
      explanation: 'This idiom is used to wish someone good luck, especially before a performance. It means the opposite of what it says!',
      scaffoldingQuestions: [
        { q: 'Does the speaker want them to actually break their leg?', hint: 'no' },
        { q: 'What is the speaker really saying?', hint: 'good luck' },
        { q: 'When do people use this expression?', hint: 'before a performance' },
        { q: 'Does this mean what it literally says?', hint: 'no, it means the opposite' }
      ]
    },
    {
      id: 9,
      type: 'idiom',
      sentence: 'That test was a piece of cake.',
      figurativePhrase: 'a piece of cake',
      meaning: 'The test was very easy.',
      literalMeaning: 'The test was actual cake you can eat',
      figurativeMeaning: 'Something very easy to do',
      explanation: 'This idiom means something is simple and easy, like eating cake.',
      scaffoldingQuestions: [
        { q: 'What is being described?', hint: 'the test' },
        { q: 'Was the test actually a piece of cake?', hint: 'no' },
        { q: 'What does "a piece of cake" mean?', hint: 'very easy' },
        { q: 'Was the test hard or easy?', hint: 'easy' }
      ]
    },
    // Hyperbole
    {
      id: 10,
      type: 'hyperbole',
      sentence: 'I\'m so hungry I could eat a horse!',
      figurativePhrase: 'could eat a horse',
      meaning: 'I\'m extremely hungry.',
      literalMeaning: 'Could actually eat an entire horse',
      figurativeMeaning: 'Very, very hungry',
      explanation: 'Hyperbole is extreme exaggeration. You wouldn\'t actually eat a horse - this just emphasizes how hungry you are.',
      scaffoldingQuestions: [
        { q: 'What is the speaker describing?', hint: 'how hungry they are' },
        { q: 'Could they really eat a whole horse?', hint: 'no' },
        { q: 'Is this an exaggeration?', hint: 'yes' },
        { q: 'What point are they trying to make?', hint: 'they are very hungry' }
      ]
    },
    {
      id: 11,
      type: 'hyperbole',
      sentence: 'I\'ve told you a million times!',
      figurativePhrase: 'a million times',
      meaning: 'I\'ve told you many, many times.',
      literalMeaning: 'Told you exactly 1,000,000 times',
      figurativeMeaning: 'Told you many times',
      explanation: 'Exaggerating to one million emphasizes that something has been repeated a lot.',
      scaffoldingQuestions: [
        { q: 'Has the speaker really told you 1,000,000 times?', hint: 'no' },
        { q: 'What is being exaggerated?', hint: 'the number of times' },
        { q: 'How does the speaker feel?', hint: 'frustrated from repeating' },
        { q: 'What is the real meaning?', hint: 'they\'ve told you many times' }
      ]
    },
    {
      id: 12,
      type: 'hyperbole',
      sentence: 'This backpack weighs a ton!',
      figurativePhrase: 'weighs a ton',
      meaning: 'The backpack is very heavy.',
      literalMeaning: 'Weighs exactly 2,000 pounds',
      figurativeMeaning: 'Very heavy',
      explanation: 'The backpack doesn\'t actually weigh a ton (2,000 lbs), but this exaggeration shows it feels very heavy.',
      scaffoldingQuestions: [
        { q: 'What is being described?', hint: 'the backpack' },
        { q: 'Does it really weigh 2,000 pounds?', hint: 'no' },
        { q: 'What is being exaggerated?', hint: 'the weight' },
        { q: 'What is the speaker really saying?', hint: 'the backpack is very heavy' }
      ]
    },
    // Personification
    {
      id: 13,
      type: 'personification',
      sentence: 'The wind whispered through the trees.',
      figurativePhrase: 'The wind whispered',
      meaning: 'The wind made soft, gentle sounds.',
      literalMeaning: 'Wind can actually whisper like a human',
      figurativeMeaning: 'Wind made soft, quiet sounds',
      explanation: 'Personification gives human qualities to non-human things. Wind can\'t actually whisper, but describing it this way helps us imagine the sound.',
      scaffoldingQuestions: [
        { q: 'What is doing the whispering?', hint: 'the wind' },
        { q: 'Can wind really whisper like a person?', hint: 'no' },
        { q: 'What human action is the wind given?', hint: 'whispering' },
        { q: 'What does this tell us about the wind?', hint: 'it made soft, gentle sounds' }
      ]
    },
    {
      id: 14,
      type: 'personification',
      sentence: 'The flowers danced in the breeze.',
      figurativePhrase: 'The flowers danced',
      meaning: 'The flowers moved gently in the wind.',
      literalMeaning: 'Flowers can actually dance',
      figurativeMeaning: 'Flowers swayed and moved gracefully',
      explanation: 'Flowers can\'t dance, but this makes the image more alive and beautiful.',
      scaffoldingQuestions: [
        { q: 'What is dancing?', hint: 'the flowers' },
        { q: 'Can flowers really dance?', hint: 'no' },
        { q: 'What human action are flowers given?', hint: 'dancing' },
        { q: 'How were the flowers moving?', hint: 'swaying gracefully in the wind' }
      ]
    },
    {
      id: 15,
      type: 'personification',
      sentence: 'The alarm clock screamed at me this morning.',
      figurativePhrase: 'alarm clock screamed',
      meaning: 'The alarm was very loud.',
      literalMeaning: 'The alarm clock can actually scream',
      figurativeMeaning: 'The alarm was loud and jarring',
      explanation: 'Alarm clocks can\'t scream, but this shows how loud and unpleasant the sound was.',
      scaffoldingQuestions: [
        { q: 'What is screaming?', hint: 'the alarm clock' },
        { q: 'Can alarm clocks really scream?', hint: 'no' },
        { q: 'What human action is the alarm given?', hint: 'screaming' },
        { q: 'What does this tell us about the alarm sound?', hint: 'it was very loud and unpleasant' }
      ]
    },
    // Additional Similes
    {
      id: 16,
      type: 'simile',
      sentence: 'She was as busy as a bee.',
      figurativePhrase: 'as busy as a bee',
      meaning: 'She was very busy and working hard.',
      literalMeaning: 'Working exactly like a bee',
      figurativeMeaning: 'Very busy and productive',
      explanation: 'Bees are always working, so this simile means someone is very active and productive.',
      scaffoldingQuestions: [
        { q: 'Who is being described?', hint: 'she' },
        { q: 'What is she being compared to?', hint: 'a bee' },
        { q: 'What are bees known for doing?', hint: 'working constantly' },
        { q: 'What does this tell us about her?', hint: 'she was very busy and active' }
      ]
    },
    {
      id: 17,
      type: 'simile',
      sentence: 'His hands were as cold as ice.',
      figurativePhrase: 'as cold as ice',
      meaning: 'His hands were extremely cold.',
      literalMeaning: 'Hands are frozen solid like ice',
      figurativeMeaning: 'Very, very cold',
      explanation: 'Ice is extremely cold, so this emphasizes how cold the hands felt.',
      scaffoldingQuestions: [
        { q: 'What is being described?', hint: 'his hands' },
        { q: 'What are they compared to?', hint: 'ice' },
        { q: 'What is ice like?', hint: 'very cold' },
        { q: 'How cold were his hands?', hint: 'extremely cold' }
      ]
    },
    // Additional Metaphors
    {
      id: 18,
      type: 'metaphor',
      sentence: 'My brother is a night owl.',
      figurativePhrase: 'is a night owl',
      meaning: 'My brother likes to stay up late at night.',
      literalMeaning: 'My brother is actually an owl',
      figurativeMeaning: 'He stays awake late at night',
      explanation: 'Owls are active at night, so calling someone a night owl means they prefer nighttime.',
      scaffoldingQuestions: [
        { q: 'What animal is he being called?', hint: 'an owl' },
        { q: 'Is he really an owl?', hint: 'no' },
        { q: 'When are owls active?', hint: 'at night' },
        { q: 'What does this tell us about my brother?', hint: 'he stays up late at night' }
      ]
    },
    {
      id: 19,
      type: 'metaphor',
      sentence: 'The world is my oyster.',
      figurativePhrase: 'The world is my oyster',
      meaning: 'I have many opportunities available to me.',
      literalMeaning: 'The world is literally a shellfish',
      figurativeMeaning: 'I have unlimited possibilities',
      explanation: 'Like finding a pearl in an oyster, this means you can find valuable opportunities in the world.',
      scaffoldingQuestions: [
        { q: 'Is the world actually an oyster?', hint: 'no' },
        { q: 'What can you find inside an oyster?', hint: 'a pearl, something valuable' },
        { q: 'What does this mean about the world?', hint: 'full of valuable opportunities' },
        { q: 'How does the speaker feel?', hint: 'optimistic and excited about possibilities' }
      ]
    },
    {
      id: 20,
      type: 'metaphor',
      sentence: 'She has a heart of gold.',
      figurativePhrase: 'heart of gold',
      meaning: 'She is very kind and generous.',
      literalMeaning: 'Her heart is made of actual gold',
      figurativeMeaning: 'She is extremely kind and caring',
      explanation: 'Gold is valuable and precious, so this metaphor means someone is very kind and good.',
      scaffoldingQuestions: [
        { q: 'Is her heart really made of gold?', hint: 'no' },
        { q: 'What is gold like?', hint: 'valuable and precious' },
        { q: 'What quality does she have?', hint: 'kindness' },
        { q: 'What kind of person is she?', hint: 'very kind and generous' }
      ]
    },
    // Additional Idioms
    {
      id: 21,
      type: 'idiom',
      sentence: 'Don\'t cry over spilled milk.',
      figurativePhrase: 'cry over spilled milk',
      meaning: 'Don\'t worry about things that already happened and can\'t be changed.',
      literalMeaning: 'Don\'t cry about actual milk on the floor',
      figurativeMeaning: 'Don\'t waste time on past mistakes',
      explanation: 'This idiom means you shouldn\'t be upset about mistakes that are already done.',
      scaffoldingQuestions: [
        { q: 'Is this about real spilled milk?', hint: 'no' },
        { q: 'What does spilled milk represent?', hint: 'things already done, mistakes' },
        { q: 'Can you un-spill milk?', hint: 'no' },
        { q: 'What is the advice?', hint: 'don\'t worry about things you can\'t change' }
      ]
    },
    {
      id: 22,
      type: 'idiom',
      sentence: 'He let the cat out of the bag.',
      figurativePhrase: 'let the cat out of the bag',
      meaning: 'He revealed a secret accidentally.',
      literalMeaning: 'Released an actual cat from a bag',
      figurativeMeaning: 'Told a secret by mistake',
      explanation: 'This idiom means someone accidentally revealed information that was supposed to be secret.',
      scaffoldingQuestions: [
        { q: 'Is there really a cat in a bag?', hint: 'no' },
        { q: 'What does "the cat" represent?', hint: 'a secret' },
        { q: 'Did he do it on purpose?', hint: 'no, accidentally' },
        { q: 'What did he do?', hint: 'revealed a secret' }
      ]
    },
    {
      id: 23,
      type: 'idiom',
      sentence: 'It\'s a blessing in disguise.',
      figurativePhrase: 'blessing in disguise',
      meaning: 'Something that seems bad but turns out to be good.',
      literalMeaning: 'A blessing wearing a costume',
      figurativeMeaning: 'Something good hidden in something that seems bad',
      explanation: 'This idiom describes when something unfortunate actually leads to something positive.',
      scaffoldingQuestions: [
        { q: 'Is a blessing really wearing a disguise?', hint: 'no' },
        { q: 'What does "in disguise" mean?', hint: 'hidden, not obvious at first' },
        { q: 'Does it seem good or bad at first?', hint: 'bad' },
        { q: 'What does it turn out to be?', hint: 'good, a blessing' }
      ]
    },
    // Additional Hyperbole
    {
      id: 24,
      type: 'hyperbole',
      sentence: 'I have a mountain of homework to do.',
      figurativePhrase: 'a mountain of homework',
      meaning: 'I have a lot of homework.',
      literalMeaning: 'Homework as big as an actual mountain',
      figurativeMeaning: 'A large amount of homework',
      explanation: 'Exaggerating homework to the size of a mountain emphasizes how much there is.',
      scaffoldingQuestions: [
        { q: 'Is the homework really as big as a mountain?', hint: 'no' },
        { q: 'How big is a mountain?', hint: 'very, very big' },
        { q: 'What is being exaggerated?', hint: 'the amount of homework' },
        { q: 'How much homework is there?', hint: 'a lot' }
      ]
    },
    {
      id: 25,
      type: 'hyperbole',
      sentence: 'I died laughing at that joke!',
      figurativePhrase: 'died laughing',
      meaning: 'The joke was extremely funny.',
      literalMeaning: 'Actually died from laughing',
      figurativeMeaning: 'Laughed very hard',
      explanation: 'Obviously you didn\'t really die - this exaggerates how funny something was.',
      scaffoldingQuestions: [
        { q: 'Did the person really die?', hint: 'no' },
        { q: 'What is being exaggerated?', hint: 'how much they laughed' },
        { q: 'Was the joke funny or not funny?', hint: 'very funny' },
        { q: 'What is the real meaning?', hint: 'they laughed really hard' }
      ]
    },
    {
      id: 26,
      type: 'hyperbole',
      sentence: 'My feet are killing me!',
      figurativePhrase: 'feet are killing me',
      meaning: 'My feet hurt a lot.',
      literalMeaning: 'My feet are actually causing my death',
      figurativeMeaning: 'My feet are very painful',
      explanation: 'This exaggeration emphasizes extreme foot pain without literal death.',
      scaffoldingQuestions: [
        { q: 'Are the feet really killing the person?', hint: 'no' },
        { q: 'What is being exaggerated?', hint: 'how much the feet hurt' },
        { q: 'How do their feet feel?', hint: 'very painful' },
        { q: 'Why use "killing"?', hint: 'to emphasize extreme pain' }
      ]
    },
    // Additional Personification
    {
      id: 27,
      type: 'personification',
      sentence: 'The sun smiled down on us.',
      figurativePhrase: 'sun smiled',
      meaning: 'It was a beautiful, warm sunny day.',
      literalMeaning: 'The sun has a face and can smile',
      figurativeMeaning: 'The sun was shining warmly and pleasantly',
      explanation: 'The sun can\'t smile, but this makes the weather feel friendly and welcoming.',
      scaffoldingQuestions: [
        { q: 'Can the sun really smile?', hint: 'no' },
        { q: 'What human action is the sun given?', hint: 'smiling' },
        { q: 'What is smiling usually associated with?', hint: 'happiness, warmth, friendliness' },
        { q: 'What was the weather like?', hint: 'warm and pleasant' }
      ]
    },
    {
      id: 28,
      type: 'personification',
      sentence: 'The car coughed and sputtered before starting.',
      figurativePhrase: 'car coughed and sputtered',
      meaning: 'The car had trouble starting and made rough sounds.',
      literalMeaning: 'The car can actually cough like a person',
      figurativeMeaning: 'The car made rough, struggling sounds',
      explanation: 'Cars can\'t cough, but this describes the rough sounds it made.',
      scaffoldingQuestions: [
        { q: 'Can a car really cough?', hint: 'no' },
        { q: 'What human action is the car given?', hint: 'coughing' },
        { q: 'What do these sounds suggest about the car?', hint: 'it was having trouble starting' },
        { q: 'How was the car running?', hint: 'roughly, not smoothly' }
      ]
    },
    {
      id: 29,
      type: 'personification',
      sentence: 'The camera loves her.',
      figurativePhrase: 'camera loves her',
      meaning: 'She looks great in photographs.',
      literalMeaning: 'The camera has feelings and loves her',
      figurativeMeaning: 'She photographs very well',
      explanation: 'Cameras can\'t love, but this means she looks especially good in pictures.',
      scaffoldingQuestions: [
        { q: 'Can a camera really love someone?', hint: 'no' },
        { q: 'What human emotion is the camera given?', hint: 'love' },
        { q: 'What does this suggest about her photos?', hint: 'she looks great in them' },
        { q: 'Is she photogenic?', hint: 'yes' }
      ]
    },
    {
      id: 30,
      type: 'personification',
      sentence: 'Time flies when you\'re having fun.',
      figurativePhrase: 'time flies',
      meaning: 'Time seems to pass quickly when you\'re enjoying yourself.',
      literalMeaning: 'Time can actually fly through the air',
      figurativeMeaning: 'Time seems to pass quickly',
      explanation: 'Time can\'t fly, but this describes how quickly it seems to pass during fun activities.',
      scaffoldingQuestions: [
        { q: 'Can time really fly?', hint: 'no' },
        { q: 'What human action is time given?', hint: 'flying' },
        { q: 'When does time seem to fly?', hint: 'when you\'re having fun' },
        { q: 'What does this mean?', hint: 'time seems to pass quickly when you enjoy yourself' }
      ]
    }
  ];

  const figurativeTypes = [
    { id: 'all', name: 'All Types', icon: '📚', color: '#8b5cf6' },
    { id: 'simile', name: 'Simile', icon: '🔗', color: '#3b82f6' },
    { id: 'metaphor', name: 'Metaphor', icon: '🎭', color: '#10b981' },
    { id: 'idiom', name: 'Idiom', icon: '💬', color: '#f59e0b' },
    { id: 'hyperbole', name: 'Hyperbole', icon: '📢', color: '#ef4444' },
    { id: 'personification', name: 'Personification', icon: '👤', color: '#ec4899' }
  ];

  const [selectedTypes, setSelectedTypes] = useState(['all']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [completedExamples, setCompletedExamples] = useState([]);
  const [showScaffolding, setShowScaffolding] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const [shuffledExamples, setShuffledExamples] = useState([]);

  const getFilteredExamples = () => {
    if (selectedTypes.includes('all')) {
      return examples;
    }
    return examples.filter(ex => selectedTypes.includes(ex.type));
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const filteredExamples = shuffledExamples.length > 0 ? shuffledExamples : getFilteredExamples();

  const currentExample = filteredExamples[currentIndex];

  const handleNext = () => {
    if (!completedExamples.includes(currentExample.id)) {
      setCompletedExamples([...completedExamples, currentExample.id]);
    }
    if (currentIndex < filteredExamples.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowMeaning(false);
      setShowComparison(false);
      setShowScaffolding(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowMeaning(false);
      setShowComparison(false);
      setShowScaffolding(false);
    }
  };

  const handleTypeToggle = (type) => {
    if (type === 'all') {
      setSelectedTypes(['all']);
    } else {
      setSelectedTypes(prev => {
        const withoutAll = prev.filter(t => t !== 'all');
        if (withoutAll.includes(type)) {
          const newTypes = withoutAll.filter(t => t !== type);
          return newTypes.length === 0 ? ['all'] : newTypes;
        } else {
          return [...withoutAll, type];
        }
      });
    }
    setCurrentIndex(0);
    setShowMeaning(false);
    setShowComparison(false);
    setShowScaffolding(false);
    setShuffledExamples([]);
  };

  const handleStartPractice = () => {
    const filtered = getFilteredExamples();
    const shuffled = shuffleArray(filtered);
    setShuffledExamples(shuffled);
    setCurrentIndex(0);
    setShowMeaning(false);
    setShowComparison(false);
    setShowScaffolding(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowMeaning(false);
    setShowComparison(false);
    setCompletedExamples([]);
    setShowScaffolding(false);
    setStudentAnswers({});
    setShuffledExamples([]);
    setSelectedTypes(['all']);
  };

  const handleAnswerChange = (exampleId, questionIndex, value) => {
    setStudentAnswers(prev => ({
      ...prev,
      [`${exampleId}-${questionIndex}`]: value
    }));
  };

  const getTypeColor = () => {
    const typeInfo = figurativeTypes.find(t => t.id === currentExample.type);
    return typeInfo ? typeInfo.color : '#8b5cf6';
  };

  if (showIntro) {
    return (
      <div className="figurative-language">
        <div className="activity-header">
          <div className="header-content">
            <h1>📚 Figurative Language - Introduction</h1>
          </div>
        </div>

        <div className="main-content">
          <div className="intro-container">
            <h2>Welcome! Let's Learn About Figurative Language</h2>
            <p className="intro-text">
              Figurative language helps us express ideas in creative and interesting ways.
              Instead of saying exactly what we mean (literal), we use comparisons, exaggerations,
              and colorful descriptions (figurative) to paint a picture with words!
            </p>

            <h3>The 5 Types We'll Practice:</h3>

            <div className="type-intro-grid">
              <div className="type-intro-card" style={{ borderColor: '#3b82f6' }}>
                <div className="type-intro-header" style={{ backgroundColor: '#3b82f6' }}>
                  <span className="type-icon">🔗</span>
                  <h4>Simile</h4>
                </div>
                <p className="type-definition">
                  <strong>What it is:</strong> Compares two things using "like" or "as"
                </p>
                <p className="type-example">
                  <strong>Example:</strong> "She's as brave as a lion."
                </p>
                <div className="type-process">
                  <strong>How we'll figure it out:</strong>
                  <ul>
                    <li>Find what's being compared</li>
                    <li>Look for "like" or "as"</li>
                    <li>Ask: Is this literally true?</li>
                    <li>Determine the real meaning</li>
                  </ul>
                </div>
              </div>

              <div className="type-intro-card" style={{ borderColor: '#10b981' }}>
                <div className="type-intro-header" style={{ backgroundColor: '#10b981' }}>
                  <span className="type-icon">🎭</span>
                  <h4>Metaphor</h4>
                </div>
                <p className="type-definition">
                  <strong>What it is:</strong> Says one thing IS another (no "like" or "as")
                </p>
                <p className="type-example">
                  <strong>Example:</strong> "He is a shining star."
                </p>
                <div className="type-process">
                  <strong>How we'll figure it out:</strong>
                  <ul>
                    <li>Identify what's being called something else</li>
                    <li>Ask: Is this literally true?</li>
                    <li>Think about what they have in common</li>
                    <li>Understand the comparison</li>
                  </ul>
                </div>
              </div>

              <div className="type-intro-card" style={{ borderColor: '#f59e0b' }}>
                <div className="type-intro-header" style={{ backgroundColor: '#f59e0b' }}>
                  <span className="type-icon">💬</span>
                  <h4>Idiom</h4>
                </div>
                <p className="type-definition">
                  <strong>What it is:</strong> Common expression with a special meaning
                </p>
                <p className="type-example">
                  <strong>Example:</strong> "It costs an arm and a leg."
                </p>
                <div className="type-process">
                  <strong>How we'll figure it out:</strong>
                  <ul>
                    <li>Read the whole phrase</li>
                    <li>Ask: Does it make sense literally?</li>
                    <li>Think about what people mean when they say it</li>
                    <li>Learn the special meaning</li>
                  </ul>
                </div>
              </div>

              <div className="type-intro-card" style={{ borderColor: '#ef4444' }}>
                <div className="type-intro-header" style={{ backgroundColor: '#ef4444' }}>
                  <span className="type-icon">📢</span>
                  <h4>Hyperbole</h4>
                </div>
                <p className="type-definition">
                  <strong>What it is:</strong> Extreme exaggeration for effect
                </p>
                <p className="type-example">
                  <strong>Example:</strong> "I'm so tired I could sleep for a year!"
                </p>
                <div className="type-process">
                  <strong>How we'll figure it out:</strong>
                  <ul>
                    <li>Find the exaggeration</li>
                    <li>Ask: Could this really happen?</li>
                    <li>Figure out what's being emphasized</li>
                    <li>Understand the true meaning</li>
                  </ul>
                </div>
              </div>

              <div className="type-intro-card" style={{ borderColor: '#ec4899' }}>
                <div className="type-intro-header" style={{ backgroundColor: '#ec4899' }}>
                  <span className="type-icon">👤</span>
                  <h4>Personification</h4>
                </div>
                <p className="type-definition">
                  <strong>What it is:</strong> Gives human qualities to non-human things
                </p>
                <p className="type-example">
                  <strong>Example:</strong> "The stars winked at us."
                </p>
                <div className="type-process">
                  <strong>How we'll figure it out:</strong>
                  <ul>
                    <li>Find what non-human thing is acting human</li>
                    <li>Ask: Can this really do that action?</li>
                    <li>Think about what human quality it's given</li>
                    <li>Understand the image created</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="intro-practice-info">
              <h3>How We'll Practice:</h3>
              <div className="practice-steps">
                <div className="practice-step">
                  <span className="step-number">1</span>
                  <p>Read the sentence with figurative language</p>
                </div>
                <div className="practice-step">
                  <span className="step-number">2</span>
                  <p>Use guided questions to break it down</p>
                </div>
                <div className="practice-step">
                  <span className="step-number">3</span>
                  <p>Compare literal vs. figurative meanings</p>
                </div>
                <div className="practice-step">
                  <span className="step-number">4</span>
                  <p>Learn what the phrase really means!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="start-practice-btn"
            >
              Start Practicing! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="figurative-language">
      <div className="activity-header no-print">
        <div className="header-content">
          <h1>📚 Figurative Language</h1>
          <div className="header-controls">
            <button onClick={() => setShowIntro(true)} className="control-btn">
              ℹ️ Intro
            </button>
            <button onClick={handleReset} className="control-btn">
              🔄 Reset
            </button>
            <button onClick={() => window.print()} className="control-btn">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>

      {iconPanelOpen && (
        <IconManager
          iconManager={iconManager}
          onClose={() => setIconPanelOpen(false)}
        />
      )}

      <div className="main-content">
        <div className="type-selector no-print">
          <h2>Choose Figurative Language Types (select one or more):</h2>
          <div className="type-checkboxes">
            {figurativeTypes.map(type => (
              <label
                key={type.id}
                className={`type-checkbox-label ${selectedTypes.includes(type.id) ? 'selected' : ''}`}
                style={selectedTypes.includes(type.id) ? { borderColor: type.color, backgroundColor: type.color + '15' } : {}}
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  style={{ accentColor: type.color }}
                />
                <span className="type-icon">{type.icon}</span>
                <span className="type-name">{type.name}</span>
              </label>
            ))}
          </div>
          <div className="start-button-container">
            <button onClick={handleStartPractice} className="start-practice-button">
              🎲 Randomize & Start Practice ({getFilteredExamples().length} examples)
            </button>
          </div>
        </div>

        <div className="progress-info no-print">
          <p>Example {currentIndex + 1} of {filteredExamples.length} | Completed: {completedExamples.length}/{examples.length}</p>
        </div>

        <div className="example-card">
          <div className="example-header">
            <span className="type-badge" style={{ backgroundColor: getTypeColor() + '20', color: getTypeColor(), borderColor: getTypeColor() }}>
              {currentExample.type}
            </span>
            <h2>Example {currentIndex + 1}</h2>
          </div>

          <div className="sentence-box">
            <p className="main-sentence">{currentExample.sentence}</p>
            <p className="figurative-highlight">
              <strong>Figurative phrase:</strong> "{currentExample.figurativePhrase}"
            </p>
          </div>

          <div className="support-buttons no-print">
            <button
              onClick={() => setShowScaffolding(!showScaffolding)}
              className="support-btn primary-support"
              style={{ backgroundColor: getTypeColor(), borderColor: getTypeColor(), color: 'white' }}
            >
              {showScaffolding ? '🔼 Hide' : '💡 Show'} Guided Questions
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="support-btn"
              style={{ borderColor: getTypeColor(), color: getTypeColor() }}
            >
              {showComparison ? '🔼 Hide' : '🔽 Show'} Literal vs. Figurative
            </button>
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className="support-btn"
              style={{ borderColor: getTypeColor(), color: getTypeColor() }}
            >
              {showMeaning ? '🔼 Hide' : '🔽 Show'} Meaning
            </button>
          </div>

          {showScaffolding && currentExample.scaffoldingQuestions && (
            <div className="scaffolding-box" style={{ borderColor: getTypeColor() }}>
              <h3>💡 Let's Figure It Out Together!</h3>
              <p className="scaffolding-intro">Answer these questions to understand the figurative language:</p>
              <div className="scaffolding-questions">
                {currentExample.scaffoldingQuestions.map((q, index) => (
                  <div key={index} className="scaffolding-question">
                    <label>{index + 1}. {q.q}</label>
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      value={studentAnswers[`${currentExample.id}-${index}`] || ''}
                      onChange={(e) => handleAnswerChange(currentExample.id, index, e.target.value)}
                      className="answer-input"
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector(`input[value="${studentAnswers[`${currentExample.id}-${index}`] || ''}"]`);
                        if (input) input.placeholder = `Hint: ${q.hint}`;
                        setTimeout(() => {
                          if (input) input.placeholder = 'Type your answer here...';
                        }, 3000);
                      }}
                      className="hint-btn"
                      style={{ color: getTypeColor() }}
                    >
                      💡 Hint
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showMeaning && (
            <div className="meaning-box" style={{ borderColor: getTypeColor() }}>
              <h3>What does this mean?</h3>
              <p className="meaning-text">{currentExample.meaning}</p>
              <div className="explanation">
                <strong>Explanation:</strong>
                <p>{currentExample.explanation}</p>
              </div>
            </div>
          )}

          {showComparison && (
            <div className="comparison-box">
              <div className="comparison-column literal">
                <h3>❌ Literal Meaning</h3>
                <p>{currentExample.literalMeaning}</p>
                <span className="label">This would be silly or impossible!</span>
              </div>
              <div className="comparison-divider">vs.</div>
              <div className="comparison-column figurative">
                <h3>✓ Figurative Meaning</h3>
                <p>{currentExample.figurativeMeaning}</p>
                <span className="label">This is what we really mean!</span>
              </div>
            </div>
          )}

          <div className="navigation-buttons no-print">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredExamples.length - 1}
              className="nav-btn primary"
              style={{ backgroundColor: getTypeColor(), borderColor: getTypeColor() }}
            >
              Next Example →
            </button>
          </div>
        </div>

        <div className="reference-guide">
          <h3>Figurative Language Quick Reference:</h3>
          <div className="reference-grid">
            <div className="reference-card" style={{ borderColor: '#3b82f6' }}>
              <strong>🔗 Simile</strong>
              <p>Compares two things using "like" or "as"</p>
              <p className="example">Example: She's as brave as a lion.</p>
            </div>
            <div className="reference-card" style={{ borderColor: '#10b981' }}>
              <strong>🎭 Metaphor</strong>
              <p>Says one thing IS another thing (no "like" or "as")</p>
              <p className="example">Example: He is a shining star.</p>
            </div>
            <div className="reference-card" style={{ borderColor: '#f59e0b' }}>
              <strong>💬 Idiom</strong>
              <p>Common expression with a non-literal meaning</p>
              <p className="example">Example: It costs an arm and a leg.</p>
            </div>
            <div className="reference-card" style={{ borderColor: '#ef4444' }}>
              <strong>📢 Hyperbole</strong>
              <p>Extreme exaggeration for effect</p>
              <p className="example">Example: I'm so tired I could sleep for a year!</p>
            </div>
            <div className="reference-card" style={{ borderColor: '#ec4899' }}>
              <strong>👤 Personification</strong>
              <p>Gives human qualities to non-human things</p>
              <p className="example">Example: The stars winked at us.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigurativeLanguage;
