export const inferenceCluesData = [
    {
        id: 'scenario-1',
        title: "Scenario 1: The Quiet Track Tryout",
        context: "Track Team • Early Spring • After School",
        text: "Maya joined track tryouts even though she had a stomach ache all day. During warm-ups she stayed quiet, avoided eye contact, and kept pressing her hand over her abdomen. Coach called her over twice and spoke softly. After the second talk, Maya sat on the bench and texted her mom.",
        clues: [
            "Coach whispered with Maya twice.",
            "Understand feelings without being told."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What is happening that Coach is responding to? Use actions for evidence.",
                placeholder: "Explain what Coach noticed and why Maya might need help."
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Maya be feeling? Which clues helped you decide? Body language can show emotions even when no one says it out loud.",
                placeholder: "How might Maya be feeling? Which clues helped you decide?"
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "State the problem and suggest one solution for Maya or Coach.",
                placeholder: "State the problem and suggest one solution for Maya or Coach."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Describe how Maya's stomach ache caused the change in the tryout.",
                placeholder: "Describe how Maya's stomach ache caused the change in the tryout."
            }
        ]
    },
    {
        id: 'scenario-2',
        title: "Scenario 2: The Group Chat Apology",
        context: "Friend Group • Evening • Online",
        text: "Tyler accidentally posted a joke in his friend group chat that was meant for his brother. The joke teased Avery's new haircut, and Avery left the chat for three hours. Tyler typed a long message, deleted it, and finally sent a shorter note: “I'm sorry. That was meant for my brother. I get it if you're mad.” Later, Tyler texted Avery directly asking to FaceTime, but Avery has not responded.",
        clues: [
            "Long typing pause before sending.",
            "Emotions can be mixed (nervous + hopeful)."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What do Tyler's actions tell you about what he understands about the situation?",
                placeholder: "What do Tyler's actions tell you about what he understands about the situation?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Tyler feel? How might Avery feel? Use clues to support your idea.",
                placeholder: "How might Tyler feel? How might Avery feel? Use clues to support your idea."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "State the problem and suggest one way Tyler can repair the situation.",
                placeholder: "State the problem and suggest one way Tyler can repair the situation."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the mistaken joke caused changes in the group chat.",
                placeholder: "Explain how the mistaken joke caused changes in the group chat."
            }
        ]
    },
    {
        id: 'scenario-3',
        title: "Scenario 3: Mentor Meeting Mix-Up",
        context: "Freshman Mentoring • Lunch Period • School Library",
        text: "Malik is supposed to meet his senior mentor, Jordan, every Wednesday at lunch for homework help. Jordan has missed the last two meetings without texting. Today Malik saved a table, set out both notebooks, and checked the door every few minutes. When Jordan finally arrived 20 minutes late, he said, “My bad. I can only stay five minutes today.” Malik quietly put his notebooks away.",
        clues: [
            "Malik keeps checking the door and clock.",
            "Relationship expectations and trust."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What expectation was not met? How can you tell Malik was still hopeful?",
                placeholder: "What expectation was not met? How can you tell Malik was still hopeful?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "What might Malik be feeling? Provide evidence from his actions.",
                placeholder: "What might Malik be feeling? Provide evidence from his actions."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "Identify the problem and suggest one way Malik or Jordan could fix it.",
                placeholder: "Identify the problem and suggest one way Malik or Jordan could fix it."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how Jordan being late caused Malik to react the way he did.",
                placeholder: "Explain how Jordan being late caused Malik to react the way he did."
            }
        ]
    },
    {
        id: 'scenario-4',
        title: "Scenario 4: Science Fair Morning Surprise",
        context: "Science Class • Early Morning • Presentation Day",
        text: "Andre spent two weeks building a volcano model with his lab partner, Theo. They stored it on a back table. When Andre arrived on presentation day, the project was in pieces. A substitute teacher put the volcano on a rolling cart and accidentally knocked off the wiring. Theo was running late, so Andre rushed to reattach the battery pack while classmates began presenting. Ms. Liang walked in and said, “Andre, you’re up next. Is everything okay?” Andre nodded, but his hands shook as he tightened the wires.",
        clues: [
            "Project was moved without warning.",
            "How do unexpected changes affect plans?"
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What unexpected change happened before Andre's turn? Which clues show it?",
                placeholder: "What unexpected change happened before Andre's turn? Which clues show it?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Andre feel as he fixes the volcano? Use evidence from his behavior.",
                placeholder: "How might Andre feel as he fixes the volcano? Use evidence from his behavior."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "Identify the problem and suggest one solution Andre or Ms. Liang could try.",
                placeholder: "Identify the problem and suggest one solution Andre or Ms. Liang could try."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the accident with the cart caused a new effect on Andre's presentation.",
                placeholder: "Explain how the accident with the cart caused a new effect on Andre's presentation."
            }
        ]
    },
    {
        id: 'scenario-5',
        title: "Scenario 5: Band Concert Surprise",
        context: "School Auditorium • Evening Performance",
        text: "The concert is starting in five minutes when Mr. Ellis tells Hannah, “The soloist is out with the flu. You're next in line, so you'll play the solo tonight.” Hannah's hands shake as she holds her clarinet. She takes three deep breaths, reviews the music quietly, and whispers, “Okay, I can do this.”",
        clues: [
            "Hannah is assigned a solo without warning.",
            "How surprise affects emotions and actions."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What unexpected change happened? Which details show it was sudden?",
                placeholder: "What unexpected change happened? Which details show it was sudden?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "What feelings might Hannah have? Use evidence from her actions.",
                placeholder: "What feelings might Hannah have? Use evidence from her actions."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "Describe the problem and one strategy Hannah uses or could use to handle it.",
                placeholder: "Describe the problem and one strategy Hannah uses or could use to handle it."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the original soloist being sick caused a new effect on Hannah and the concert.",
                placeholder: "Explain how the original soloist being sick caused a new effect on Hannah and the concert."
            }
        ]
    },
    {
        id: 'scenario-6',
        title: "Scenario 6: Community Service Shuffle",
        context: "Saturday Clean-Up • City Park • Afternoon",
        text: "Isaiah volunteered to lead the ninth-grade clean-up team at the park. Two volunteers texted that they were “running late,” and one person left early to get smoothies. Isaiah counted the rakes twice, scribbled checkmarks on his clipboard, and quietly started doing the trash pickup himself. When the late volunteers arrived, Isaiah said, “We needed you twenty minutes ago.”",
        clues: [
            "Isaiah keeps rechecking the supply list.",
            "Connect actions to hidden thoughts."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What responsibilities does Isaiah have? How do his actions show the situation?",
                placeholder: "What responsibilities does Isaiah have? How do his actions show the situation?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Isaiah feel? Use the clues in his words and actions.",
                placeholder: "How might Isaiah feel? Use the clues in his words and actions."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "What problem is happening? Suggest one solution Isaiah could try with the team.",
                placeholder: "What problem is happening? Suggest one solution Isaiah could try with the team."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the volunteers arriving late caused an effect on Isaiah and the clean-up.",
                placeholder: "Explain how the volunteers arriving late caused an effect on Isaiah and the clean-up."
            }
        ]
    },
    {
        id: 'scenario-7',
        title: "Scenario 7: After-School Bus Decision",
        context: "Transit Center • Weekday Evening • Rainy Weather",
        text: "Jada takes the city bus home and usually watches her younger brother after school. Today the bus app shows a 30-minute delay because of rain. Her brother texts, “Mom is stuck at work. Can you hurry?” Jada looks at the long rideshare line, then checks her wallet and sighs. She texts back, “Bus is slow. I can call neighbor Mrs. Ortiz—hold on.”",
        clues: [
            "Delay announcements and family texts.",
            "Compare options before deciding."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What situation is Jada trying to solve? What clues show her responsibilities?",
                placeholder: "What situation is Jada trying to solve? What clues show her responsibilities?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Jada be feeling? Use evidence from her actions and texts.",
                placeholder: "How might Jada be feeling? Use evidence from her actions and texts."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "State the problem and give one solution Jada is considering or could try.",
                placeholder: "State the problem and give one solution Jada is considering or could try."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the bus delay causes different effects on Jada and her brother.",
                placeholder: "Explain how the bus delay causes different effects on Jada and her brother."
            }
        ]
    },
    {
        id: 'scenario-8',
        title: "Scenario 8: History Skit Feedback",
        context: "History Class • Classroom Stage • Practice Day",
        text: "Aaliyah's group performs a short skit about a civil rights protest. When they finish, Mr. Ramos says, “Great teamwork. Next time, project your voice like the marchers did.” Aaliyah nods, steps to the side, and practices her lines in a louder voice. She circles “speak louder” on her script while the next group sets up.",
        clues: [
            "Feedback comes right after their skit.",
            "Listen for the main idea in comments."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What part of the skit did Mr. Ramos want them to change? How do you know?",
                placeholder: "What part of the skit did Mr. Ramos want them to change? How do you know?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "What might Aaliyah feel after hearing the feedback? Use clues from her reaction.",
                placeholder: "What might Aaliyah feel after hearing the feedback? Use clues from her reaction."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "Identify the performance problem and write one solution Aaliyah already started.",
                placeholder: "Identify the performance problem and write one solution Aaliyah already started."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the feedback caused Aaliyah's next steps.",
                placeholder: "Explain how the feedback caused Aaliyah's next steps."
            }
        ]
    },
    {
        id: 'scenario-9',
        title: "Scenario 9: Robotics Fix Under Pressure",
        context: "Robotics Club • Competition Practice • Evening",
        text: "The robotics team is running a practice round when the robot suddenly stops moving. Leo crouches down, swaps the battery, and whispers, “Please work.” The robot still doesn’t move. Sam suggests taking a five-minute break, but Leo keeps checking wires. Finally he says, “The motor cable is loose. I need tape.” The team cheers when the robot moves again.",
        clues: [
            "Battery swap and team chatter.",
            "Notice problem-solving steps."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What problem happened during practice? Which clues show Leo's role?",
                placeholder: "What problem happened during practice? Which clues show Leo's role?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Leo feel while fixing the robot? Use evidence from what he says and does.",
                placeholder: "How might Leo feel while fixing the robot? Use evidence from what he says and does."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "State the problem and explain the solution Leo found.",
                placeholder: "State the problem and explain the solution Leo found."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Describe how the loose motor cable caused the robot to stop and how Leo's fix changed the outcome.",
                placeholder: "Describe how the loose motor cable caused the robot to stop and how Leo's fix changed the outcome."
            }
        ]
    },
    {
        id: 'scenario-10',
        title: "Scenario 10: Family Dinner News",
        context: "Family Kitchen • Weeknight • After Practice",
        text: "Lila walks into the kitchen and sees her parents whispering. They invite her to sit and say, “We got a letter today. Our lease is ending, and the owner is selling the building.” Lila grips her backpack straps and asks, “Does that mean we have to move?” Her mom nods and says, “We have two months to find a new place. We’ll look for a neighborhood close to your school.”",
        clues: [
            "Parents whispering before dinner.",
            "Connect new information to future effects."
        ],
        questions: [
            {
                id: 'q1',
                label: 'Situational Inference',
                prompt: "What news did the family share? What clues showed it was serious before they spoke?",
                placeholder: "What news did the family share? What clues showed it was serious before they spoke?"
            },
            {
                id: 'q2',
                label: 'Feelings / Internal Response',
                prompt: "How might Lila feel about the news? Use evidence from her reaction.",
                placeholder: "How might Lila feel about the news? Use evidence from her reaction."
            },
            {
                id: 'q3',
                label: 'Problem / Solution',
                prompt: "State the problem and suggest one solution the family is planning.",
                placeholder: "State the problem and suggest one solution the family is planning."
            },
            {
                id: 'q4',
                label: 'Cause / Effect',
                prompt: "Explain how the landlord's decision causes changes for Lila and her family.",
                placeholder: "Explain how the landlord's decision causes changes for Lila and her family."
            }
        ]
    }
];
