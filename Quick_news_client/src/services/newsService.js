import axios from 'axios';

const API_URL = 'http://localhost:8088/newsApp/'

export const getTopHeadlines = async (country = 'us') => {
  try {
    const response = await axios.get(API_URL, {
      params: { country },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error.message || error.response?.data || error);
    throw error; // Re-throw the error so that it can be caught in the calling function
  }
};