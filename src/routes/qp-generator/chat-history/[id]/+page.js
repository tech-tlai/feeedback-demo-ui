export async function load({ params, fetch }) {
    const { id } = params;
 console.log('LOADING:', params.id);
    const res = await fetch(`/apis/qpg/questions/history/${id}`);
    if (!res.ok) {
        return {
            status: res.status,
            error: new Error('Failed to fetch question history')
        };
    }
    const data = await res.json();
    return {
        history: data
        
    };
}