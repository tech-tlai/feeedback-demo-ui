import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
    const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/performance-trend/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
               "exams": [
                {
                    "date": "25-Nov-24",
                    "subject": "English",
                    "examId": "E002",
                    "marksPercentage": 85,
                    "marks": 85,
                    "totalMarks": 100,
                    "subjectId": "ENG"
                },
                {
                    "date": "04-Dec-24",
                    "subject": "English",
                    "examId": "E003",
                    "marksPercentage": 75,
                    "marks": 38,
                    "totalMarks": 50,
                    "subjectId": "ENG"
                },
                {
                    "date": "17-Dec-24",
                    "subject": "English",
                    "examId": "E004",
                    "marksPercentage": 82,
                    "marks": 41,
                    "totalMarks": 50,
                    "subjectId": "ENG"
                },
                {
                    "date": "18-Jan-25",
                    "subject": "English",
                    "examId": "E005",
                    "marksPercentage": 88,
                    "marks": 22,
                    "totalMarks": 25,
                    "subjectId": "ENG"
                },
                {
                    "date": "10-Feb-25",
                    "subject": "English",
                    "examId": "E006",
                    "marksPercentage": 72,
                    "marks": 72,
                    "totalMarks": 100,
                    "subjectId": "ENG"
                },
                {
                    "date": "10-Jan-25",
                    "subject": "English",
                    "examId": "E022",
                    "marksPercentage": 78,
                    "marks": 39,
                    "totalMarks": 50,
                    "subjectId": "ENG"
                },
                {
                    "date": "30-Jan-25",
                    "subject": "English",
                    "examId": "E023",
                    "marksPercentage": 85,
                    "marks": 21,
                    "totalMarks": 25,
                    "subjectId": "ENG"
                },
                {
                    "date": "20-Feb-25",
                    "subject": "English",
                    "examId": "E024",
                    "marksPercentage": 80,
                    "marks": 80,
                    "totalMarks": 100,
                    "subjectId": "ENG"
                },
                {
                    "date": "12-Nov-24",
                    "subject": "English",
                    "examId": "E001",
                    "marksPercentage": 78,
                    "marks": 39,
                    "totalMarks": 50,
                    "subjectId": "ENG"
                }
            ]
            
            
            }
            
            
            return json(mockData.exams, { status: 200 });
        }

        const data = await response.json();
        console.log('data in perf trend',data)
        return json(data[0]);
    } catch (error) {
        return json({ error: 'An error occurred while fetching progress trend data' }, { status: 500 });
    }
}