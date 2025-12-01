import ConversationEngine from '../../components/activities/ConversationEngine';

export const thanksgivingFluencyData = [
    {
        id: "gratitude",
        title: "Thankful Round",
        text: "Share what you are thankful for this year. Take turns adding more than one thing so the talk keeps going.",
        chips: ["positive topic", "personal sharing", "expansion"],
        followUps: [
            "What changed from last year?",
            "Who helped you the most?",
            "How did you show thanks?"
        ]
    },
    {
        id: "leftovers",
        title: "Leftovers Plan",
        text: "Plan how to use Thanksgiving leftovers. Compare ideas like sandwiches, soups, or sharing with neighbors.",
        chips: ["planning", "compare ideas", "sequence steps"],
        followUps: [
            "Which idea is fastest to make?",
            "What ingredients do you need?",
            "Who will enjoy each idea the most?"
        ]
    },
    {
        id: "parade",
        title: "Parade or Football?",
        text: "Decide what to watch first: the parade or the football game. Explain reasons and make a schedule.",
        chips: ["persuade", "time order", "reasons"],
        followUps: [
            "What time does each start?",
            "Who wants to watch each one?",
            "Can you split the time fairly?"
        ]
    },
    {
        id: "travel",
        title: "Travel Tales",
        text: "Talk about a past Thanksgiving travel story. Describe what went smoothly and what was tricky.",
        chips: ["narrative", "problem/solution", "details"],
        followUps: [
            "What would you change next time?",
            "Who helped solve the problem?",
            "What was the best part of the trip?"
        ]
    },
    {
        id: "traditions",
        title: "Favorite Tradition",
        text: "Describe a family tradition and why it matters. Invite the other person to share theirs and compare.",
        chips: ["describe", "compare", "feelings"],
        followUps: [
            "How did the tradition start?",
            "What makes it special?",
            "Would you change or add anything?"
        ]
    },
    {
        id: "helping",
        title: "Helping Out",
        text: "Plan how to help before or after the meal. Divide tasks like setting the table, dishes, or packing leftovers.",
        chips: ["plan", "roles", "sequence"],
        followUps: [
            "Which tasks match each person’s strengths?",
            "What needs to happen first?",
            "How will you know the job is done well?"
        ]
    },
    {
        id: "cooking",
        title: "Recipe Swap",
        text: "Talk about a favorite Thanksgiving recipe. Explain steps and ask for tips to make it better.",
        chips: ["explain steps", "ask/answer", "details"],
        followUps: [
            "Which step is most important?",
            "How do you know it is done?",
            "What can go wrong and how do you fix it?"
        ]
    },
    {
        id: "gratitude-cards",
        title: "Gratitude Cards",
        text: "Plan to make gratitude cards for guests or community helpers. Decide what to write and how to deliver them.",
        chips: ["plan", "kindness", "specific details"],
        followUps: [
            "Who should get a card and why?",
            "What message will you include?",
            "How will you deliver them?"
        ]
    },
    {
        id: "new-guest",
        title: "Welcoming a New Guest",
        text: "A friend is joining Thanksgiving for the first time. Plan how to make them feel included.",
        chips: ["empathy", "problem-prevention", "ideas"],
        followUps: [
            "What info should you share ahead of time?",
            "What activities can include everyone?",
            "How will you check in during the meal?"
        ]
    },
    {
        id: "conflict",
        title: "Small Conflict, Quick Repair",
        text: "Two people want the last slice of pie. Talk through a fair solution without arguing.",
        chips: ["problem solving", "fairness", "calm voice"],
        followUps: [
            "What options are fair?",
            "How can both people feel heard?",
            "What words can you use to stay calm?"
        ]
    }
];

export default {
    id: 'thanksgiving-fluency',
    title: 'Thanksgiving Conversation',
    subtitle: 'Fluency and Articulation practice',
    component: ConversationEngine,
    data: thanksgivingFluencyData,
    icon: 'MessageCircle',
    color: 'bg-amber-600',
    config: {}
};
