import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url,params }) {
     const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/section-score-comparison/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = [
            {
                "scoreRange": "0–35",
                "scores": [
                    {
                        "studentProportion": 20,
                        "class": "3A"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3B"
                    },
                    {
                        "studentProportion": 30,
                        "class": "3C"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3D"
                    }
                ]
            },
            {
                "scoreRange": "36–50",
                "scores": [
                    {
                        "studentProportion": 30,
                        "class": "3A"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3B"
                    },
                    {
                        "studentProportion": 20,
                        "class": "3C"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3D"
                    }
                ]
            },
            {
                "scoreRange": "51–75",
                "scores": [
                    {
                        "studentProportion": 25,
                        "class": "3A"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3B"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3C"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3D"
                    }
                ]
            },
            {
                "scoreRange": "76–100",
                "scores": [
                    {
                        "studentProportion": 35,
                        "class": "3A"
                    },
                    {
                        "studentProportion": 25,
                        "class": "3B"
                    },
                    {
                        "studentProportion": 20,
                        "class": "3C"
                    },
                    {
                        "studentProportion": 20,
                        "class": "3D"
                    }
                ]
            }
        ]
            
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching section wise data' }, { status: 500 });
    }
}

// const mockData = {
	// 	testCount: 1,
	// 	sectionData: [
	// 		{
	// 			sectionId: 1,
	// 			scores: [
	// 				{ scoreRangeId: 1, studentProportion: 25, scoreRange: '0-35%' },
	// 				{ scoreRangeId: 2, studentProportion: 18, scoreRange: '36-50%' },
	// 				{ scoreRangeId: 3, studentProportion: 50, scoreRange: '51-75%' },
	// 				{ scoreRangeId: 4, studentProportion: 7, scoreRange: '76-100%' }
	// 			],
	// 			section: '3A'
	// 		},
	// 		{
	// 			sectionId: 2,
	// 			scores: [
	// 				{ scoreRangeId: 1, studentProportion: 15, scoreRange: '0-35%' },
	// 				{ scoreRangeId: 2, studentProportion: 19, scoreRange: '36-50%' },
	// 				{ scoreRangeId: 3, studentProportion: 45, scoreRange: '51-75%' },
	// 				{ scoreRangeId: 4, studentProportion: 21, scoreRange: '76-100%' }
	// 			],
	// 			section: '3B'
	// 		}
	// 	],
	// 	subject: 'English',
	// 	scoreRanges: [
	// 		{ id: 1, name: '0-35%' },
	// 		{ id: 2, name: '36-50%' },
	// 		{ id: 3, name: '51-75%' },
	// 		{ id: 4, name: '76-100%' }
	// 	],
	// 	sections: [
	// 		{ id: 1, name: '3A' },
	// 		{ id: 2, name: '3B' },
	// 		{ id: 3, name: '3C' },
	// 		{ id: 4, name: '3D' }
	// 	]
	// };
