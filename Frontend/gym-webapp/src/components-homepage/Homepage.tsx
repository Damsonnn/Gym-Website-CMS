import { Link } from "react-router-dom";
import BannerComponent from "./Banner";
import Opinions from "./Opinions";
import PopularPosts from "./PopularPosts";
import Trainers from "./Trainers";

export default function Homepage() {
  return (
    <div>
      <BannerComponent/>
      <div className="homepage-content d-flex flex-column">
        <h2 className="p-3 text-center">Nasi trenerzy:</h2>
        <Trainers/>
        <h2 className="p-3 text-center">Popularne posty:</h2>
        <PopularPosts/>
        <h2 className="p-3 text-center">Opinie naszych klientów:</h2> 
        <Opinions/>
        <h2 className="p-3 text-center">Przejdź do naszej <Link to="offers">oferty</Link></h2> 
      </div>    
      <nav className='navbar navbar-dark navbar-default bg-dark navbar-fixed-top mt-3'>
        <div className="navbar-header mx-3">
            <div className='navbar-brand'>Damian Ćwikliński</div>
        </div>
      </nav> 
      
    </div>
  )
}
