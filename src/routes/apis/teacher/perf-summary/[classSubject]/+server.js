import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

const mockData = {
class:"3A",
studentCount:37,
perfIndicators: [
     { label: "Avg. Score", value: 61, period: "Last 5 tests" },
      { label: "Attendance score", value: 65, period: "Last 5 tests" },
      { label: "Pass Percentage", value: 82, period: 'Last 5 tests' }
]
}


export async function GET({ url, params }) {
    
    const {classSubject} = params

    // const teacherId = url.searchParams.get('teacherId') || 'T123';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/performance-summary/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // return json({ error: 'Failed to fetch data from the API' }, { status: response.status });
        return json(mockData);

        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.log('Server side error log:', error.message);
        return json({ error: 'An error occurred while fetching data' },{ status: 500 });
    }
}