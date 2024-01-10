import React, { Component, useState } from 'react'
import renderList from "../../utils/RenderList"

type Location = {
    city: string
    address: string
}

export default function ListLocations() {
    const getLocations = () => {
        const postsTest = [{city: "miasto 1", address: "adres 1"},
            {city: "miasto 2", address: "adres 2"},
            {city: "miasto 3", address: "adres 3"}]
        return postsTest
    }
    const [locations, setLocations] = useState(getLocations());
    const mapLocations = (locations: Array<Location>) => locations.map(location => [location.city, location.address])

    return (
        renderList(["Miasto", "Adres"], mapLocations(locations))
    )

}