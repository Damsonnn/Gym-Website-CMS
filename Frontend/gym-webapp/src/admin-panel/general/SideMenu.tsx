import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    render() {
        return (
            <div className='list-group border'>
                {sessionStorage.getItem("role") === "ADMIN" ? (<div>
                    <Link className="list-group-item list-group-item-action" to='users'>Users</Link>
                    <Link className="list-group-item list-group-item-action" to='locations'>Locations</Link>
                    <Link className="list-group-item list-group-item-action" to='offers'>Offers</Link>
                </div>) : null}
                <Link className="list-group-item list-group-item-action" to='posts'>Posts</Link>
                <Link className="list-group-item list-group-item-action" to='banners'>Banners</Link>
                <Link className="list-group-item list-group-item-action" to='opinions'>Opinions</Link>
                <Link className="list-group-item list-group-item-action" to='trainers'>Trainers</Link>
                <Link className="list-group-item list-group-item-action" to='categories'>Categories</Link>
            </div>
        )
    }
}
