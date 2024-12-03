export const fetchAdvocates = async () => {
    const response = await fetch('/api/advocates');
    if (!response.ok) {
        throw new Error('Failed to fetch advocates');
    }
    return response.json();
};