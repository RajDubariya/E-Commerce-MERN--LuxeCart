export const baseurl = "http://localhost:8000/api";

const truncateText = (text) => {
  if (text) {
    let shortText = text.substring(0, 20);
    if (shortText.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  }
};
