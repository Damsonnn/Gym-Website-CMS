import {  useState, useEffect } from 'react'
import renderList from "../../general/RenderList"
import { getAllObjects } from '../../../utils/ApiRequests';

export type Category = {
    id: number
    name: string
    active: boolean
}

export default function ListCategories() {
    const [categories, setCategories] = useState<Array<Category>>([]);
    
    const mapCategories = (categories: Array<Category>) => {
        if (categories.length === 0) {
            return [];
        }
        return categories.map(category => {
            return {id: category.id, content: [category.name]}
        })
    }

    useEffect(() => {
        getAllObjects("categories", setCategories);
    },[])

    return (
        renderList(["Name"], mapCategories(categories), "categories")
    )
}