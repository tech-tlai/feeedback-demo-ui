import { writable } from 'svelte/store';

export const studentUploadState = writable({
    files: [],
    // Add more fields as needed (e.g., selectedStudent)
});

export const studentUploadedFiles = writable([]);

// Store for the list of students after upload
export const studentListStore = writable([]);