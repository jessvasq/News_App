export const GetArticlesByCategory = async (category) => {
  const response = await fetch(`http://localhost:8088/api/category/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};
