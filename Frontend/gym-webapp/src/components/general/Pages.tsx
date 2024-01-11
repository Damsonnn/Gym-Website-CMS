import React, { useState, Component } from 'react'
import { Route, Routes } from 'react-router'
import ListPosts from '../post/List'
import ListBanners from '../banner/List'
import ListLocations from '../location/List'
import SideMenu from './SideMenu'
import ListUsers from '../user/List'
import ListOffers from '../offer/List'
import ListOpinions from '../opinion/List'
import ListTrainers from '../trainer/List'
import ListCategories from '../category/List'

export default function Pages() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <header>
                <div className='hamburger' onClick={() => setShowMenu(!showMenu)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>
            <div className='content'>
                {showMenu ? <SideMenu /> : null}
                <Routes>
                    <Route path="users" element={<ListUsers />} />
                    <Route path="posts" element={<ListPosts />} />
                    <Route path="banners" element={<ListBanners />} />
                    <Route path="locations" element={<ListLocations />} />
                    <Route path="offers" element={<ListOffers />} />
                    <Route path="opinions" element={<ListOpinions />} />
                    <Route path="trainers" element={<ListTrainers />} />
                    <Route path="categories" element={<ListCategories />} />
                </Routes>
            </div>
        </div>
    )
}
