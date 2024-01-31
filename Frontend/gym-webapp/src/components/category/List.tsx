import {  useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests';

export type Category = {
    id: number
    name: string
    active: boolean
}

export default function ListCategories() {
    const [categories, setCategories] = useState<Array<Category>>([]);

    const getCategories = () => {
        getAllObjects("categories", setCategories);
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
        renderList(["Tytuł", "Aktywny"], mapCategories(categories), "categories")
    )
}