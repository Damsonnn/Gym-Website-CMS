import { useState, useEffect, ReactNode } from "react"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { Offer } from "../admin-panel/components/offer/List"
import OfferComponent from "./list-item-components/Offer"

export default function Offers() {
    const [offers, setOffers] = useState<Array<Offer>>([])

    const getOffers = () => {
        getAllObjectsNoToken("offers/active", setOffers);
        // const tempOffers = []
        // tempOffers.push({id: 1,
        //     name: "Oferta 1",
        //     price: 99.99,
        //     discount: 0,
        //     body: `Super oferta dla ludzi</br>Zawiera np.
        //     <ul>
        //     <li>Pierwszą rzecz</li>
        //     <li>Drugą rzecz</li>
        //     <li><h>Trzecią rzecz</h></li>
        //     <li>Czwartą rzecz</li>
        //     </ul>`,
        //     active: true
        // })
        // tempOffers.push({id: 2,
        //     name: "Oferta 2",
        //     price: 50,
        //     discount: 0,
        //     body: `Super oferta dla ludzi</br>Zawiera np.
        //     <ul>
        //     <li>Pierwszą rzecz</li>
        //     <li>Drugą rzecz</li>
        //     <li><h>Trzecią rzecz</h></li>
        //     <li>Czwartą rzecz</li>
        //     </ul>`,
        //     active: true
        // })
        // tempOffers.push({id: 3,
        //     name: "Oferta 3",
        //     price: 64.99,
        //     discount: 25,
        //     body: `Super oferta dla ludzi</br>Zawiera np.
        //     <ul>
        //     <li>Pierwszą rzecz</li>
        //     <li>Drugą rzecz</li>
        //     <li><h>Trzecią rzecz</h></li>
        //     <li>Czwartą rzecz</li>
        //     </ul>`,
        //     active: true
        // })
        // setOffers(tempOffers)
    }

    const showOffers = () => {
        if (offers.length > 0) {
            return offers.map(offer => {
                return <OfferComponent key={offer.id} name={offer.name} body={offer.body} price={offer.price} discount={offer.discount}/>
            })
        }
        return <h2 className="mt-3">No offers to load</h2>
    }

    useEffect(() => {
        getOffers();
    },[])

    return (
        <div className="offers-container">
            {showOffers()}
        </div>
    )
}
