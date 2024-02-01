import { useState, useEffect } from 'react'
import renderList from '../general/RenderList'
import { Category } from '../category/List'
import { User } from '../user/List'
import { getAllObjects } from '../../utils/ApiRequests'

export type Post = {
    id: number
    title: string
    body: string
    category: Category
    user: User
}

export default function ListPosts() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    const getPosts = () => {
        getAllObjects("posts", setPosts);
    }

    const mapPosts = (posts: Array<Post>) => posts.map(post => {
        return {id: post.id, content: [post.title, post.user.username]}
    })

    useEffect(() => {
        getPosts();
    },[])

    return (
        renderList(["Tytuł", "Autor"], mapPosts(posts), "posts")
    )
    }