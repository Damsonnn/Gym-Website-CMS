import { ReactNode } from 'react'
import {Link} from 'react-router-dom'
import { ListItem } from './ListItem'

export default function renderList(headers: Array<string>, items: Array<ListItem>) {
    const renderCrudButtons = (id: number): ReactNode => {
        return(
            <td className='crud-buttons'>
                <Link to={"view/" + id}>Zobacz</Link>
                <Link to={"edit/" + id}>Edytuj</Link>
                <Link to="delete">Usuń</Link>
            </td>)}

    const renderHeaders = (headers: Array<string>): ReactNode => {
        return headers.map(header => <th>{header}</th>)}
    

    function renderListItems(items: Array<ListItem>) {
        return items.map(item => <tr>{item.content.map(cell => <td>{cell}</td>)}{renderCrudButtons(item.id)}</tr>)
    }
    
    return (
    <div className='list-container'>
        <Link to="create">
            <button className='create-button'>Utwórz</button>
        </Link>
        <table>
            <thead>
                <tr>
                    {renderHeaders(headers)}
                </tr>
            </thead>
            <tbody>
                {renderListItems(items)}
            </tbody>
        </table>
    </div>)
}