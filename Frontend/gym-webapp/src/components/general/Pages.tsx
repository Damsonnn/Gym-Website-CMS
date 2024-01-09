import React, { useState, Component } from 'react'
import { Route, Routes } from 'react-router'
import Posts from '../post/List'
import Banners from '../banner/List'
import SideMenu from './SideMenu'

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
                    <Route path="posts" element={<Posts />} />
                    <Route path="banners" element={<Banners />} />
                </Routes>
            </div>
        </div>
    )
}
