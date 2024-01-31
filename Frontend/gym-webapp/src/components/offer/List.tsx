import React, { Component, useState } from 'react'
import renderList from "../general/RenderList"

type Offer = {
    id: number
    name: string
    price: number
    active: boolean
}

export default function ListOffers() {
    const getOffers = () => {
        const postsTest = [{id:1, name: "oferta 1", price: 109.50, active: true},
            {id:2, name: "oferta 2", price: 40, active: false},
            {id:3, name: "oferta 3", price: 79.99, active: true}]
        return postsTest
    }
    const [offers, setOffers] = useState(getOffers());
    const mapOffers = (offers: Array<Offer>) => offers.map(offer => {
        return {id: offer.id, content: [offer.name, offer.price.toString(), offer.active ? "Tak" : "Nie"]}
    })

    return (
        renderList(["Nazwa", "Cena", "Aktywna"], mapOffers(offers), "offers")
    )
}