import { writable } from 'svelte/store';

// Store for uploaded teacher files (File[])
export const teacherUploadedFiles = writable([]);

// Store for the list of teachers after upload
export const teacherListStore = writable([]);
