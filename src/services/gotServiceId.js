const gotServiceId = async ({ url, id }) => {
  try {
    const gotData = await fetch(`${url}/${id}`);
    return await gotData.json();
  } catch (error) {
    console.error(error);
  }
};

export default gotServiceId;
