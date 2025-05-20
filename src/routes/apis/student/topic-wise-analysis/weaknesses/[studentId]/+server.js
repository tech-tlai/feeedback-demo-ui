import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ url ,params}) {
   const {studentId} = params

    const apiUrl = `${AI_BASE_URL}/apis/v1/students/student_weakness_analysis/${studentId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
                type:'weakness',
                data:[
                    { id: 1, name: 'Subject - Verb Agreement', threshold:70, isNew: false, value: 60 },
                    { id: 2, name: 'Verbs', threshold:70, isNew: false, value: 30 },
                    { id: 3, name: 'Nouns', threshold:70, isNew: false, value: 50 },
                    { id: 4, name: 'Synonyms and Antonyms', threshold:70, isNew: false, value: 110 },
                    { id: 5, name: 'Punctuation', threshold:70, isNew: false, value: 10 },
                    { id: 6, name: 'Compound Words', threshold:70, isNew: true, value: 70 },
                    { id: 7, name: 'Creative Writing', threshold:70, isNew: true, value: 160 }
                ]
            }
            
            
            return json(mockData.data, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching score progress report data' }, { status: 500 });
    }
}

