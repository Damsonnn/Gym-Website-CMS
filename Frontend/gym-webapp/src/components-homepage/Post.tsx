import { Link } from "react-router-dom"

export default function PostComponent(props: {id: number, title: string, category: string, author: string}) {
  return (
    <div className="container border rounded m-3 p-2">
        <div className="border-bottom p-2">
            <h5>{props.title}</h5>
        </div>
        <div className='row p-2'>
            <div className="col">
                {props.category}
            </div>
            <div className="col">
                Autor: {props.author}
            </div>
            <div className="col">
                <Link to={`/posts/${props.id}`}>Czytaj dalej...</Link>
            </div>
        </div>
    </div>
  )
}
