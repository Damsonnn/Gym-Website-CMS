import React, { Component, useState } from 'react'
import renderList from '../../utils/RenderList'

type Trainer = {
    id: number
    firstName: string
    lastName: string
    active: boolean
}

export default function ListTrainers() {
    const getPosts = () => {
        const postsTest = [{id:1, firstName: "imie 1", lastName: "nazwisko 1", active: true},
            {id:2, firstName: "imie 2", lastName: "nazwisko 2", active: false},
            {id:3, firstName: "imie 3", lastName: "nazwisko 3", active: true}]
        return postsTest
    }
    const [trainers, setTrainers] = useState(getPosts());
    const mapTrainers = (trainers: Array<Trainer>) => trainers.map(trainer => {
        return {id: trainer.id, content: [trainer.firstName, trainer.lastName, trainer.active ? "Tak" : "Nie"]}
    })

    return (
        renderList(["Imię", "Nazwisko", "Aktywny"], mapTrainers(trainers))
    )
}