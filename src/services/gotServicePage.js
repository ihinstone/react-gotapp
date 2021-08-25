const gotServicePage = async ({ url, page = 1, size = 10 }) => {
  try {
    const gotData = await fetch(`${url}?page=${page}&pageSize=${size}`);
    return await gotData.json();
  } catch (error) {
    console.error(error);
  }
};

export default gotServicePage;
