import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url , params }) {
      const {studentId} = params
    const subject = url.searchParams.get('subject') || '';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/students/overall-score-percentile/${studentId}?subject=${subject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
               "exams": [
                {
                    "date": "12-Nov-24",
                    "subject": "English",
                    "examId": "E001",
                    "studentScorePercentage": 65,
                    "percentile25": 48,
                    "percentile50": 60,
                    "percentile75": 70,
                    "subjectId": "ENG"
                },
                {
                    "date": "12-Nov-24",
                    "subject": "English",
                    "examId": "E001",
                    "studentScorePercentage": 68,
                    "percentile25": 50,
                    "percentile50": 63,
                    "percentile75": 74,
                    "subjectId": "ENG"
                },
                {
                    "date": "25-Nov-24",
                    "subject": "English",
                    "examId": "G002",
                    "studentScorePercentage": 70,
                    "percentile25": 51,
                    "percentile50": 64,
                    "percentile75": 72,
                    "subjectId": "ENG"
                },
                {
                    "date": "04-Dec-24",
                    "subject": "English",
                    "examId": "E003",
                    "studentScorePercentage": 60,
                    "percentile25": 45,
                    "percentile50": 58,
                    "percentile75": 69,
                    "subjectId": "ENG"
                },
                {
                    "date": "17-Dec-24",
                    "subject": "English",
                    "examId": "E004",
                    "studentScorePercentage": 63,
                    "percentile25": 49,
                    "percentile50": 61,
                    "percentile75": 73,
                    "subjectId": "ENG"
                },
                {
                    "date": "10-Jan-25",
                    "subject": "English",
                    "examId": "E005",
                    "studentScorePercentage": 58,
                    "percentile25": 42,
                    "percentile50": 55,
                    "percentile75": 67,
                    "subjectId": "ENG"
                },
                {
                    "date": "18-Jan-25",
                    "subject": "English",
                    "examId": "G006",
                    "studentScorePercentage": 72,
                    "percentile25": 53,
                    "percentile50": 66,
                    "percentile75": 76,
                    "subjectId": "ENG"
                },
                {
                    "date": "30-Jan-25",
                    "subject": "English",
                    "examId": "E007",
                    "studentScorePercentage": 65,
                    "percentile25": 52,
                    "percentile50": 62,
                    "percentile75": 71,
                    "subjectId": "ENG"
                },
                {
                    "date": "10-Feb-25",
                    "subject": "English",
                    "examId": "E008",
                    "studentScorePercentage": 62,
                    "percentile25": 48,
                    "percentile50": 59,
                    "percentile75": 70,
                    "subjectId": "ENG"
                },
                {
                    "date": "20-Feb-25",
                    "subject": "English",
                    "examId": "E009",
                    "studentScorePercentage": 75,
                    "percentile25": 55,
                    "percentile50": 68,
                    "percentile75": 78,
                    "subjectId": "ENG"
                }
            ]
            
            
            
            
            
            }
            
            
            return json(mockData.exams, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching score percentile trend data' }, { status: 500 });
    }
}

