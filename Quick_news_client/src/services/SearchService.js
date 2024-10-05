// Handles search logic

const BASE_URL = 'http://localhost:8088/api/'; 

// services/articleService.js
// export const fetchArticles = async (query, category='', location='') => {
//     try {
//       // const API_URL = `https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`;
//       if (category) {
//         BASE_URL += `&category=${category.toLowerCase()}`;
//       }

//       if (location) {
//         BASE_URL += `&country=${location.toLowerCase()}`;
//       }

//       const response = await axios.get(`${BASE_URL}/search`, {
//         params: { query},
//       });

//       if (!response.ok) {
//         throw new Error(`Error fetching articles: ${response.status}`);
//       }
      
//       const json = await response.json();
//       return json.articles; 
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//       return [];
//     }
//   };
  


export const FetchArticles = async (query, category='', location='') => {
    try {
      // if (category) {
      //   BASE_URL += `/category/${category.toLowerCase()}`;
      // }

      // if (location) {
      //   BASE_URL += `/country/${location.toLowerCase()}`;
      // }

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
  
