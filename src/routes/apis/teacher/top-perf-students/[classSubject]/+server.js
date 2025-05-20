import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
    const {classSubject} = params
    const std = url.searchParams.get('std') || '3';
    const division = url.searchParams.get('division') || 'A';
    const starttime = url.searchParams.get('starttime') || '2024-01-01';
    const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/top-performers/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
                {
                    "marksObtained": 50,
                    "total": 100,
                    "subject": "English",
                    "percentage": 100,
                    "name": "Akash Sharma",
                    "rank": 1
                },
                {
                    "marksObtained": 49,
                    "total": 50,
                    "subject": "English",
                    "percentage": 98,
                    "name": "Mohammed ",
                    "rank": 2
                },
                {
                    "marksObtained": 47,
                    "total": 50,
                    "subject": "English",
                    "percentage": 94,
                    "name": "Kavya Reddy",
                    "rank": 3
                },
                {
                    "marksObtained": 45,
                    "total": 50,
                    "subject": "English",
                    "percentage": 90,
                    "name": "Peter Thomas",
                    "rank": 4
                },
                {
                    "marksObtained": 44,
                    "total": 50,
                    "subject": "English",
                    "percentage": 88,
                    "name": "Priya Gupta",
                    "rank": 5
                },
            
            ];
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching top performers data' }, { status: 500 });
    }
}