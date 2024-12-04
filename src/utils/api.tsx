export const fetchAdvocates = async (signal?: AbortSignal) => {
    const response = await fetch('/api/advocates', { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch advocates');
    }
    return response.json();
};