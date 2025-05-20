import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url,params }) {
    const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/students-at-risk/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
                {
                    "marksObtained": 25,
                    "total": 50,
                    "subject": "English",
                    "percentage": 50,
                    "name": "Rahul Sharma",
                    "rank": 31
                },
                {
                    "marksObtained": 23,
                    "total": 50,
                    "subject": "English",
                    "percentage": 46,
                    "name": "Avinash Mishra",
                    "rank": 32
                },
                {
                    "marksObtained": 21,
                    "total": 50,
                    "subject": "English",
                    "percentage": 42,
                    "name": "Aparna P",
                    "rank": 33
                },
                {
                    "marksObtained": 20,
                    "total": 50,
                    "subject": "English",
                    "percentage": 40,
                    "name": "Uday Puthuraya",
                    "rank": 34
                },
                {
                    "marksObtained": 20,
                    "total": 50,
                    "subject": "English",
                    "percentage": 40,
                    "name": "Sita Goel",
                    "rank": 35
                }
            ];
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching students at risk data' }, { status: 500 });
    }
}