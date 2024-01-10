import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    render() {
        return (
            <nav>
                <ul className='side-menu'>
                    <li>
                        <Link to='users'>Użytkownicy</Link>
                    </li>
                    <li>
                        <Link to='posts'>Posty</Link>
                    </li>
                    <li>
                        <Link to='banners'>Banery</Link>
                    </li>
                    <li>
                        <Link to='locations'>Lokacje</Link>
                    </li>
                    <li>
                        <Link to='offers'>Oferty</Link>
                    </li>
                    <li>
                        <Link to='opinions'>Opinie</Link>
                    </li>
                    <li>
                        <Link to='trainers'>Trenerzy</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
