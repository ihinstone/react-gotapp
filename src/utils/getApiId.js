export const getApiId = (url) => {
  const urlArr = url.match(/\/(\d*)$/);

  return urlArr[1];
};
