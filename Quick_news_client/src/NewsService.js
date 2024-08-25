import axios from 'axios';

const BASE_URL = 'http://localhost:8088/api'; 

export const getTopHeadlines = async (country = 'us') => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { country },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
