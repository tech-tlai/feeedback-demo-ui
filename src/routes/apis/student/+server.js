// Returns a list of students
import { json } from '@sveltejs/kit';
import { students } from '$lib/data';

export function GET() {
	return json(students || []);
}
