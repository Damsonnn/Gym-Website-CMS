import { useState, useEffect } from "react";
import { Post } from "../admin-panel/components/post/List";
import { getAllObjectsNoToken } from "../utils/ApiRequests";
import PostComponent from "./list-item-components/Post";

export default function Posts() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    const showPosts = (posts: Array<Post>) => {
        if (posts.length > 0) {
            return posts.map(post => {
                return <PostComponent key={post.id} id={post.id} title={post.title} author={post.author} category={post.category.name} />
            })
        }
        return <h2 className="mt-3">No posts to show</h2>
    }

    useEffect(() => {
        getAllObjectsNoToken("posts", setPosts);
    }, []);

    return (
        <div className="offers-container">
            {showPosts(posts)}
        </div>
    )
}
