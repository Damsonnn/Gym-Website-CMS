import { Trainer } from "../components/trainer/List"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { useState, useEffect } from "react"
import TrainerComponent from "./Trainer"

export default function Trainers() {
    const [trainers, setTrainers] = useState<Array<Trainer>>([]);

    const getTrainers = () => {
        getAllObjectsNoToken("trainers/active", setTrainers);
        // const tempTrainers = [];
        // tempTrainers.push({
        //     id: 1,
        //     firstName: "Damian",
        //     lastName: "Ćwikliński",
        //     age: 0,
        //     about: "",
        //     facebookLink: "",
        //     twitterLink: "",
        //     instagramLink: "",
        //     active: false
        // });
        // tempTrainers.push({
        //     id: 2,
        //     firstName: "Maciej",
        //     lastName: "Nowak",
        //     age: 0,
        //     about: "",
        //     facebookLink: "",
        //     twitterLink: "",
        //     instagramLink: "",
        //     active: false
        // });
        // tempTrainers.push({
        //     id: 3,
        //     firstName: "Tomasz",
        //     lastName: "Kowalski",
        //     age: 0,
        //     about: "",
        //     facebookLink: "",
        //     twitterLink: "",
        //     instagramLink: "",
        //     active: false
        // });
        //     tempTrainers.push({
        //     id: 4,
        //     firstName: "James",
        //     lastName: "Bond",
        //     age: 0,
        //     about: "",
        //     facebookLink: "",
        //     twitterLink: "",
        //     instagramLink: "",
        //     active: false
        // });
        // tempTrainers.push({
        //     id: 5,
        //     firstName: "Junji",
        //     lastName: "Ito",
        //     age: 0,
        //     about: "",
        //     facebookLink: "",
        //     twitterLink: "",
        //     instagramLink: "",
        //     active: false
        // });
        // setTrainers(tempTrainers);
    }

    const showTrainers = (trainers: Array<Trainer>) => {
        if (trainers.length > 0) {
            return trainers.map(trainer => {
                return <TrainerComponent key={trainer.id} id={trainer.id} name={trainer.firstName + " " + trainer.lastName}/>
            })
        }
        return <h2 className="mt-3 text-center">Brak trenerów do wczytania</h2>
    }

    useEffect(() => {
        getTrainers();
    }, []);

    return (
        <div className="trainers-container">
            {showTrainers(trainers)}
        </div>
    )
}
