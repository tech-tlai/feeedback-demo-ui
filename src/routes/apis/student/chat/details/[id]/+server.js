// SvelteKit endpoint for GET /apis/student/chat/details/[id]

import {studentChatDetails} from '$lib/data.js'

export async function GET({ params, url }) {
    const { id } = params;
    const chat = studentChatDetails[id];
    console.log('')
    if (chat) {
        return new Response(JSON.stringify(chat), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        // Fallback: get title from query param if present, else use generic
        const title = url.searchParams.get('title') || 'Untitled Query';
        return new Response(JSON.stringify({
            id,
            title,
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur.'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
