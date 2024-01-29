import React, { useState, Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPosts from '../post/List'
import ListBanners from '../banner/List'
import ListLocations from '../location/List'
import SideMenu from './SideMenu'
import ListUsers from '../user/List'
import ListOffers from '../offer/List'
import ListOpinions from '../opinion/List'
import ListTrainers from '../trainer/List'
import ListCategories from '../category/List'
import { CrudAction } from '../../utils/CrudAction'
import BannerView from '../banner/View'
import UserView from '../user/View'
import PostView from '../post/View'
import LocationView from '../location/View'
import OfferView from '../offer/View'
import OpinionView from '../opinion/View'
import TrainerView from '../trainer/View'
import CategoryView from '../category/View'

export default function Pages() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <nav className='navbar navbar-dark bg-dark'>
                <button className='nabar-toggler border rounded p-1 mx-3' onClick={() => setShowMenu(!showMenu)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <button className='btn btn-primary mx-3'>Wyloguj</button>
            </nav>
            <div>
                <div className='row w-100'>
                    <div className='col-2'>
                        {showMenu ? <SideMenu /> : null}
                    </div>
                    <div className='col-10'>
                        <Routes>
                            <Route path="users">
                                <Route index={true} element={<ListUsers />}/>
                                <Route path=':id' element={<UserView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<UserView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<UserView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="posts">
                                <Route index={true} element={<ListPosts />}/>
                                <Route path=':id' element={<PostView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<PostView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<PostView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="banners">
                                <Route index={true} element={<ListBanners />}/>
                                <Route path=':id' element={<BannerView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<BannerView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<BannerView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="locations">
                                <Route index={true} element={<ListLocations />}/>
                                <Route path=':id' element={<LocationView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<LocationView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<LocationView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="offers">
                                <Route index={true} element={<ListOffers />}/>
                                <Route path=':id' element={<OfferView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<OfferView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<OfferView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="opinions">
                                <Route index={true} element={<ListOpinions />}/>
                                <Route path=':id' element={<OpinionView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<OpinionView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<OpinionView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="trainers">
                                <Route index={true} element={<ListTrainers />}/>
                                <Route path=':id' element={<TrainerView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<TrainerView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<TrainerView action = {CrudAction.Create}/>}/>
                            </Route>
                            <Route path="categories">
                                <Route index={true} element={<ListCategories />}/>
                                <Route path=':id' element={<CategoryView action = {CrudAction.View}/>}/>
                                <Route path=':id/edit' element={<CategoryView action = {CrudAction.Edit} />}/>
                                <Route path='create' element={<CategoryView action = {CrudAction.Create}/>}/>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}
