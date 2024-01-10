import { ReactNode } from 'react'
import {Link} from 'react-router-dom'

export default function renderList(headers: Array<string>, items: Array<Array<string>>) {
    const buttons = <td className='crud-buttons'>
        <Link to="view">Zobacz</Link>
        <Link to="edit">Edytuj</Link>
        <Link to="delete">Usuń</Link>
    </td>

    const renderHeaders = (headers: Array<string>): ReactNode => {
        return headers.map(header => <th>{header}</th>)}
    

    function renderListItems(items: Array<Array<string>>) {
        return items.map(item => <tr>{item.map(cell => <td>{cell}</td>)}{buttons}</tr>)
    }
    
    return (
    <table>
        <thead>
            <tr>
                {renderHeaders(headers)}
            </tr>
        </thead>
        <tbody>
            {renderListItems(items)}
        </tbody>
    </table>)
}