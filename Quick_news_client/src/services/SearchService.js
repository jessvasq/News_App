// Handles search logic
const BASE_URL = 'http://localhost:8088/api/'; 

export const FetchArticles = async (query, category='', location='') => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: { query},
      });

      if (!response.ok) {
        throw new Error(`Error fetching articles: ${response.status}`);
      }
      
      const json = await response.json();
      return json.articles; 
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  };
  
