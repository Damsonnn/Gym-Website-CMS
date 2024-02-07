import profile_picture from '../assets/images/profile_picture.jpg'
import { Link } from 'react-router-dom'

export default function TrainerComponent(props: {name: string, id:number}) {
  return (
    <Link  className='trainer-container rounded border m-3' to={`/trainers/${props.id}`}>
        <img className='profile-image border-bottom' src={profile_picture} alt="Brak zdjęcia" />
        <div className='text-center'>{props.name}</div>
    </Link>
  )
}
 