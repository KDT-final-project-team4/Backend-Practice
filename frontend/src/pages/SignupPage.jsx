import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password, nickname });
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패 (이미 존재하는 이메일일 수 있습니다.)");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form
        onSubmit={handleSignup}
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
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: "10px" }}>
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
