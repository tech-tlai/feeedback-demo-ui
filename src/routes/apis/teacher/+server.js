// Returns a list of teachers
import { json } from '@sveltejs/kit';
import { teachers } from '$lib/data';

export function GET() {
	return json(teachers || []);
}
