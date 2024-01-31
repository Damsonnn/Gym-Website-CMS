import React, { Component, useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import axios from 'axios';

type Location = {
    id: number
    city: string
    address: string
    phoneNumber: string
    email: number 
}

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    'Content-Type': 'application/json', }
};

export default function ListLocations() {
    const [locations, setLocations] = useState<Array<Location>>([]);

    const getLocations = async () => {
        await axios.get("http://localhost:8080/api/locations", config).then(response =>{
            console.log(response)
            if (response.status === 200) {
                setLocations(response.data)
                return response.data
            }
            else {
                return null
            }
        })
    }
    useEffect(() => {
        getLocations()
    },[])
    
    const mapLocations = (locations: Array<Location>) => {
        if (locations) {
            const mappedLocations = locations.map(location => {
                return {id: location.id, content: [location.city, location.address]}
            })
            return mappedLocations;
        }
        return []
    }

    return (
        renderList(["Miasto", "Adres"], mapLocations(locations), "locations")
    )

}