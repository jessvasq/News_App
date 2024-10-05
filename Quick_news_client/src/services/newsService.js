import axios from 'axios';

const BASE_URL = 'http://localhost:8088/api'; 

export const GetTopHeadlines = async (country = 'us') => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { country },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};


