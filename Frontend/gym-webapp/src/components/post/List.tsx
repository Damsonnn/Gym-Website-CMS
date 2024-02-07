import { useState, useEffect } from 'react'
import renderList from '../general/RenderList'
import { Category } from '../category/List'
import { getAllObjects } from '../../utils/ApiRequests'

export type Post = {
    id: number
    title: string
    body: string
    category: Category
    author: string
    active: boolean
}

export default function ListPosts() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    const getPosts = () => {
        getAllObjects("posts", setPosts);
    }

    const mapPosts = (posts: Array<Post>) => {
        if (posts.length === 0) {
            return [];
        }
        return posts.map(post => {
            return {id: post.id, content: [post.title, post.author, post.active ? "Tak" : "Nie"]}
        })
    }

    useEffect(() => {
        getPosts();
    },[])

    return (
        renderList(["Tytuł", "Autor", "Aktywny"], mapPosts(posts), "posts")
    )
    }