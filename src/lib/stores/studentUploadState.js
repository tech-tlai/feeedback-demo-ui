import { writable } from 'svelte/store';

export const studentUploadState = writable({
    files: [],
    // Add more fields as needed (e.g., selectedStudent)
});
