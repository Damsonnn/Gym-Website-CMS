import { useState, useEffect } from 'react'
import renderList from '../../general/RenderList'
import { getAllObjects } from '../../../utils/ApiRequests'

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

    const mapTrainers = (trainers: Array<Trainer>) => {
        if (trainers.length === 0) {
            return [];
        }
        return trainers.map(trainer => {
            return {id: trainer.id, content: [trainer.firstName, trainer.lastName, trainer.active ? "Yes" : "No"]}
        })
    }

    useEffect(() => {
        getAllObjects("trainers", setTrainers);
    },[])

    return (
        renderList(["First name", "Last Name", "Active"], mapTrainers(trainers), "trainers")
    )
}