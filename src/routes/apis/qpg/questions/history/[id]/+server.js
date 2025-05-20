import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';
let mockData = [
  {
    "id": 3,
    "question_code": "Q1-3",
    "question_type": "MCQ",
    "topic": "Nature,Environments,Basic Science",
    "question": "Which layer of the Earth contains the most iron?",
    "options": [
      {
        "option": "A",
        "value": "Crust"
      },
      {
        "option": "B",
        "value": "Mantle"
      },
      {
        "option": "C",
        "value": "Core"
      },
      {
        "option": "D",
        "value": "Troposphere"
      }
    ],
    "correct_answer": {
      "option": "C",
      "value": "Core"
    },
    "mark": 1,
    "tags": [
      "Nature",
      "Environments",
      "Basic Science"
    ],
    "learning_outcome": [
      "Understand Earth's internal structure and the composition of its layers."
    ],
    "bloom_level": "Understanding",
    "difficulty": "medium"
  },
  {
    "id": 4,
    "question_code": "Q1-4",
    "question_type": "MCQ",
    "topic": "Nature,Environments,Basic Science",
    "question": "Which of these is a renewable natural element found on Earth?",
    "options": [
      {
        "option": "A",
        "value": "Coal"
      },
      {
        "option": "B",
        "value": "Natural Gas"
      },
      {
        "option": "C",
        "value": "Solar Energy"
      },
      {
        "option": "D",
        "value": "Oil"
      }
    ],
    "correct_answer": {
      "option": "C",
      "value": "Solar Energy"
    },
    "mark": 1,
    "tags": [
      "Nature",
      "Environments",
      "Basic Science"
    ],
    "learning_outcome": [
      "Identify and differentiate between renewable and non-renewable natural resources."
    ],
    "bloom_level": "Understanding",
    "difficulty": "medium"
  },
  {
    "id": 5,
    "question_code": "Q1-5",
    "question_type": "MCQ",
    "topic": "Nature,Environments,Basic Science",
    "question": "Which of the following is NOT one of the classical elements in ancient philosophy?",
    "options": [
      {
        "option": "A",
        "value": "Water"
      },
      {
        "option": "B",
        "value": "Air"
      },
      {
        "option": "C",
        "value": "Ether"
      },
      {
        "option": "D",
        "value": "Metal"
      }
    ],
    "correct_answer": {
      "option": "D",
      "value": "Metal"
    },
    "mark": 1,
    "tags": [
      "Nature",
      "Environments",
      "Basic Science"
    ],
    "learning_outcome": [
      "Analyze traditional and historical concepts of the natural world and identify outdated classifications."
    ],
    "bloom_level": "Application",
    "difficulty": "hard"
  },
  {
    "id": 2,
    "question_code": "Q1-2",
    "question_type": "MCQ",
    "topic": "Nature,Environments,Basic Science",
    "question": "What percentage of the Earth's surface is covered by water?",
    "options": [
      {
        "option": "A",
        "value": "50%"
      },
      {
        "option": "B",
        "value": "71%"
      },
      {
        "option": "C",
        "value": "85%"
      },
      {
        "option": "D",
        "value": "66%"
      }
    ],
    "correct_answer": {
      "option": "B",
      "value": "71%"
    },
    "mark": 1,
    "tags": [
      "1",
      "2"
    ],
    "learning_outcome": [
      "string"
    ],
    "bloom_level": "string",
    "difficulty": "string"
  }
]

export async function GET({ params }) {
    const { id } = params;

    const apiUrl = `${AI_BASE_URL}/api/v1/question-generations/${id}/questions`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
        });
        console.log('api is called',)

        if (!response.ok) {
            
            // const transformedData = mockData?.map(item => {return {...item, count: item.num_questions, subject:item.subject_name}})
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        // const transformedData = data?.map(item => {return {...item, count: item.num_questions, subject:item.subject_name}})
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching the generation history' }, { status: 500 });
    }
}