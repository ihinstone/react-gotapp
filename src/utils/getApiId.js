export const getApiId = (url) => {
  const urlArr = url.split("/");
  urlArr.map((item, i) => {
    if (i === urlArr.length - 1) {
      return item;
    }
  });
};
