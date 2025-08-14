// src/lib/context.js
import { writable } from 'svelte/store';

export const selectedClassStore = writable('');
export const chatContextStore = writable(null);
export const selectedStudentStore = writable({
    "studentId": 37,
    "className": "7A_Student_1",
    "subjects": [
        "Science",
        "Maths",
        "English"
    ],
    "selectedSubject": "Science",
    "fullClassName": "7A"
});
