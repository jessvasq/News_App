export const GetArticlesByLocation = async (location) => {
    const response = await fetch(`http://localhost:8088/api/country/${location}`);

    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return response.json()

}