import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
      >
        🚀 Practice SNS
      </Link>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>
              {user.nickname}님 환영합니다
            </span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              로그인
            </Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
