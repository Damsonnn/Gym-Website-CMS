import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests'

export type Opinion = {
    id: number
    reviewer: string
    body: string
    active: boolean
}

export default function ListOpinions() {
    const [opinions, setOpinions] = useState<Array<Opinion>>([]);

    const getOpinions = () => {
        getAllObjects("categories", setOpinions);
    }
    
    const mapOpinions = (opinions: Array<Opinion>) => opinions.map(opinion => {
        return {id: opinion.id, content: [opinion.reviewer, opinion.active ? "Tak" : "Nie"]}
    })

    useEffect(() => {
        getOpinions();
    },[])

    return (
        renderList(["Recenzent", "Aktywna"], mapOpinions(opinions), "opinions")
    )
}