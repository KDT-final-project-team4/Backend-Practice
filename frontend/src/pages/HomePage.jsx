import React, { useState, useEffect, useContext } from "react";
import { getPosts, createPost, deletePost } from "../services/postService";
import { AuthContext } from "../contexts/AuthContext";
import PostForm from "../components/post/PostForm";
import PostItem from "../components/post/PostItem";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const { user, isAuthChecking } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("게시글 로드 실패", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createPost(formData);
      fetchPosts();
    } catch (err) {
      alert("작성 실패: 서버 오류 또는 권한 없음");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      alert("삭제 실패: 권한이 없습니다.");
    }
  };

  if (isAuthChecking) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>홈 피드</h2>
      {user ? (
        <PostForm onSubmit={handleCreate} />
      ) : (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          로그인 후 글을 작성해보세요.
        </div>
      )}

      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            currentUser={user}
            onDelete={handleDelete}
          />
        ))}
        {posts.length === 0 && <p>게시글이 없습니다.</p>}
      </div>
    </div>
  );
}

export default HomePage;
