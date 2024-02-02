import { useState, useEffect } from 'react'
import renderList from "../general/RenderList"
import { getAllObjects } from '../../utils/ApiRequests';

export type Banner = {
    id: number
    title: string
    body: string
    active: boolean
}

export default function ListBanners() {
    const [banners, setBanners] = useState<Array<Banner>>([]);

    const getBanners = () => {
        getAllObjects("banners", setBanners);
    }
    
    const mapBanners = (banners: Array<Banner>) => {
        if (banners.length === 0) {
            return [];
        }
        return banners.map(banner => {
            return {id: banner.id, content: [banner.title, banner.active ? "Tak" : "Nie"]}
        })
    }

    useEffect(() => {
        getBanners()
    },[])

    return (
        renderList(["Tytuł", "Aktywny"], mapBanners(banners), "banners")
    )

}
