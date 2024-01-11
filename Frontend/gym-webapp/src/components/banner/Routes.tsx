import React from 'react'
import { Routes, Route } from 'react-router'
import { CrudAction } from '../../utils/CrudAction'
import BannerView from './View'
import ListBanners from './List'

export default function BannerRoutes() {
  return (
    <Routes>
        <Route path='/test' element={<ListBanners />}/>
        <Route path='view/:id' element={<BannerView action = {CrudAction.View}/>}/>
        <Route path='edit/:id' element={<BannerView action = {CrudAction.Edit} />}/>
        <Route path='create' element={<BannerView action = {CrudAction.Create}/>}/>
    </Routes>
  )
}
