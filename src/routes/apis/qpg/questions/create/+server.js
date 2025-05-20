import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function POST({ request }) {
    // const body = await request.json();
    	const formData = await request.formData();

    const apiUrl = `${AI_BASE_URL}/api/v1/questions`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            // body: JSON.stringify(body),
            body: formData
        });
        console.log('response',response)

        if (!response.ok) {
            const mockData = {
              "message": "Question paper metadata saved",
              "id": 9,
              "data": [
                {
                  "question": "Which gas makes up the majority of Earth's atmosphere?",
                  "options": [
                    { "option": "A", "value": "Oxygen" },
                    { "option": "B", "value": "Carbon Dioxide" },
                    { "option": "C", "value": "Nitrogen" },
                    { "option": "D", "value": "Hydrogen" }
                  ],
                  "type": "MCQ",
                  "topic": "Elements of Earth",
                  "mark": 1,
                  "difficulty": "easy",
                  "correct_answer": { "option": "C", "value": "Nitrogen" }
                },
                {
                  "question": "Approximately what percentage of Earth's surface is covered by oceans?",
                  "options": [
                    { "option": "A", "value": "50%" },
                    { "option": "B", "value": "71%" },
                    { "option": "C", "value": "85%" },
                    { "option": "D", "value": "66%" }
                  ],
                  "type": "MCQ",
                  "topic": "Elements of Earth",
                  "mark": 1,
                  "difficulty": "easy",
                  "correct_answer": { "option": "B", "value": "71%" }
                },
                {
                  "question": "Which layer of Earth contains the highest concentration of iron?",
                  "options": [
                    { "option": "A", "value": "Crust" },
                    { "option": "B", "value": "Mantle" },
                    { "option": "C", "value": "Core" },
                    { "option": "D", "value": "Troposphere" }
                  ],
                  "type": "MCQ",
                  "topic": "Elements of Earth",
                  "mark": 1,
                  "difficulty": "medium",
                  "correct_answer": { "option": "C", "value": "Core" }
                },
                {
                  "question": "Which of the following is an unlimited natural energy source?",
                  "options": [
                    { "option": "A", "value": "Coal" },
                    { "option": "B", "value": "Natural Gas" },
                    { "option": "C", "value": "Solar Energy" },
                    { "option": "D", "value": "Oil" }
                  ],
                  "type": "MCQ",
                  "topic": "Elements of Earth",
                  "mark": 1,
                  "difficulty": "medium",
                  "correct_answer": { "option": "C", "value": "Solar Energy" }
                },
                {
                  "question": "Which of the following was NOT considered a classical element in ancient philosophies?",
                  "options": [
                    { "option": "A", "value": "Water" },
                    { "option": "B", "value": "Air" },
                    { "option": "C", "value": "Ether" },
                    { "option": "D", "value": "Metal" }
                  ],
                  "type": "MCQ",
                  "topic": "Elements of Earth",
                  "mark": 1,
                  "difficulty": "hard",
                  "correct_answer": { "option": "D", "value": "Metal" }
                }
              ]
            }
            
          
          

            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching score percentile trend data' }, { status: 500 });
    }
}

