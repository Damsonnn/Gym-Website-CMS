import React, { Component, useState } from 'react'
import renderList from "../../utils/RenderList"

type Offer = {
    name: string
    price: number
    active: boolean
}

export default function ListOffers() {
    const getOffers = () => {
        const postsTest = [{name: "oferta 1", price: 109.50, active: true},
            {name: "oferta 2", price: 40, active: false},
            {name: "oferta 3", price: 79.99, active: true}]
        return postsTest
    }
    const [offers, setOffers] = useState(getOffers());
    const mapOffers = (offers: Array<Offer>) => offers.map(offer => [offer.name, offer.price.toString(), offer.active ? "Tak" : "Nie"])

    return (
        renderList(["Nazwa", "Cena", "Aktywna"], mapOffers(offers))
    )
}