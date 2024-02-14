import { Link } from 'react-router-dom'

export default function SideMenu() {
    const adminBookmarks: string[][] = [
        ["users", "Users"],
        ["locations", "Locations"],
        ["offers", "Offers"]
    ];
    const userBookmarks: string[][] = [
        ["posts", "Posts"],
        ["banners", "Banners"],
        ["opinions", "Opinions"],
        ["trainers", "Trainers"],
        ["categories", "Categories"]
    ];

    const createLinks = (bookmarks: string[][]) => {
        return bookmarks.map(([endpoint, name]) => {
            return <Link className="list-group-item list-group-item-action" to={endpoint}>{name}</Link>
        })
    }
    
    return (
        <div className='list-group border'>
            {sessionStorage.getItem("role") === "ADMIN" ? (<div>
                {createLinks(adminBookmarks)}
            </div>) : null}
            {createLinks(userBookmarks)}
        </div>
    )
}
