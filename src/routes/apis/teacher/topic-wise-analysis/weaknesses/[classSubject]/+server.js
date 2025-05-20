import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
        const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';

    const apiUrl = `${AI_BASE_URL}/apis/v1/teachers/teacher_weakness_analysis/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
                type:'strengths',
                data:[
                 	   { id: 1, name: 'Subject - Verb Agreement', category: 'major', isNew: false, value: 60 },
                       { id: 2, name: 'Verbs', category: 'major', isNew: false, value: 30 },
                       { id: 3, name: 'Nouns', category: 'major', isNew: false, value: 50 },
                       { id: 4, name: 'Synonyms and Antonyms', category: 'major', isNew: false, value: 110 },
                       { id: 5, name: 'Punctuation', category: 'major', isNew: false, value: 10 },
                       { id: 6, name: 'Compound Words', category: 'major', isNew: true, value: 70 },
                       { id: 7, name: 'Creative Writing', category: 'major', isNew: true, value: 160 }
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