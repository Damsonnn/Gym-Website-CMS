import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests';

export type Location = {
    id: number
    city: string
    address: string
    phoneNumber: string
    email: number 
}

export default function ListLocations() {
    const [locations, setLocations] = useState<Array<Location>>([]);

    const getLocations = async () => {
       getAllObjects("locations", setLocations);
    }
    
    const mapLocations = (locations: Array<Location>) => locations.map(location => {
        return {id: location.id, content: [location.city, location.address]}
    })

    useEffect(() => {
        getLocations();
    },[])

    return (
        renderList(["Miasto", "Adres"], mapLocations(locations), "locations")
    )

}