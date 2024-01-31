import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import BannerView from './View'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'

type Banner = {
    id: number
    title: string
    body: string
    active: boolean
}

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    'Content-Type': 'application/json', }
};

export default function ListBanners() {
    const [banners, setBanners] = useState<Array<Banner>>([]);

    const getBanners = async () => {
        await axios.get("http://localhost:8080/api/banners", config).then(response =>{
            console.log(response)
            if (response.status === 200) {
                setBanners(response.data)
                return response.data
            }
            else {
                return null
            }
        })
    }
    useEffect(() => {
        getBanners()
    },[])
    
    const mapBanners = (banners: Array<Banner>) => {
        if (banners) {
            const mappedBanners = banners.map(banner => {
                return {id: banner.id, content: [banner.title, banner.active ? "Tak" : "Nie"]}
            })
            return mappedBanners;
        }
        return []
    }

    return (
        renderList(["Tytuł", "Aktywny"], mapBanners(banners))
    )

}
