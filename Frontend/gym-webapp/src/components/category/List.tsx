import React, { Component, useState } from 'react'
import renderList from "../general/RenderList"

type Category = {
    id: number
    name: string
    active: boolean
}

export default function ListCategories() {
    const getCategories = () => {
        const postsTest = [{id:1, name: "nazwa 1", active: true},
            {id:2, name: "nazwa 2", active: false},
            {id:3, name: "nazwa 3", active: true}]
        return postsTest
    }
    const [categories, setCategories] = useState(getCategories());
    const mapCategories = (categories: Array<Category>) => categories.map(category => {
        return {id: category.id, content: [category.name, category.active ? "Tak" : "Nie"]}
    })

    return (
        renderList(["Tytuł", "Aktywny"], mapCategories(categories))
    )
}