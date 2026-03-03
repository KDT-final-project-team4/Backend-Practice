import React from "react";

function PostItem({ post, currentUser, onDelete }) {
  // 현재 로그인한 유저와 글 작성자가 같은지 확인 (삭제 버튼 노출용)
  const isMyPost = currentUser && currentUser.id === post.author_id;

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <strong>{post.author_nickname || "익명"}</strong>
        {isMyPost && (
          <button
            onClick={() => onDelete(post.id)}
            style={{ color: "red", cursor: "pointer" }}
          >
            삭제
          </button>
        )}
      </div>

      {post.image_url && (
        <img
          src={`http://localhost:8000${post.image_url}`}
          alt="게시글 이미지"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        />
      )}

      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
    </div>
  );
}

export default PostItem;
