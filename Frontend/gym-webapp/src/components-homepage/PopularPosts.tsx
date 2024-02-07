import { useState, useEffect } from "react";
import { Post } from "../components/post/List";
import { getAllObjectsNoToken } from "../utils/ApiRequests";
import PostComponent from "./Post";

export default function PopularPosts() {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const getPosts = () => {
    getAllObjectsNoToken("posts/active", setPosts);
  }

  const showPosts = (posts: Array<Post>) => {
    if (posts.length > 0) {
        return posts.map(post => {
            return <PostComponent key={post.id} id={post.id} title={post.title} author={post.author} category={post.category.name}/>
        })
    }
    return <h2 className="mt-3">Brak artykułów do wczytania</h2>
  } 

  useEffect(() => {
    getPosts();
  },[]);

  return (
    <div className="popular-container">
        {showPosts(posts)}
    </div>
  )
}