import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ params }) {
    const { id } = params;

    const apiUrl = `${AI_BASE_URL}/api/v1/question-generations/history`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            const mockData = [
                                {
                                    "id": 1,
                                    "num_questions": 45,
                                    "question_type": "MCQ",
                                    "question_category": "Factual",
                                    "subject_name": "Science",
                                    "topic": "Nature,Environments,Basic Science",
                                    "keywords": "string",
                                    "created_on": "2025-05-14T10:33:17.415135"
                                }
                            ];
            const transformedData = mockData?.map(item => {return {...item, count: item.num_questions, subject:item.subject_name}})
         
            return json(transformedData, { status: 200 });
        }

        const data = await response.json();
        const transformedData = data?.map(item => {return {...item, count: item.num_questions, subject:item.subject_name}})
        return json(transformedData);
    } catch (error) {
        return json({ error: 'An error occurred while fetching the generation history' }, { status: 500 });
    }
}