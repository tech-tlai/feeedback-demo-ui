import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url ,params}) {
    const {studentId} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/students/performance-history/${studentId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
                {
                    "className": "Class 5",
                    "badges": ["gold", "gold", "bronze"],
                    "achievements": [
                        { "id": 1, "feedback": "Top 10% of the class" },
                        { "id": 2, "feedback": "Significant improvement in English" }
                    ],
                    "goalsAchieved": "11",
                    "totalGoals": "15",
                    "overallRank": "Top 10%",
                    "overallScore": ""
                },
                {
                    "className": "Class 6",
                    "badges": ["gold", "bronze", "bronze", "bronze"],
                    "achievements": [
                        { "id": 1, "feedback": "Top 10% of the class" },
                        { "id": 2, "feedback": "Significant improvement in English" },
                        { "id": 3, "feedback": "Good use of known vocabulary" }
                    ],
                    "goalsAchieved": "11",
                    "totalGoals": "15",
                    "overallRank": "Top 12%",
                    "overallScore": ""
                },
                {
                    "className": "Class 7",
                    "badges": ["bronze", "bronze"],
                    "achievements": [
                        { "id": 1, "feedback": "Top 10% of the class" },
                        { "id": 2, "feedback": "Significant improvement in English" },
                        { "id": 3, "feedback": "Good use of known vocabulary" }
                    ],
                    "goalsAchieved": "11",
                    "totalGoals": "15",
                    "overallRank": "Top 15%",
                    "overallScore": ""
                },
                {
                    "className": "Class 8",
                    "badges": ["gold", "gold", "gold", "bronze", "bronze"],
                    "achievements": [
                        { "id": 1, "feedback": "Top 10% of the class" },
                        { "id": 2, "feedback": "Significant improvement in English" },
                        { "id": 3, "feedback": "Good use of known vocabulary" }
                    ],
                    "goalsAchieved": "11",
                    "totalGoals": "15",
                    "overallRank": "Top 22%",
                    "overallScore": ""
                },
                {
                    "className": "Class 9",
                    "badges": ["gold", "gold", "gold", "bronze"],
                    "achievements": [
                        { "id": 1, "feedback": "Top 10% of the class" },
                        { "id": 2, "feedback": "Significant improvement in English" },
                        { "id": 3, "feedback": "Good use of known vocabulary" }
                    ],
                    "goalsAchieved": "11",
                    "totalGoals": "15",
                    "overallRank": "Top 10%",
                    "overallScore": ""
                }
            ]
            ;
            
            
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching performance history data' }, { status: 500 });
    }
}

