// axios 기본 주소 및 토큰 인터셉터 설정
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // 백엔드 주소
});

// 요청을 보내기 전 항상 실행됨
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
