import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Text,
    View,
} from "react-native";

import { TextInput } from "react-native";
import { createPosts, deletePost, getPosts, updatePost } from "../services/api";

export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.slice(0, 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !body) {
      Alert.alert("title and body are required");
      return;
    }
    setCreating(true);
    try {
      const newPost = await createPosts({ title, body, userId: 1 });
      setPosts([newPost, ...posts]);
      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      const updatedPost = await updatePost(postId, {
        title: "updated title",
        body: "updated body",
        userId: 1,
      });
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
      Alert.alert("post deleted");
    } catch (err) {
      Alert.alert("error", err.message);
    }
  };

  if (loading) return <ActivityIndicator size="large"></ActivityIndicator>;
  if (error) return <Text>{error}</Text>;

  return (
    <>
      <View style={{ padding: 10 }}>
        <TextInput
          placeholder="post title"
          value={title}
          onChangeText={setTitle}
          style={{ borderWidth: 2, padding: 10, marginBottom: 10 }}
        ></TextInput>
        <TextInput
          placeholder="post body"
          value={body}
          onChangeText={setBody}
          style={{ borderWidth: 2, padding: 10, marginBottom: 10 }}
        ></TextInput>
        {creating ? (
          <ActivityIndicator size="large"></ActivityIndicator>
        ) : (
          <Button title="create post" onPress={handleCreatePost}></Button>
        )}
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.body}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Button
                title="update post"
                onPress={() => handleUpdatePost(item.id)}
              ></Button>
              <Button
                title="delete post"
                onPress={() => handleDeletePost(item.id)}
              ></Button>
            </View>
          </View>
        )}
      ></FlatList>
    </>
  );
}
