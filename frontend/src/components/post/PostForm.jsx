import React, { useState, useRef } from "react";

function PostForm({ onSubmit }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return alert("내용을 입력해주세요.");

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    onSubmit(formData);

    setContent("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="무슨 일이 일어나고 있나요?"
        style={{
          width: "100%",
          height: "80px",
          marginBottom: "10px",
          padding: "10px",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          style={{ padding: "5px 15px", cursor: "pointer" }}
        >
          업로드
        </button>
      </div>
    </form>
  );
}

export default PostForm;
