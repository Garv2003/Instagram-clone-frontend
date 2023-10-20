export const formatInstagramDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const differenceInSeconds = Math.floor((now - date) / 1000);

  if (differenceInSeconds < 5) {
    return "just now";
  } else if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  } else if (differenceInSeconds < 3600) {
    const minutesAgo = Math.floor(differenceInSeconds / 60);
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (differenceInSeconds < 86400) {
    const hoursAgo = Math.floor(differenceInSeconds / 3600);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else {
    const daysAgo = Math.floor(differenceInSeconds / 86400);
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  }
};
