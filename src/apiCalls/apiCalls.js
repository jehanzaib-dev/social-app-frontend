import axios from "axios";

export const RegisterCall=async(userData)=>{
    const response=await axios.post('/api/v1/auth/register', userData);
    return response.data;
};

export const loginCall = async (userCredentials) => {
  const response = await axios.post("/api/v1/auth/login", userCredentials);
  return response.data;
};

export const getAllUsersCall=async()=>{
  const response=await axios.get('/api/v1/users');
  return response.data;
}

export const getOneUserCall=async(username)=>{
  const response=await axios.get(`/api/v1/users/${username}`);
  return response.data;
}

export const getOneUserByIdCall =
  async (id) => {

    const response =
      await axios.get(
        `/api/v1/users/id/${id}`
      );

    return response.data;
};

export const followUserCall = async (targetUserId, userId) => {

  const response = await axios.put(
    `/api/v1/users/${targetUserId}/follow`,
    { userId }
  );
  return response.data;
};

export const unfollowUserCall = async (targetUserId, userId) => {

  const response = await axios.put(
    `/api/v1/users/${targetUserId}/unfollow`,
    { userId }
  );

  return response.data;
};

export const CreatePostCall=async(postData)=>{
  const response=await axios.post('/api/v1/posts', postData);
  return response.data;
}

export const getAllPostsCall=async()=>{
  const response=await axios.get('/api/v1/posts');
  return response.data;
}

export const getUserPostsCall=async(username)=>{
  const response=await axios.get(`/api/v1/posts/profile/${username}`);
  return response.data;
}

export const LikePostCall = async (postId, userId) => {

    const response = await axios.put(
      `/api/v1/posts/${postId}/like`, {userId} );
    return response.data;
  };

  export const DeletePostCall = async (postId, userId) => {

    const response = await axios.delete(
      `/api/v1/posts/${postId}`,
      {
        data: { userId }
      }
    );

    return response.data;
  };

 export const EditPostCall = async (
  postId,
  updatedData
) => {

  const response = await axios.put(
    `/api/v1/posts/${postId}`,
    updatedData
  );

  return response.data;
}; 

export const addCommentCall = async (
  postId,
  commentData
) => {

  const response = await axios.put(
    `/api/v1/posts/${postId}/comment`,
    commentData
  );

  return response.data;
};

export const getTimelinePostsCall =
  async (userId) => {

    const response =
      await axios.get(
        `/api/v1/posts/timeline/${userId}`
      );

    return response.data;
};

export const uploadImageCall = async (formData) => {

  const response = await axios.post(
    "/api/v1/upload",
    formData
  );

  return response.data;
};

export const updateUserCall = async (
  userId,
  data
) => {

  const response = await axios.put(
    `/api/v1/users/${userId}`,
    data
  );

  return response.data;
};