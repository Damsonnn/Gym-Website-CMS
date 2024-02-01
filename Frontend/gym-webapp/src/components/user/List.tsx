import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests'

export type User = {
    id: number
    username: string
    email: string 
    role : {
        name: string
        description: string
    }
}

export default function ListUsers() {
    const [users, setUsers] = useState<Array<User>>([]);

    const getUsers = () => {
        getAllObjects("users", setUsers);
    }
    
    const mapUsers = (users: Array<User>) => users.map(user => {
        return {id: user.id, content: [user.username, user.email]}
    })

    useEffect(() => {
        getUsers();
    },[])

    return (
        renderList(["Nazwa użytkownika", "E-mail"], mapUsers(users), "users")
    )

}