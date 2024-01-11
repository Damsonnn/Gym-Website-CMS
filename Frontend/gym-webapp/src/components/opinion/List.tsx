import React, { Component, useState } from 'react'
import renderList from "../general/RenderList"

type Opinion = {
    id: number
    reviewer: string
    active: boolean
}

export default function ListOpinions() {
    const getOpinions = () => {
        const postsTest = [{id:1, reviewer: "klient 1",  active: true},
            {id:2, reviewer: "klient 2", active: false},
            {id:3, reviewer: "klient 3", active: true}]
        return postsTest
    }
    const [opinions, setOpinions] = useState(getOpinions());
    const mapOpinions = (opinions: Array<Opinion>) => opinions.map(opinion => {
        return {id: opinion.id, content: [opinion.reviewer, opinion.active ? "Tak" : "Nie"]}
    })

    return (
        renderList(["Recenzent", "Aktywna"], mapOpinions(opinions))
    )
}