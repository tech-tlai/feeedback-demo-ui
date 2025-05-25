// SvelteKit endpoint for GET /apis/student/chat/details/[id]

/**
 * Mock chat details data for demonstration.
 */
const chatDetails = {
    1: { id: 1, title: 'How did I perform in previous 4 English tests?', details: 'You scored 85, 88, 90, and 87 in your last 4 English tests.' },
    2: { id: 2, title: 'Analyse my weaknesses in Hindi grammar.', details: 'Common mistakes: verb conjugation, gender agreement.' },
    3: { id: 3, title: 'Overall performance in Mathematics tests', details: 'Average score: 78%. Strength: Algebra. Weakness: Geometry.' },
    4: { id: 4, title: 'What feedback do you have on my problem..', details: 'Try to show your work step by step for better feedback.' },
    5: { id: 5, title: 'How did I perform in previous 4 English tests?', details: 'Repeated query. See above.' }
};

export async function GET({ params }) {
    const { id } = params;

    const chat = chatDetails[id];
    if (chat) {
        return new Response(JSON.stringify(chat), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ error: 'Chat not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
