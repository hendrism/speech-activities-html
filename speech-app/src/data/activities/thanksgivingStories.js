import StoryEngine from '../../components/activities/StoryEngine';

export const thanksgivingStoriesData = [
    {
        title: 'The Cranberry Spill',
        text: [
            'Lena carried a bowl of cranberries to the table.',
            'She tripped on the rug.',
            'The cranberries spilled onto the floor.',
            'Her brother helped her pick them up.',
            'They washed the berries and put them back in the bowl.'
        ],
        questions: [
            {
                q: 'What did Lena carry?',
                correct: 'a bowl of cranberries',
                wrong: ['a plate of cookies', 'a basket of apples', 'a tray of cups']
            },
            {
                q: 'What made her trip?',
                correct: 'the rug',
                wrong: ['a chair leg', 'a loose tile', 'a toy car']
            },
            {
                q: 'Where did the cranberries fall?',
                correct: 'onto the floor',
                wrong: ['onto the table', 'into the sink', 'into the trash']
            },
            {
                q: 'Who helped her?',
                correct: 'her brother',
                wrong: ['her sister', 'her mom', 'her neighbor']
            },
            {
                q: 'What did they do after picking up the berries?',
                correct: 'washed them and put them back in the bowl',
                wrong: ['threw them away', 'fed them to the dog', 'used them to make sauce']
            }
        ]
    },
    {
        title: 'The Big Parade',
        text: [
            'Sam sat on the couch to watch the Thanksgiving parade.',
            'His mom brought him a blanket.',
            'A giant turkey balloon floated across the screen.',
            'Sam pointed and laughed.',
            'His mom sat next to him and watched too.'
        ],
        questions: [
            {
                q: 'What did Sam watch?',
                correct: 'the Thanksgiving parade',
                wrong: ['a football game', 'a cooking show', 'a movie']
            },
            {
                q: 'What did his mom bring him?',
                correct: 'a blanket',
                wrong: ['hot cocoa', 'a pillow', 'a stuffed animal']
            },
            {
                q: 'What big balloon did Sam see?',
                correct: 'a giant turkey balloon',
                wrong: ['a big pumpkin balloon', 'a giant balloon dog', 'a huge balloon snowman']
            },
            {
                q: 'What did Sam do when he saw it?',
                correct: 'pointed and laughed',
                wrong: ['hid under the blanket', 'took a picture', 'called his friend']
            },
            {
                q: 'Who sat next to him?',
                correct: 'his mom',
                wrong: ['his sister', 'his dad', 'his grandma']
            }
        ]
    },
    {
        title: 'The Pie Decision',
        text: [
            'Jordan opened the fridge.',
            'He saw pumpkin pie and apple pie.',
            'He asked his sister which one he should choose.',
            'She told him to try the apple pie.',
            'Jordan cut a small slice.'
        ],
        questions: [
            {
                q: 'What did Jordan open?',
                correct: 'the fridge',
                wrong: ['the oven', 'a cupboard', 'the pantry door']
            },
            {
                q: 'What two pies did he see?',
                correct: 'pumpkin pie and apple pie',
                wrong: ['cherry pie and pecan pie', 'blueberry pie and peach pie', 'chocolate pie and lemon pie']
            },
            {
                q: 'Who did he ask for help?',
                correct: 'his sister',
                wrong: ['his dad', 'his friend', 'his teacher']
            },
            {
                q: 'Which pie did she suggest?',
                correct: 'the apple pie',
                wrong: ['the pumpkin pie', 'the cherry pie', 'the pecan pie']
            },
            {
                q: 'What did Jordan do at the end?',
                correct: 'cut a small slice',
                wrong: ['took both pies', 'closed the fridge without eating', 'burned the pie']
            }
        ]
    },
    {
        title: 'Setting the Table',
        text: [
            'Maya placed plates on the table.',
            'She added forks and spoons.',
            'She put a paper turkey in the middle.',
            'Her cousins brought napkins.',
            'Soon the table was ready.'
        ],
        questions: [
            {
                q: 'What did Maya put on the table first?',
                correct: 'plates',
                wrong: ['cups', 'napkins', 'glasses']
            },
            {
                q: 'What did she add next?',
                correct: 'forks and spoons',
                wrong: ['cups', 'chairs', 'candles']
            },
            {
                q: 'What did she place in the middle of the table?',
                correct: 'a paper turkey',
                wrong: ['a vase of flowers', 'a bowl of fruit', 'a candle']
            },
            {
                q: 'Who brought napkins?',
                correct: 'her cousins',
                wrong: ['her parents', 'her neighbor', 'her teacher']
            },
            {
                q: 'What was ready at the end?',
                correct: 'the table',
                wrong: ['the dessert', 'the living room', 'the dishwasher']
            }
        ]
    },
    {
        title: 'The Turkey Timer',
        text: [
            'Owen watched the oven clock.',
            'The turkey had five minutes left.',
            'His grandma told him not to open the door.',
            'Owen stood very still.',
            'When the timer beeped, he called her right away.'
        ],
        questions: [
            {
                q: 'What was Owen watching?',
                correct: 'the oven clock',
                wrong: ['the TV', 'the microwave', 'the window']
            },
            {
                q: 'How many minutes were left?',
                correct: 'five minutes',
                wrong: ['ten minutes', 'two minutes', 'fifteen minutes']
            },
            {
                q: 'Who told him not to open the door?',
                correct: 'his grandma',
                wrong: ['his mom', 'his dad', 'his sister']
            },
            {
                q: 'What did Owen do while he waited?',
                correct: 'stood very still',
                wrong: ['paced around the kitchen', 'played a game', 'took a nap']
            },
            {
                q: 'What happened when the timer beeped?',
                correct: 'he called her right away',
                wrong: ['he opened the oven', 'he turned off the oven', 'he walked outside']
            }
        ]
    },
    {
        title: 'The Pumpkin Patch',
        text: [
            'Rosa and her dad walked slowly through the pumpkin patch.',
            'She wanted a pumpkin that was small enough for her to carry but still round and bright.',
            'After checking several spots, she found one sitting near a wooden fence.',
            'Her dad picked it up to make sure it wasn\'t soft or damaged, then handed it back to her with a smile.',
            'They talked about turning it into pie later that evening.'
        ],
        questions: [
            {
                q: 'Who walked through the pumpkin patch with Rosa?',
                correct: 'her dad',
                wrong: ['her mom', 'her brother', 'her friend']
            },
            {
                q: 'What kind of pumpkin was she looking for?',
                correct: 'a small, round, bright pumpkin she could carry',
                wrong: ['a huge pumpkin for carving', 'a tall skinny pumpkin', 'a green unripe pumpkin']
            },
            {
                q: 'Where did she find the pumpkin she liked?',
                correct: 'near a wooden fence',
                wrong: ['beside the barn door', 'by the hay bales', 'next to the wagon']
            },
            {
                q: 'What did her dad check before giving it to her?',
                correct: 'that it wasn\'t soft or damaged',
                wrong: ['that it cost less', 'that it was the biggest', 'that it had a long stem']
            },
            {
                q: 'What did they plan to make with the pumpkin?',
                correct: 'pie',
                wrong: ['soup', 'a jack-o-lantern', 'pumpkin bread']
            }
        ]
    },
    {
        title: 'The Leftovers',
        text: [
            'After the Thanksgiving meal, Caleb opened several containers to see what was left.',
            'He chose a few slices of turkey and placed them neatly on his plate.',
            'He added mashed potatoes and a spoonful of stuffing because they were his favorites.',
            'Once everything was ready, he warmed the food in the microwave and watched the numbers count down.',
            'When he tasted the first bite, he felt glad to have another small holiday meal.'
        ],
        questions: [
            {
                q: 'What did Caleb open after the meal?',
                correct: 'several containers',
                wrong: ['the oven', 'a cookbook', 'a gift box']
            },
            {
                q: 'What did he put on his plate first?',
                correct: 'slices of turkey',
                wrong: ['mashed potatoes', 'stuffing', 'vegetables']
            },
            {
                q: 'What two sides did he add?',
                correct: 'mashed potatoes and stuffing',
                wrong: ['corn and salad', 'bread and soup', 'cranberry sauce and green beans']
            },
            {
                q: 'Where did he warm the food?',
                correct: 'in the microwave',
                wrong: ['on the stove', 'in the oven', 'on a grill']
            },
            {
                q: 'How did he feel when he took his first bite?',
                correct: 'glad to have another small holiday meal',
                wrong: ['disappointed it was cold', 'nervous about the taste', 'too full to eat']
            }
        ]
    },
    {
        title: 'The Fall Walk',
        text: [
            'After their Thanksgiving meal, Nora and her aunt went outside for a walk to enjoy the cool air.',
            'The ground was covered in colorful leaves, and some of them made a soft crunch under their shoes.',
            'Nora kicked a small pile just to see the leaves scatter in the air.',
            'Her aunt laughed and told her it reminded her of when she was a kid.',
            'They continued walking, talking about their favorite parts of the day.'
        ],
        questions: [
            {
                q: 'When did Nora and her aunt go for a walk?',
                correct: 'after their Thanksgiving meal',
                wrong: ['before breakfast', 'late at night', 'during a rainstorm']
            },
            {
                q: 'What covered the ground?',
                correct: 'colorful leaves',
                wrong: ['snow', 'mud puddles', 'pebbles']
            },
            {
                q: 'What did Nora do with the pile of leaves?',
                correct: 'kicked a small pile to scatter them',
                wrong: ['sat down in them', 'raked them neatly', 'put them in a bag']
            },
            {
                q: 'What did her aunt say it reminded her of?',
                correct: 'when she was a kid',
                wrong: ['a movie', 'last summer\'s trip', 'a song']
            },
            {
                q: 'What did they talk about as they walked?',
                correct: 'their favorite parts of the day',
                wrong: ['tomorrow\'s chores', 'news headlines', 'what to buy at the store']
            }
        ]
    },
    {
        title: 'The Grocery Run',
        text: [
            'Ty picked up the shopping list from the counter and read the items his mom still needed.',
            'She asked him to find a package of dinner rolls while she checked the produce section.',
            'Ty walked down the bread aisle and scanned the shelves until he spotted the rolls on the top shelf.',
            'He reached up, grabbed the package, and carried it back to the cart.',
            'His mom thanked him for helping and crossed the item off the list.'
        ],
        questions: [
            {
                q: 'What did Ty pick up from the counter?',
                correct: 'the shopping list',
                wrong: ['a receipt', 'his phone', 'a coupon']
            },
            {
                q: 'What did his mom tell him to find?',
                correct: 'a package of dinner rolls',
                wrong: ['a gallon of milk', 'a bag of apples', 'a box of cereal']
            },
            {
                q: 'Where did Ty look for the rolls?',
                correct: 'in the bread aisle',
                wrong: ['in the freezer section', 'by the deli counter', 'in the produce area']
            },
            {
                q: 'Where were the rolls located on the shelf?',
                correct: 'on the top shelf',
                wrong: ['on the bottom shelf', 'in the middle bin', 'behind the counter']
            },
            {
                q: 'What did his mom do after he brought them back?',
                correct: 'thanked him and crossed the item off the list',
                wrong: ['asked him to return them', 'put them back on the shelf', 'told him to find more milk']
            }
        ]
    }
];

export default {
    id: 'thanksgiving-stories',
    category: 'reading',
    title: 'Thanksgiving Stories',
    subtitle: 'Literal comprehension practice',
    component: StoryEngine,
    data: thanksgivingStoriesData,
    icon: 'BookOpen',
    color: 'bg-orange-600',
    config: {}
};
