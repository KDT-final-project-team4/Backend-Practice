import axiosClient from "../api/axiosClient";

export const getPosts = () => axiosClient.get("/posts");
export const createPost = (formData) =>
  axiosClient.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updatePost = (id, data) => axiosClient.put(`/posts/${id}`, data);
export const deletePost = (id) => axiosClient.delete(`/posts/${id}`);
