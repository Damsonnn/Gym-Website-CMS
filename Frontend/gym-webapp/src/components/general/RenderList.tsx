import { ReactNode } from 'react'
import {Link} from 'react-router-dom'
import { ListItem } from '../../utils/ListItem'
import { deleteObject } from '../../utils/ApiRequests'


export default function renderList(headers: Array<string>, items: Array<ListItem>, endpoint:string) {
    const handleDelete = (id: number) => {
        deleteObject(endpoint, id);
    }

    const renderCrudButtons = (id: number): ReactNode => {
        return(
            <td className='btns-crud'>
                <Link className='mx-1' to={id.toString()}>
                    <button className='btn btn-primary'>Zobacz</button>
                </Link>
                <Link className='mx-1' to={id + "/edit"}>
                    <button className='btn btn-primary'>Edytuj</button>
                </Link>
                <Link className='mx-1' to={""}>
                    <button className='btn btn-primary' onClick={() => handleDelete(id)}>Usuń</button>
                </Link>
            </td>)}

    const renderHeaders = (headers: Array<string>): ReactNode => {
        return headers.map(header => <th key={header}>{header}</th>)}
    

    function renderListItems(items: Array<ListItem>) {
        if (items.length != 0){
            return items.map(item => <tr key={`${item.id}`}>{item.content.map(cell => <td key={`${item.id}${cell}`}>{cell}</td>)}{renderCrudButtons(item.id)}</tr>)
        }
        return <tr key='1'>Brak danych do wyświetlenia</tr>
    }
    
    return (
    <div className='container p-3'>
        <Link to="create">
            <button className='btn btn-primary'>Utwórz</button>
        </Link>
        <table className='table table-bordered border mt-5'>
            <thead className='table-dark'>
                <tr key="0">
                    {renderHeaders([...headers, "Akcje"])}
                </tr>
            </thead>
            <tbody>
                {renderListItems(items)}
            </tbody>
        </table>
    </div>)
}