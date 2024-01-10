import React, { Component, useState } from 'react'
import renderList from "../../utils/RenderList"

type User = {
    username: string
    email: string
}

export default function ListUsers() {
    const getUsers = () => {
        const postsTest = [{username: "nazwa 1", email: "email 1"},
            {username: "nazwa 2", email: "email 2"},
            {username: "nazwa 3", email: "email 3"}]
        return postsTest
    }
    const [users, setUsers] = useState(getUsers());
    const mapUsers = (users: Array<User>) => users.map(user => [user.username, user.email])

    return (
        renderList(["Nazwa użytkownika", "E-mail"], mapUsers(users))
    )

}