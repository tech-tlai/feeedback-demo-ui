import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
    const {studentId} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${AI_BASE_URL}/apis/v1/students/student_weakness_analysis/${studentId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
                type:'strength',
                data:[{ id: 1, name: 'Basic Conversation', threshold:95, isNew: false, value: 235 },
                    { id: 2, name: 'Comprehension', threshold:95, isNew: false, value: 195 },
                    { id: 3, name: 'Homophones', threshold:95, isNew: false, value: 130 },
                    { id: 4, name: 'Prefixes and Suffixes', threshold:95, isNew: false, value: 50 },
                    { id: 5, name: 'Compound Words', threshold:95, isNew: false, value: 90 },
                    { id: 6, name: 'Letter Writing', threshold:95, isNew: true, value: 75 },]
            }
            
            
            return json(mockData.data, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching score progress report data' }, { status: 500 });
    }
}

