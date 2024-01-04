import React, { Component } from 'react'
import { Route, Router, Routes } from 'react-router'
import Posts from './Posts'
import Banners from './Banners'

export default function Pages() {
    return (
        <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/banners" element={<Banners />} />
        </Routes>
    )
}
