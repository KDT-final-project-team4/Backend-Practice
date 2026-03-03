import axiosClient from "../api/axiosClient";

export const signup = (data) => axiosClient.post("/users/signup", data);
export const login = (data) => axiosClient.post("/users/login", data);
export const getUserMe = () => axiosClient.get("/users/me"); // 로그인 유지용
