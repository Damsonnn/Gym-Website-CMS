import { Route, Routes } from 'react-router'
import '../assets/stylesheets/Homepage.css'
import Homepage from './Homepage'
import Posts from './Posts'
import Offers from './Offers'
import Contact from './Contact'
import { Link } from 'react-router-dom'

export default function GymSite() {
  return (
    <div className='homepage-container'>
        <nav className='navbar navbar-dark navbar-default bg-dark navbar-fixed-top'>
            <div className="navbar-header mx-3">
            <Link className='navbar-brand' to='/'>GymApp</Link>
            </div>
            <ul className='nav navbar-nav'>
              <li className='nav-item mx-3'>
                <Link className='nav-link' to='/posts'>Artykuły</Link>
              </li>
              <li className='nav-item mx-3'>
                <Link className='nav-link' to='/offers'>Oferta</Link>
              </li>
              <li className='nav-item mx-3'>
                <Link className='nav-link' to='/contact'>Kontakt</Link>
              </li>
            </ul>
        </nav>
        <Routes>
          <Route index={true} element={<Homepage/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
    </div>
  )
}
