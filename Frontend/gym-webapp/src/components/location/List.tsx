import React, { Component, useState } from 'react'
import renderList from "../../utils/RenderList"
import { ListItem } from '../../utils/ListItem'

type Location = {
    id: number
    city: string
    address: string
}

export default function ListLocations() {
    const getLocations = () => {
        const postsTest = [{id:1, city: "miasto 1", address: "adres 1"},
            {id:2, city: "miasto 2", address: "adres 2"},
            {id:3, city: "miasto 3", address: "adres 3"}]
        return postsTest
    }
    const [locations, setLocations] = useState(getLocations());
    const mapLocations = (locations: Array<Location>) => locations.map(location => {return {id: location.id, content: [location.city, location.address]}})

    return (
        renderList(["Miasto", "Adres"], mapLocations(locations))
    )

}