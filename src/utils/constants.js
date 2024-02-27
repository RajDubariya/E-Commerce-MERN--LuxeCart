import { getUser } from "./userService";

const baseurl = "http://localhost:8000/api";

const truncateText = (text) => {
  if (text) {
    let shortText = text.substring(0, 150);
    if (shortText.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  }
};
const truncateHeading = (text) => {
  if (text) {
    let shortText = text.substring(0, 25);
    if (shortText.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  }
};

const config = {
  headers: {
    Authorization: "Bearer " + getUser()?.token,
    "Content-Type": "multipart/form-data",
  },
};

export { baseurl, config, truncateText, truncateHeading };
