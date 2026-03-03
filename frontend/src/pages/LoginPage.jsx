import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      // 백엔드 응답에서 토큰과 유저 정보를 꺼내 저장합니다.
      loginSuccess(res.data.access_token, {
        nickname: res.data.nickname,
        id: res.data.id,
      });
      navigate("/"); // 메인 화면으로 이동
    } catch (err) {
      alert("로그인 실패. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: "10px" }}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
