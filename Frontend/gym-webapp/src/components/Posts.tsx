import React, { Component, useState } from 'react'

type Post = {
    title: string
    author: string
}

export default function Posts() {
    const getPosts = () => {
        const postsTest = [{title: "tytul 1", author: "autor 1"},
            {title: "tytul 2", author: "autor 2"},
            {title: "tytul 3", author: "autor 3"}]
        return postsTest
    }
    const [posts, setPosts] = useState(getPosts());
    const mapPosts = (posts: Array<Post>) => {
        return posts.map(post => <tr><td>{post.title}</td><td>{post.author}</td></tr>)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Autor</th>
                </tr>
            </thead>
            <tbody>
                {mapPosts(posts)}
            </tbody>
        </table>
    )
}