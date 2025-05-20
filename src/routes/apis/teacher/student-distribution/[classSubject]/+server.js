import { json } from '@sveltejs/kit';
import { BASE_URL } from '$lib/constants';

export async function GET({ url, params }) {
    const {classSubject} = params
    // const std = url.searchParams.get('std') || '3';
    // const division = url.searchParams.get('division') || 'A';
    // const starttime = url.searchParams.get('starttime') || '2024-01-01';
    // const endtime = url.searchParams.get('endtime') || '2024-04-30';

    const apiUrl = `${BASE_URL}/apis/v1/teachers/student-distribution/${classSubject}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const mockData = {
                "subject": "English",
                "scoreRanges": {
                    "90-100": {
                        "studentCount": 2,
                        "students": [
                            {"id": 1, "name": "Sahil"},
                            {"id": 2, "name": "Aarav"}
                        ]
                    },
                    "80-89": {
                        "studentCount": 3,
                        "students": [
                            {"id": 3, "name": "Neha"},
                            {"id": 4, "name": "Rohan"},
                            {"id": 5, "name": "Priya"}
                        ]
                    },
                    "70-79": {
                        "studentCount": 4,
                        "students": [
                            {"id": 6, "name": "Kabir"},
                            {"id": 7, "name": "Ananya"},
                            {"id": 8, "name": "Vihaan"},
                            {"id": 9, "name": "Aditya"}
                        ]
                    },
                    "60-69": {
                        "studentCount": 5,
                        "students": [
                            {"id": 10, "name": "Tanya"},
                            {"id": 11, "name": "Aryan"},
                            {"id": 12, "name": "Isha"},
                            {"id": 13, "name": "Raj"},
                            {"id": 14, "name": "Sneha"}
                        ]
                    },
                    "50-59": {
                        "studentCount": 6,
                        "students": [
                            {"id": 15, "name": "Vivaan"},
                            {"id": 16, "name": "Dia"},
                            {"id": 17, "name": "Rahul"},
                            {"id": 18, "name": "Sanya"},
                            {"id": 19, "name": "Nikhil"},
                            {"id": 20, "name": "Avni"}
                        ]
                    },
                    "40-49": {
                        "studentCount": 7,
                        "students": [
                            {"id": 21, "name": "Harsh"},
                            {"id": 22, "name": "Kiara"},
                            {"id": 23, "name": "Varun"},
                            {"id": 24, "name": "Riya"},
                            {"id": 25, "name": "Kunal"},
                            {"id": 26, "name": "Srishti"},
                            {"id": 27, "name": "Dhruv"}
                        ]
                    },
                    "30-39": {
                        "studentCount": 6,
                        "students": [
                            {"id": 28, "name": "Parth"},
                            {"id": 29, "name": "Manav"},
                            {"id": 30, "name": "Aisha"},
                            {"id": 31, "name": "Yash"},
                            {"id": 32, "name": "Simran"},
                            {"id": 33, "name": "Arjun"}
                        ]
                    },
                    "20-29": {
                        "studentCount": 5,
                        "students": [
                            {"id": 34, "name": "Pooja"},
                            {"id": 35, "name": "Raghav"},
                            {"id": 36, "name": "Sana"},
                            {"id": 37, "name": "Karthik"},
                            {"id": 38, "name": "Bhavya"}
                        ]
                    },
                    "10-19": {
                        "studentCount": 4,
                        "students": [
                            {"id": 39, "name": "Ishaan"},
                            {"id": 40, "name": "Meera"},
                            {"id": 41, "name": "Vihaan"},
                            {"id": 42, "name": "Ananya"}
                        ]
                    },
                    "0-9": {
                        "studentCount": 2,
                        "students": [
                            {"id": 43, "name": "Rajat"},
                            {"id": 44, "name": "Suhana"}
                        ]
                    }
                }
                
            }
            
            return json(mockData, { status: 200 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        return json({ error: 'An error occurred while fetching student distribution data' }, { status: 500 });
    }
}