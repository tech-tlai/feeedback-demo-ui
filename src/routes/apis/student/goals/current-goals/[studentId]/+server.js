import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
    const {studentId} = params
    const std = url.searchParams.get('std') || '3';
    const division = url.searchParams.get('division') || 'A';
    const starttime = url.searchParams.get('starttime') || '2024-01-01';
    const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/students/current-goals/${studentId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
                {
                    id: 1,
                    subject: 'Mathematics',
                    goalType: 'Recurring',
                    goalDescr: 'Maintain current performance',
                    targetExam: 'All'
                },
                {
                    id: 2,
                    subject: 'English',
                    goalType: 'One-time',
                    goalDescr: 'Achieve 90% in next exam',
                    targetExam: 'End -Term'
                },
                {
                    id: 3,
                    subject: 'Hindi',
                    goalType: 'One-time',
                    goalDescr: 'Achieve 80% in next exam',
                    targetExam: 'Hindi -T3'
                },
                {
                    id: 4,
                    subject: 'General Science',
                    goalType: 'Recurring',
                    goalDescr: 'Maintain current performance',
                    targetExam: 'All'
                },
                {
                    id: 5,
                    subject: 'Social Science',
                    goalType: 'Recurring',
                    goalDescr: 'Improve 5% in every exam',
                    targetExam: 'All'
                },
                {
                    id: 6,
                    subject: 'Tamil',
                    goalType: 'Recurring',
                    goalDescr: 'Improve 5% in every exam',
                    targetExam: 'All'
                }
            ];
            
            
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching current goals' }, { status: 500 });
    }
}