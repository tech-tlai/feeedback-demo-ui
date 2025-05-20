import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
        const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/attendance-sheet/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
                {
                    "total": 44,
                    "percentage": 86.4,
                    "name": "Subhash Patel",
                    "rank": 1,
                    "present": 38
                },
                {
                    "total": 44,
                    "percentage": 84.1,
                    "name": "Rishi Sharma",
                    "rank": 2,
                    "present": 37
                },
                {
                    "total": 44,
                    "percentage": 82.7,
                    "name": "Kavya Reddy",
                    "rank": 3,
                    "present": 36
                },
                {
                    "total": 44,
                    "percentage": 75,
                    "name": "Uday Puthuraya",
                    "rank": 4,
                    "present": 33
                },
                {
                    "total": 44,
                    "percentage": 72.7,
                    "name": "Abraham Mathew",
                    "rank": 5,
                    "present": 32
                }
            ];
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching attendance sheet data' }, { status: 500 });
    }
}