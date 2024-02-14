import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests'

export type Opinion = {
    id: number
    author: string
    body: string
    active: boolean
}

export default function ListOpinions() {
    const [opinions, setOpinions] = useState<Array<Opinion>>([]);
    
    const mapOpinions = (opinions: Array<Opinion>) => {
        if (opinions.length === 0) {
            return [];
        }
        console.log(opinions)
        return opinions.map(opinion => {
            return {id: opinion.id, content: [opinion.author, opinion.active ? "Yes" : "No"]}
        })
    }

    useEffect(() => {
        getAllObjects("opinions", setOpinions);
    },[])

    return (
        renderList(["Author", "Active"], mapOpinions(opinions), "opinions")
    )
}