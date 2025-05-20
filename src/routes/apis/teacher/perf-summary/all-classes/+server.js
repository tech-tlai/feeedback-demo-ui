import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

const mockData = [{
    className: 'Class 3 A',
    studentCount: 37,
    subjects: [
        { subject: 'English', score: 64.5 },
        { subject: 'Social science', score: 58.5 }
    ]
},
{
    className: 'Class 3 B',
    studentCount: 41,
    subjects: [{ subject: 'English', score: 75.6,  }]
},
{
    className: 'Class 5 A',
    studentCount: 39,
    subjects: [{ subject: 'English', score: 75.6,  }]
},
{
    className: 'Class 5 B',
    studentCount: 37,
    subjects: [{ subject: 'English', score: 69.5,  }]
},
{
    className: 'Class 10 A',
    studentCount: 24,
    subjects: [{ subject: 'English', score: 52.5,  }]
},
{
    className: 'Class 10 B',
    studentCount: 24,
    subjects: [{ subject: 'English', score: 60.7,  }]
},
]

export async function GET({ url }) {
        // const {classSubject} = params
    // const teacherId = url.searchParams.get('teacherId') || 'T123';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/teacher-class-summaries`;

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