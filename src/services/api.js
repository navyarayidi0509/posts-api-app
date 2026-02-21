const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error("failed to fetch posts");
  return response.json();
};

export const createPosts = async (post) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error("failed to fetch posts");
  return response.json();
};

export const updatePost = async (postId, updatedPost) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });
  if (!response.ok) throw new Error("failed to update post");
  return response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("failed to delete post");
};
