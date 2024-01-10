import React, { Component, useState } from 'react'
import renderList from "../../utils/RenderList"

type Opinion = {
    reviewer: string
    active: boolean
}

export default function ListOpinions() {
    const getOpinions = () => {
        const postsTest = [{reviewer: "klient 1",  active: true},
            {reviewer: "klient 2", active: false},
            {reviewer: "klient 3", active: true}]
        return postsTest
    }
    const [opinions, setOpinions] = useState(getOpinions());
    const mapOpinions = (offers: Array<Opinion>) => opinions.map(opinion => [opinion.reviewer, opinion.active ? "Tak" : "Nie"])

    return (
        renderList(["Recenzent", "Aktywna"], mapOpinions(opinions))
    )
}