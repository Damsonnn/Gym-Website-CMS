import { useState, useEffect } from 'react'
import renderList from "../../general/RenderList"
import { getAllObjects } from '../../../utils/ApiRequests'

export type User = {
    id: number
    username: string
    email: string 
    role : {
        id: number
    }
}

export default function ListUsers() {
    const [users, setUsers] = useState<Array<User>>([]);

    const mapUsers = (users: Array<User>) => {
        if (users.length === 0) {
            return [];
        }
        return users.map(user => {
            return {id: user.id, content: [user.username, user.email]}
        })
    }

    useEffect(() => {
        getAllObjects("users", setUsers);
    },[])

    return (
        renderList(["Username", "E-mail"], mapUsers(users), "users")
    )
}