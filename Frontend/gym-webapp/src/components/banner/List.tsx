import React, { Component, useState } from 'react'
import renderList from "../../utils/RenderList"

type Banner = {
    title: string
    active: boolean
}

export default function ListBanners() {
    const getBanners = () => {
        const postsTest = [{title: "tytul 1", active: true},
            {title: "tytul 2", active: false},
            {title: "tytul 3", active: true}]
        return postsTest
    }
    const [banners, setbanners] = useState(getBanners());
    const mapBanners = (banners: Array<Banner>) => banners.map(banner => [banner.title, banner.active ? "Tak" : "Nie"])

    return (
        renderList(["Tytuł", "Aktywny"], mapBanners(banners))
    )

}
