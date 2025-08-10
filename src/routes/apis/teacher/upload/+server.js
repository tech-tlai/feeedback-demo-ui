// endpoint for teacher data upload
export async function POST({ request, fetch }) {
    try {
        const formData = await request.formData();
        // Accept only one file, with key 'excel_file'
        const file = formData.get('excel_file');
        const teacherId = formData.get('teacher_id');
        const className = formData.get('class_name');
        const subject = formData.get('subject');
        const uploadForm = new FormData();
        if (file) {
            uploadForm.append('excel_file', file);
        }
        if (teacherId) {
            uploadForm.append('teacher_id', teacherId);
        }
        if (className) {
            uploadForm.append('class_name', className);
        }
        if (subject) {
            uploadForm.append('subject', subject);
        }
        console.log('uploadForm', uploadForm);
        const BASE_URL = 'http://52.63.181.0:8000';
        const apiUrl = `${BASE_URL}/v1/feedback/teacher`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: uploadForm
        });
        const result = await response.json();
        return new Response(JSON.stringify(result), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.log('error in upload', err.message)
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
