import { useState, useEffect, ChangeEvent } from "react"
import { Location } from "../components/location/List"
import { getAllObjects, getAllObjectsNoToken } from "../utils/ApiRequests"

export default function Contact() {
    const [locations, setLocations] = useState<Array<Location>>([]);
    const [chosenLocation, setChosenLocation] = useState<Location>({
        id:1,
        city: "-",
        address: "-",
        phoneNumber: "-",
        email: "-"
    })

    const getLocations = () => {
        getAllObjectsNoToken("locations", setLocations);
        // const tempLocations = []
        // tempLocations.push({
        //     id:1,
        //     city: "Gniezno",
        //     address: "ul. Rynek 1/1",
        //     phoneNumber: "123123123",
        //     email: "gniezno@gmail.com"
        // });
        // tempLocations.push({
        //     id:2,
        //     city: "Poznań",
        //     address: "ul. Warszawska 1/1",
        //     phoneNumber: "987987987",
        //     email: "poznan@gmail.com"
        // });
        // tempLocations.push({
        //     id:3,
        //     city: "Warszawa",
        //     address: "ul. Poznańska 1/1",
        //     phoneNumber: "666666666",
        //     email: "warszawa@gmail.com"
        // });
        // setLocations(tempLocations);
    }

    const mapLocations = () => {
        if (locations.length === 0) {
            return  <option value="0">Brak kategorii do wyboru</option>;
        }
        let index = -1;
        return locations.map(location => {
            index++;
            return <option value={index}>{location.city}, {location.address}</option>
        })
    }

    const handleSelectChange = (event: ChangeEvent<any>) => {
        setChosenLocation(locations[event.target.value])
    }

    useEffect(() => {
        getLocations();
    },[])

    useEffect(() => {
        if (locations.length > 0){
            setChosenLocation(locations[0]);
        }    
    },[locations]);

    return (
        <div className="contact-container">
            <div className="border rounded m-4 p-3">
                <label htmlFor="chosenLocation">Wybierz placówkę:</label>
                <select className="form-select" name="chosenLocation" id="chosenLocation" onChange={handleSelectChange}>
                {mapLocations()}
                </select>
                <div className="border rounded p-3 mt-2">
                    <p className="border-bottom pb-1"><h6>Miasto:</h6> {chosenLocation.city}</p>
                    <p className="border-bottom pb-1"><h6>Ulica:</h6> {chosenLocation.address}</p>
                    <p className="border-bottom pb-1"><h6>Numer telefonu:</h6> {chosenLocation.phoneNumber}</p>
                    <p className="border-bottom pb-1"><h6>E-mail:</h6> {chosenLocation.email}</p>
                </div>
            </div>   
        </div>
    )
}
