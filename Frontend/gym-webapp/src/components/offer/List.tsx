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

    const mapOffers = (offers: Array<Offer>) => {
        if (offers.length === 0) {
            return [];
        }
        return offers.map(offer => {
            return { id: offer.id, content: [offer.name, String(offer.price), offer.active ? "Yes" : "No"] }
        })
    }

    useEffect(() => {
        getAllObjects("offers", setOffers);
    }, []);

    return (
        renderList(["Name", "Price", "Active"], mapOffers(offers), "offers")
    )
}