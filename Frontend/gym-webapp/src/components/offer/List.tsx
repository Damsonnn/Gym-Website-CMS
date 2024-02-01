import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests'

export type Offer = {
    id: number
    name: string
    price: number
    body: string
    discount: number
    active: boolean
}

export default function ListOffers() {
    const [offers, setOffers] = useState<Array<Offer>>([])

    const getOffers = () => {
        getAllObjects("offers", setOffers)
    }
    const mapOffers = (offers: Array<Offer>) => offers.map(offer => {
        return {id: offer.id, content: [offer.name, offer.active ? "Tak" : "Nie"]}
    })

    useEffect(() => {
        getOffers();
    },[])

    return (
        renderList(["Nazwa", "Cena", "Aktywna"], mapOffers(offers), "offers")
    )
}