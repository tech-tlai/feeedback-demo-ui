// SvelteKit POST endpoint for /apis/student/chats

/**
 * Mock chat POST handler for demonstration.
 * Expects { title: string } in the request body.
 * Returns { id, title, response }.
 */
export async function POST({ request }) {
    try {
        const { title } = await request.json();
        if (!title) {
            return new Response(JSON.stringify({ error: 'Title is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        // Mock response
        const id = Math.floor(Math.random() * 10000) + 100;
        const response = `This is a mock AI response for: ${title}`;
        return new Response(
            JSON.stringify({ id, title, response }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
