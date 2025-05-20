import { json } from '@sveltejs/kit';
import { AI_BASE_URL } from '$lib/constants';

export async function GET({ url ,params}) {
    const {studentId} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${AI_BASE_URL}/apis/v1/students/student_progress_analysis/${studentId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
            "achievement": {
                "feedback": [
                                {
                                    "id": 1,
                                    "text": "Consistent pass above 80% in the last 5 tests."
                                }
                            ]
            },
            "roomForImprovement": {
                "feedback": [
                                {
                                    "id": 1,
                                    "text": "Spelling mistakes in homophone words."
                                }
                            ]
            },
            "suggestions": {
                "feedback": [
                                {
                                    "id": 1,
                                    "text": "Introduce short weekly paragraph writing activities to build writing skills gradually."
                                }
                            ]
            }
            }
            
            
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching performance history data' }, { status: 500 });
    }
}

