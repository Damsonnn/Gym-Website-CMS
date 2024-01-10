import React, { Component, useState } from 'react'
import renderList from '../../utils/RenderList'

type Post = {
    title: string
    author: string
}

export default function ListPosts() {
    const getPosts = () => {
        const postsTest = [{title: "tytul 1", author: "autor 1"},
            {title: "tytul 2", author: "autor 2"},
            {title: "tytul 3", author: "autor 3"}]
        return postsTest
    }
    const [posts, setPosts] = useState(getPosts());
    const mapPosts = (posts: Array<Post>) => posts.map(post => [post.title, post.author])

    return (
        renderList(["Tytuł", "Autor"], mapPosts(posts))
    )
    }