import { useState, useEffect, ReactNode } from "react"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { Offer } from "../admin-panel/components/offer/List"
import OfferComponent from "./list-item-components/Offer"

export default function Offers() {
    const [offers, setOffers] = useState<Array<Offer>>([])

    const showOffers = () => {
        if (offers.length > 0) {
            return offers.map(offer => {
                return <OfferComponent key={offer.id} name={offer.name} body={offer.body} price={offer.price} discount={offer.discount}/>
            })
        }
        return <h2 className="mt-3">No offers to load</h2>
    }

    useEffect(() => {
        getAllObjectsNoToken("offers/active", setOffers);
    },[])

    return (
        <div className="offers-container">
            {showOffers()}
        </div>
    )
}
