// Load students and teachers for dashboard portal
export async function load({ fetch }) {
	const [studentsRes, teachersRes] = await Promise.all([
		fetch('/apis/student'),
		fetch('/apis/teacher')
	]);

	const students = studentsRes.ok ? await studentsRes.json() : [];
	const teachers = teachersRes.ok ? await teachersRes.json() : [];

	return {
		students,
		teachers
	};
}
