import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
  const {studentId} = params
  

    const apiUrl = `${BASE_URL}/apis/v1/students/progress-report/${studentId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
            {
                "date": "2025-02-15",
                "subject": "English",
                "examId": "E003",
                "examName": "UT3",
                "marksPercentage": 86,
                "marks": 43,
                "totalMarks": 50,
                "classAvg": 67.6,
                "highest": 91,
                "goalAchieved": true,
                "feedback": "Minor spelling mistakes observed."
            },
            {
                "date": "2025-02-15",
                "subject": "Mathematics",
                "examId": "M003",
                "examName": "UT3",
                "marksPercentage": 85,
                "marks": 42.5,
                "totalMarks": 50,
                "classAvg": 55.9,
                "highest": 91,
                "goalAchieved": true,
                "feedback": "Can improve in problem-solving approach."
            },
            {
                "date": "2025-02-15",
                "subject": "Social Science",
                "examId": "S003",
                "examName": "UT3",
                "marksPercentage": 62,
                "marks": 31,
                "totalMarks": 50,
                "classAvg": 68.3,
                "highest": 90,
                "goalAchieved": false,
                "feedback": "Needs to work on map-based questions and critical thinking."
            },
            {
                "date": "2025-02-15",
                "subject": "Science",
                "examId": "SC003",
                "examName": "UT3",
                "marksPercentage": 82,
                "marks": 41,
                "totalMarks": 50,
                "classAvg": 60.4,
                "highest": 89,
                "goalAchieved": true,
                "feedback": "Needs to improve in diagrams and labeling."
            },
            {
                "date": "2025-02-15",
                "subject": "Hindi",
                "examId": "H003",
                "examName": "UT3",
                "marksPercentage": 90,
                "marks": 45,
                "totalMarks": 50,
                "classAvg": 70.5,
                "highest": 92,
                "goalAchieved": true,
                "feedback": "Excellent vocabulary usage."
            }
        ]

            
            
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching score progress report data' }, { status: 500 });
    }
}

