export const ifDataIsEmpty = (data) => {
  if (typeof data === "object") {
    return data.some((item) => !item) ? "no data" : data;
  } else if (!data) {
    return "no data";
  } else {
    return data;
  }
};
