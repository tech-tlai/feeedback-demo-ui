// SvelteKit POST endpoint for /apis/student/chats
import { studentChatDetails } from '$lib/data.js';

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
        // Find the next id based on studentChatDetails
        const ids = Object.keys(studentChatDetails).map(Number);
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        const details = `This is a mock AI response for: ${title} -- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur.`;
        // Append to studentChatDetails (in-memory, will not persist after restart)
        studentChatDetails[nextId] = { id: nextId, title, details };
        return new Response(
            JSON.stringify({ id: nextId, title, response: details }),
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

/**
 * GET handler to return all chats.
 * Returns [{ uuid, text }].
 */
export async function GET() {
    // Return all chats in the required format
    const chats = Object.values(studentChatDetails).map(chat => ({
        uuid: chat.id,
        text: chat.title
    }));
    return new Response(JSON.stringify(chats), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

