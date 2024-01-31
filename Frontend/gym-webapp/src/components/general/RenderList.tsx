import { ReactNode } from 'react'
import {Link} from 'react-router-dom'
import { ListItem } from '../../utils/ListItem'

export default function renderList(headers: Array<string>, items: Array<ListItem>) {
    const renderCrudButtons = (id: number): ReactNode => {
        return(
            <td className='btns-crud'>
                <Link className='mx-1' to={id.toString()}>
                    <button className='btn btn-primary'>Zobacz</button>
                </Link>
                <Link className='mx-1' to={id + "/edit"}>
                    <button className='btn btn-primary'>Edytuj</button>
                </Link>
                <Link className='mx-1' to="delete">
                    <button className='btn btn-primary'>Usuń</button>
                </Link>
            </td>)}

    const renderHeaders = (headers: Array<string>): ReactNode => {
        return headers.map(header => <th>{header}</th>)}
    

    function renderListItems(items: Array<ListItem>) {
        if (items){
            return items.map(item => <tr id={`${item.id}`}>{item.content.map(cell => <td>{cell}</td>)}{renderCrudButtons(item.id)}</tr>)
        }
        return <tr id='1'>Brak danych do wyświetlenia</tr>
    }
    
    return (
    <div className='container p-3'>
        <Link to="create">
            <button className='btn btn-primary'>Utwórz</button>
        </Link>
        <table className='table table-bordered border mt-5'>
            <thead className='table-dark'>
                <tr>
                    {renderHeaders([...headers, "Akcje"])}
                </tr>
            </thead>
            <tbody>
                {renderListItems(items)}
            </tbody>
        </table>
    </div>)
}