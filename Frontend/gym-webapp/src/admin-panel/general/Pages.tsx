import { useState, useEffect, Component, ReactComponentElement, FunctionComponent } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ListPosts from '../components/post/List'
import ListBanners from '../components/banner/List'
import ListLocations from '../components/location/List'
import SideMenu from './SideMenu'
import ListUsers from '../components/user/List'
import ListOffers from '../components/offer/List'
import ListOpinions from '../components/opinion/List'
import ListTrainers from '../components/trainer/List'
import ListCategories from '../components/category/List'
import { CrudAction } from '../../utils/CrudAction'
import BannerView from '../components/banner/View'
import UserView from '../components/user/View'
import PostView from '../components/post/View'
import LocationView from '../components/location/View'
import OfferView from '../components/offer/View'
import OpinionView from '../components/opinion/View'
import TrainerView from '../components/trainer/View'
import CategoryView from '../components/category/View'

interface ViewProps {
    action: CrudAction
}

interface RouteParameters{
    endpoint: string
    List: FunctionComponent
    View: FunctionComponent<ViewProps>
}

const ROUTES: Array<RouteParameters> = [
    {endpoint: "users", List: ListUsers, View: UserView},
    {endpoint: "locations", List: ListLocations, View: LocationView},
    {endpoint: "offers", List: ListOffers, View: OfferView},
    {endpoint: "posts", List: ListPosts, View: PostView},
    {endpoint: "banners", List: ListBanners, View: BannerView},
    {endpoint: "opinions", List: ListOpinions, View: OpinionView},
    {endpoint: "trainers", List: ListTrainers, View: TrainerView},
    {endpoint: "categories", List: ListCategories, View: CategoryView}
]

export default function Pages() {
    const [showMenu, setShowMenu] = useState(true)
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        navigate("/login");
    }

    const createRoutes = () => {
        return ROUTES.map((route) => {
            return <Route path={route.endpoint}>
                <Route index={true} element={<route.List />}/>
                <Route path=':id' element={<route.View action = {CrudAction.View}/>}/>
                <Route path=':id/edit' element={<route.View action = {CrudAction.Edit} />}/>
                <Route path='create' element={<route.View action = {CrudAction.Create}/>}/>
            </Route>
        })
    }
    
    useEffect(() => {
        if (sessionStorage.getItem("token") === null){
            navigate("/login");
        }
    },[])  

    return (
        <div>
            <nav className='navbar navbar-dark bg-dark'>
                <button className='navbar-toggler border rounded p-1 mx-3' onClick={() => setShowMenu(!showMenu)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <button className='btn btn-primary mx-3' onClick={handleLogout}>Logout</button>
            </nav>
            <div>
                <div className='row w-100'>
                    <div className='col-2'>
                        {showMenu ? <SideMenu /> : null}
                    </div>
                    <div className='col-10'>
                        <Routes>
                            {createRoutes()}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}
