import { useState, useEffect } from "react";
import { getOneObjectNoToken } from "../utils/ApiRequests";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useParams } from "react-router";
import { Trainer } from "../components/trainer/List";
import profilePicture from "../assets/images/profile_picture.jpg"

export default function FullTrainer() {
    const [trainerData, setTrainerData] = useState<Trainer>({
        id: 0,
        firstName: "",
        lastName: "",
        age: 0,
        about: "",
        facebookLink: "",
        twitterLink: "",
        instagramLink: "",
        active: true
    });

    const { id } = useParams();

    const getTrainer = () => {
        getOneObjectNoToken(id, "trainers", setTrainerData);
    }

    const editorToHtml = () => {
        if (trainerData.about) {
            const rawBody = convertFromRaw(JSON.parse(trainerData.about))
            return stateToHTML(rawBody)
        }
        return "Brak tekstu"
    }

    useEffect(() => {
        getTrainer();
    }, []);

    return (
        <div className="offers-container">
            <div className="container border rounded m-3 p-2">
                <div className="personal-data-container border-bottom p-3">
                    <img src={profilePicture} alt="Brak zdjęcia" />
                    <div className="links p-3">
                        <h3>{trainerData.firstName} {trainerData.lastName}</h3>
                        <h5>Wiek: {trainerData.age}</h5>
                        <ul >
                            <li className="py-1">
                                Facebook: {trainerData.facebookLink ? <a href={trainerData.facebookLink}>[Kliknij]</a> : "Brak"}
                            </li>
                            <li className="py-1">
                                Twitter: {trainerData.twitterLink ? <a href={trainerData.twitterLink}>[Kliknij]</a> : "Brak"}
                            </li>
                            <li className="py-1">
                                Instagram: {trainerData.instagramLink ? <a href={trainerData.instagramLink}>[Kliknij]</a> : "Brak"}
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 className="pt-3 px-3">O mnie:</h3>
                <div className="px-3 pt-3 h5">
                    <p dangerouslySetInnerHTML={{ __html: editorToHtml() }} />
                </div>
            </div>
        </div>
    )
}