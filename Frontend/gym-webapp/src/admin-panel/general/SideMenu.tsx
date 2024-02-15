import { Link } from 'react-router-dom'

const ADMIN_BOOKMARKS: string[][] = [
    ["users", "Users"],
    ["locations", "Locations"],
    ["offers", "Offers"]
];
const USER_BOOKMARKS: string[][] = [
    ["posts", "Posts"],
    ["banners", "Banners"],
    ["opinions", "Opinions"],
    ["trainers", "Trainers"],
    ["categories", "Categories"]
];

export default function SideMenu() {
    const createLinks = (bookmarks: string[][]) => {
        return bookmarks.map(([endpoint, name]) => {
            return <Link className="list-group-item list-group-item-action" to={endpoint}>{name}</Link>
        })
    }
    
    return (
        <div className='list-group border'>
            {sessionStorage.getItem("role") === "ADMIN" ? (<div>
                {createLinks(ADMIN_BOOKMARKS)}
            </div>) : null}
            {createLinks(USER_BOOKMARKS)}
        </div>
    )
}
