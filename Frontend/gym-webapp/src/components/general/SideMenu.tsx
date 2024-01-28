import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    render() {
        return (
            <div className='list-group border'>
                <Link className="list-group-item list-group-item-action" to='users'>Użytkownicy</Link>
                <Link className="list-group-item list-group-item-action" to='posts'>Posty</Link>
                <Link className="list-group-item list-group-item-action" to='banners'>Banery</Link>
                <Link className="list-group-item list-group-item-action" to='locations'>Lokacje</Link>
                <Link className="list-group-item list-group-item-action" to='offers'>Oferty</Link>
                <Link className="list-group-item list-group-item-action" to='opinions'>Opinie</Link>
                <Link className="list-group-item list-group-item-action" to='trainers'>Trenerzy</Link>
                <Link className="list-group-item list-group-item-action" to='categories'>Kategorie</Link>
            </div>
        )
    }
}
