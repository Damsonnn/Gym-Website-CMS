import { useState, useEffect } from 'react'
import renderList from '../general/RenderList'
import { getAllObjects } from '../../utils/ApiRequests'

export type Trainer = {
    id: number
    firstName: string
    lastName: string
    age: number
    about: string
    facebookLink: string
    twitterLink: string
    instagramLink: string
    active: boolean
}

export default function ListTrainers() {
    const [trainers, setTrainers] = useState<Array<Trainer>>([]);

    const getTrainers = () => {
       getAllObjects("trainers", setTrainers);
    }
    
    const mapTrainers = (trainers: Array<Trainer>) => trainers.map(trainer => {
        return {id: trainer.id, content: [trainer.firstName, trainer.lastName, trainer.active ? "Tak" : "Nie"]}
    })

    useEffect(() => {
        getTrainers();
    },[])

    return (
        renderList(["Imię", "Nazwisko", "Aktywny"], mapTrainers(trainers), "trainers")
    )
}