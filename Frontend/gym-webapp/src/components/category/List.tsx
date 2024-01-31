import React, { Component, useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import axios from 'axios';

export type Category = {
    id: number
    name: string
    active: boolean
}

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    'Content-Type': 'application/json', }
};

export default function ListCategories() {
    const [categories, setCategories] = useState<Array<Category>>([]);

    const getCategories = async () => {
        await axios.get("http://localhost:8080/api/categories", config).then(response =>{
            console.log(response)
            if (response.status === 200) {
                setCategories(response.data)
                return response.data
            }
            else {
                return null
            }
        })
    }
    useEffect(() => {
        getCategories()
    },[])
    
    const mapCategories = (categories: Array<Category>) => {
        if (categories) {
            const mappedCategories = categories.map(category => {
                return {id: category.id, content: [category.name, category.active ? "Tak" : "Nie"]}
            })
            return mappedCategories;
        }
        return []
    }

    return (
        renderList(["Tytuł", "Aktywny"], mapCategories(categories))
    )
}