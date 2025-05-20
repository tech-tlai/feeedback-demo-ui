import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url,params }) {
     const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/avg-max-min-marks/${classSubject}`;

    try {
        const response = await fetch(apiUrl);
 
        if (!response.ok) {
            const mockData = {
                "testCount": 3,
                "subject": "English",
                "scoreTypes": [
                    "Avg",
                    "Max",
                    "Min"
                ],
                "testScores": [
                    {
                        "avg": 40,
                        "min": 20,
                        "max": 65,
                        "examName": "T3",
                        "examId": "E001",
                        "dateOfExam": "2024-11-12"
                    },
                    {
                        "avg": 58,
                        "min": 25,
                        "max": 72,
                        "examName": "Mid Term",
                        "examId": "E002",
                        "dateOfExam": "2024-12-15"
                    },
                    {
                        "avg": 48,
                        "min": 22,
                        "max": 62,
                        "examName": "T4",
                        "examId": "E003",
                        "dateOfExam": "2025-01-18"
                    }
                ]
            }
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching avg-mx-min data' }, { status: 500 });
    }
}