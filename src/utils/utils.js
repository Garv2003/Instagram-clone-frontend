import axios from "axios";

const API_URL = "http://localhost:3456";

export const deletePost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`${API_URL}/post/deletepost/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      resolve(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      reject(error);
    }
  });
};

export const follow = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      axios.put(
        `${API_URL}/user/follow`,
        {
          followId: userid,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(true);
    } catch (error) {
      console.error("Error following user:", error);
      reject(error);
    }
  });
};

export const unfollow = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      axios.put(
        `${API_URL}/user/unfollow`,
        {
          followId: userid,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(false);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const likePost = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.put(
        `${API_URL}/post/like`,
        {
          postid: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(true);
    } catch (error) {
      console.error("Error liking post:", error);
      reject(error);
    }
  });
};

export const unlikePost = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.put(
        `${API_URL}/post/unlike`,
        {
          postid: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(false);
    } catch (error) {
      console.error("Error unliking post:", error);
      reject(error);
    }
  });
};

export const bookmarkPost = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.put(
        `${API_URL}/post/bookmark`,
        {
          postid: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(true);
    } catch (error) {
      console.error("Error bookmarking post:", error);
      reject(error);
    }
  });
};

export const unbookmark = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.put(
        `${API_URL}/post/unbookmark`,
        {
          postid: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(false);
    } catch (error) {
      console.error("Error unbookmarking post:", error);
      reject(error);
    }
  });
};

export const addCommentToPost = async (id, comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id, comment);
      await axios.post(
        `${API_URL}/post/addcomment`,
        {
          postid: id,
          text: comment,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      resolve(true);
    } catch (error) {
      console.error("Error adding comment:", error);
      reject(error);
    }
  });
};

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
