// SvelteKit endpoint for GET /apis/teacher/chat/suggestions/[id]

const suggestionResponses = {
1: {
id: 1,
query: 'How does class 5 perform in Mathematics?',
response: "Class 5 has demonstrated a remarkably strong performance in Mathematics this term, achieving an impressive average score of 82% across all assessments. This indicates a solid grasp of core mathematical concepts. However, a deeper dive into the data reveals that while areas like arithmetic operations and problem-solving are exceptionally strong, there's a noticeable dip in scores specifically within the Geometry unit. Students seem to be struggling with concepts such as understanding different types of shapes, calculating perimeter and area, and applying spatial reasoning. Focusing on interactive lessons and practical exercises for geometry could further elevate the class's overall mathematical proficiency and ensure a more well-rounded understanding for every student."
},
2: {
id: 2,
query: 'Weaknesses of class 3 students in English.',
response: "An in-depth analysis of the Class 3 students performance in English indicates a primary area of concern: written expression. While their reading comprehension and vocabulary recognition are quite commendable, a significant number of students are struggling with the fundamental mechanics of writing. Specifically, there's a consistent loss of marks in sentence construction – forming grammatically correct and coherent sentences – and the correct application of punctuation, particularly commas and apostrophes. This suggests a need for more focused practice on basic sentence structure, capitalization rules, and the appropriate use of various punctuation marks. Incorporating daily writing exercises and providing immediate, constructive feedback could greatly improve their written English skills."
}
}

export async function GET({ params }) {
    const { id } = params;
    const suggestion = suggestionResponses[id];
    if (suggestion) {
        return new Response(JSON.stringify(suggestion), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ error: 'Suggestion not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
