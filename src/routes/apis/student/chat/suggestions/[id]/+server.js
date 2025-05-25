// SvelteKit endpoint for GET /apis/student/chat/suggestions/[id]

/**
 * Mock suggestion responses for demonstration.
 */
const suggestionResponses = {
    1: {
        id: 1,
        title: 'Subject specific insights',
        query: 'How did I perform in Mathematics?',
        response:  "Excellent work in Mathematics! You've maintained a strong average score of 82%. To elevate your performance further, focus on improving your understanding and application of Geometry concepts. Consistent practice in this area will solidify your strengths and address minor gaps."
    },
    2: {
        id: 2,
        title: 'Analyze weak areas',
        query: 'Where am I losing marks in Geography?',
        response: "In Geography, your primary challenges lie in map-based questions and crafting effective short answers. To boost your scores, dedicate more time to practicing map interpretation skills and refine your ability to articulate concise yet comprehensive responses. Targeted practice here will yield significant improvement.In Geography, your primary challenges lie in map-based questions and crafting effective short answers. To boost your scores, dedicate more time to practicing map interpretation skills and refine your ability to articulate concise yet comprehensive responses. Targeted practice here will yield significant improvement.In Geography, your primary challenges lie in map-based questions and crafting effective short answers. To boost your scores, dedicate more time to practicing map interpretation skills and refine your ability to articulate concise yet comprehensive responses. Targeted practice here will yield significant improvement.In Geography, your primary challenges lie in map-based questions and crafting effective short answers. To boost your scores, dedicate more time to practicing map interpretation skills and refine your ability to articulate concise yet comprehensive responses. Targeted practice here will yield significant improvement.In Geography, your primary challenges lie in map-based questions and crafting effective short answers. To boost your scores, dedicate more time to practicing map interpretation skills and refine your ability to articulate concise yet comprehensive responses. Targeted practice here will yield significant improvement."
    }
};

export async function GET({ params }) {
    const { id } = params;
    const suggestion = suggestionResponses[id];
    if (suggestion) {
        return new Response(JSON.stringify(suggestion), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ error: 'Suggestion not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
