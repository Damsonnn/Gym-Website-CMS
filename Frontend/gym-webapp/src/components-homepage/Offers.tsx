import { useState, useEffect, ReactNode } from "react"
import { getAllObjects } from "../utils/ApiRequests"
import { Offer } from "../components/offer/List"
import OfferComponent from "./Offer"

export default function Offers() {
    const [offers, setOffers] = useState<Array<Offer>>([])

    const getOffers = () => {
        // getAllObjects("offers", setOffers);
        const tempOffers = []
        tempOffers.push({id: 1,
            name: "Oferta 1",
            price: 99.99,
            discount: 0,
            body: `Super oferta dla ludzi</br>Zawiera np.
            <ul>
            <li>Pierwszą rzecz</li>
            <li>Drugą rzecz</li>
            <li><h>Trzecią rzecz</h></li>
            <li>Czwartą rzecz</li>
            </ul>`,
            active: true
        })
        tempOffers.push({id: 2,
            name: "Oferta 2",
            price: 50,
            discount: 0,
            body: `Super oferta dla ludzi</br>Zawiera np.
            <ul>
            <li>Pierwszą rzecz</li>
            <li>Drugą rzecz</li>
            <li><h>Trzecią rzecz</h></li>
            <li>Czwartą rzecz</li>
            </ul>`,
            active: true
        })
        tempOffers.push({id: 3,
            name: "Oferta 3",
            price: 64.99,
            discount: 25,
            body: `Super oferta dla ludzi</br>Zawiera np.
            <ul>
            <li>Pierwszą rzecz</li>
            <li>Drugą rzecz</li>
            <li><h>Trzecią rzecz</h></li>
            <li>Czwartą rzecz</li>
            </ul>`,
            active: true
        })
        setOffers(tempOffers)
    }

    const showOffers = () => {
        const offersJSX = offers.map(offer => {
            return <OfferComponent name={offer.name} body={offer.body} price={offer.price} discount={offer.discount}/>
        })
        return offersJSX
    }

    useEffect(() => {
        getOffers();
    })

    return (
        <div className="offers-container">
            {showOffers()}
        </div>
    )
}
