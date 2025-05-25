export async function fetchStrengths(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch strengths');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchWeaknesses(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weaknesses');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchChatDetails(id) {
    try {
        const response = await fetch(`/apis/student/chat/details/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch chat details');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function fetchSuggestionResponse(id) {
    try {
        const response = await fetch(`/apis/student/chat/suggestions/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch suggestion response');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}