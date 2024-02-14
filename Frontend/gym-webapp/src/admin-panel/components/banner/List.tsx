import { useState, useEffect } from 'react'
import renderList from "../../general/RenderList"
import { getAllObjects } from '../../../utils/ApiRequests';

export type Banner = {
    id: number
    title: string
    body: string
    active: boolean
}

export default function ListBanners() {
    const [banners, setBanners] = useState<Array<Banner>>([]);
    
    const mapBanners = (banners: Array<Banner>) => {
        if (banners.length === 0) {
            return [];
        }
        return banners.map(banner => {
            return {id: banner.id, content: [banner.title, banner.active ? "Yes" : "No"]}
        })
    }

    useEffect(() => {
        getAllObjects("banners", setBanners);
    },[])

    return (
        renderList(["Title", "Active"], mapBanners(banners), "banners")
    )

}
