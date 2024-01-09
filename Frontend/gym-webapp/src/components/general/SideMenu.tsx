import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    render() {
        return (
            <nav>
                <ul className='side-menu'>
                    <li>
                        <Link to='posts'>Posty</Link>
                    </li>
                    <li>
                        <Link to='banners'>Banery</Link>
                    </li>
                    <li>
                        <Link to=''>Test3</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
