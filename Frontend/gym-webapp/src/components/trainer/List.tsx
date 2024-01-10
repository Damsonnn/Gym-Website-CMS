import React, { Component, useState } from 'react'
import renderList from '../../utils/RenderList'

type Trainer = {
    firstName: string
    lastName: string
    active: boolean
}

export default function ListTrainers() {
    const getPosts = () => {
        const postsTest = [{firstName: "imie 1", lastName: "nazwisko 1", active: true},
            {firstName: "imie 2", lastName: "nazwisko 2", active: false},
            {firstName: "imie 3", lastName: "nazwisko 3", active: true}]
        return postsTest
    }
    const [trainers, setTrainers] = useState(getPosts());
    const mapTrainers = (trainers: Array<Trainer>) => trainers.map(trainer => [trainer.firstName, trainer.lastName, trainer.active ? "Tak" : "Nie"])

    return (
        renderList(["Imię", "Nazwisko", "Aktywny"], mapTrainers(trainers))
    )
    }