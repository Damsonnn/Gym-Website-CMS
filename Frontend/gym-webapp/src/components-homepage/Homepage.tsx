import BannerComponent from "./Banner";
import Trainers from "./Trainers";

export default function Homepage() {
  return (
    <div>
      <BannerComponent/>
      <div className="homepage-content d-flex flex-column">
        <h2 className="p-3 text-center">Nasi trenerzy:</h2>
        <Trainers/>
        <h2 className="p-3 text-center">Popularne posty</h2>
      </div>
    </div>
  )
}
