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