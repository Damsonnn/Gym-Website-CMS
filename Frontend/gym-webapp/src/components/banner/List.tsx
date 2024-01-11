import { useState } from 'react'
import renderList from "../general/RenderList"
import BannerView from './View'
import {Routes, Route} from 'react-router-dom'

type Banner = {
    id: number
    title: string
    active: boolean
}

export default function ListBanners() {
    const getBanners = () => {
        const postsTest = [{id:1, title: "tytul 1", active: true},
            {id:2, title: "tytul 2", active: false},
            {id:3, title: "tytul 3", active: true}]
        return postsTest
    }
    const [banners, setbanners] = useState(getBanners());
    const mapBanners = (banners: Array<Banner>) => banners.map(banner => {
        return {id: banner.id, content: [banner.title, banner.active ? "Tak" : "Nie"]}
    })

    return (
        renderList(["Tytuł", "Aktywny"], mapBanners(banners))
    )

}
