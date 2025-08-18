// SvelteKit endpoint for answer sheet upload
export async function POST({ request }) {
    const formData = await request.formData();
    const files = formData.getAll('files');
    // Here you would process/save files as needed
    // For now, just return a success response
    return new Response(JSON.stringify({ success: true, fileCount: files.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}