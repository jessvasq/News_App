export const FetchArticlesByQuery = async (searchQuery) =>{
    try {
    const response = await fetch(`http://localhost:8088/api/search?query=${searchQuery}`);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
    
    } catch (error) {
    console.log('Error fetching search results:', error);
    return [];
    }
};