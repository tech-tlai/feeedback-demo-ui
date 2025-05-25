// SvelteKit endpoint for GET /apis/teacher/chat/details/[id]

const chatDetails = {
    "1": {
        "id": 1,
        "title": "How did Class 5 perform overall in the recent Mathematics assessment?",
        "details": "Class 5 achieved an average score of 85% in the recent Mathematics assessment, indicating a very strong grasp of the curriculum. The top performer was Aisha Khan with a near-perfect score of 98%. While most students excelled, a slight dip was observed in word problems involving fractions. Targeted practice in this specific area could help bring all students up to the highest level."
    },
    "2": {
        "id": 2,
        "title": "What are the common challenges Class 3 students face in multiplication?",
        "details": "Class 3 students are primarily encountering challenges with recalling multiplication facts beyond 5s and understanding the concept of multiplying by zero. About 25% of students struggled with larger multiplication tables. Incorporating more engaging games and visual aids, such as arrays, could significantly improve their retention and conceptual understanding of multiplication."
    },
    "3": {
        "id": 3,
        "title": "Which specific topics in Geometry need more attention for Class 5?",
        "details": "For Class 5, the most challenging Geometry topics appear to be calculating the area of irregular shapes and understanding angle properties within quadrilaterals. Approximately 30% of students showed difficulty in these areas. More hands-on activities using grid paper and protractors, along with real-world examples, would be beneficial for reinforcing these concepts."
    },
    "4": {
        "id": 4,
        "title": "Are there any patterns in the errors made by Class 3 in their basic arithmetic problems?",
        "details": "Analysis of Class 3's basic arithmetic problems reveals a consistent pattern of errors in subtraction with borrowing, particularly when multiple digits are involved. Approximately 40% of errors stemmed from this specific operation. Additionally, some students are rushing and making copying errors from the problem to their work. Encouraging step-by-step working and double-checking calculations could reduce these mistakes."
    }
}

export async function GET({ params }) {
    const { id } = params;
    const chat = chatDetails[id];
    if (chat) {
        return new Response(JSON.stringify(chat), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ error: 'Chat not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
