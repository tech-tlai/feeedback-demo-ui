import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
        const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${AI_BASE_URL}/apis/v1/teachers/teacher_strength_analysis/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
                type:'weaknesses', 
                data:[
                    { id: 1, name: 'Basic Conversation', category: 'major', isNew: false, value: 235 },
                    { id: 2, name: 'Comprehension', category: 'major', isNew: false, value: 195 },
                    { id: 3, name: 'Homophones', category: 'major', isNew: false, value: 130 },
                    { id: 4, name: 'Prefixes and Suffixes', category: 'major', isNew: false, value: 50 },
                    { id: 5, name: 'Compound Words', category: 'major', isNew: false, value: 90 },
                    { id: 6, name: 'Letter Writing', category: 'major', isNew: true, value: 75 },
                    { id: 7, name: 'Parts of speech', category: 'major', isNew: false, value: 100 }
                ]
            }
            return json(mockData.data, { status: 200 });
        }

        const data = await response.json();
        return json(data.data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching attendance sheet data' }, { status: 500 });
    }
}