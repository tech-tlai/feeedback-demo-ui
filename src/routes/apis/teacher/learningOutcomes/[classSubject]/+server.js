import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
    const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/learning-outcomes/${classSubject}`;

    try {
        const response = await fetch(apiUrl);
       

        if (!response.ok) {
            const mockData =  [
                { label: "Knowledge", value: 81 },
                { label: "Application", value: 48 },
                { label: "Understanding", value: 67 }
             ];
             
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching attendance sheet data' }, { status: 500 });
    }
}