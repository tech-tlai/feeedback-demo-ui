import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ params }) {
    const { id } = params;

    const apiUrl = `${AI_BASE_URL}/api/v1/questions/${id}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            const mockData = {
                    "id": 1,
                    "question_code": "Q3-1",
                    "type": "MCQ",
                    "topic": "Elements of Earth",
                    "question": "Which gas is most abundant in Earth's atmosphere?",
                    "options": [
                        {
                        "option": "A",
                        "value": "Oxygen"
                        },
                        {
                        "option": "B",
                        "value": "Carbon Dioxide"
                        },
                        {
                        "option": "C",
                        "value": "Nitrogen"
                        },
                        {
                        "option": "D",
                        "value": "Hydrogen"
                        }
                    ],
                    "correct_answer": {
                        "option": "C",
                        "value": "Nitrogen"
                    },
                    "mark": 1,
                    "tags": [
                        "Nature",
                        "Environments",
                        "Basic Science"
                    ],
                    "learning_outcome": [
                        "Understand the major constituents of air and the properties of each.",
                        "Understand the importance of oxygen production and role of trees."
                    ],
                    "bloom_level": "Knowledge",
                    "difficulty": "easy"
                    };

            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching the question data' }, { status: 500 });
    }
}

export async function PUT({ params, request }) {
    const { id } = params;
    const apiUrl = `${AI_BASE_URL}/api/v1/questions/${id}`;

    try {
        const body = await request.json();
        

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log('response of edit quesiton', response)
            // return json({ error: 'Failed to update question data' }, { status: response.status });
            return json(body, {status:200});
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.log('error in q edit', error.message)
        return json({ error: 'An error occurred while updating the question data' }, { status: 500 });
    }
}

