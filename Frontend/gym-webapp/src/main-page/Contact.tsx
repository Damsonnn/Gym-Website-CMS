import { useState, useEffect, ChangeEvent } from "react"
import { Location } from "../admin-panel/components/location/List"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import { refreshInput } from "../utils/Handlers";
import axios from "axios";
import { config } from "../utils/JWTConfig";
import { FormEvent } from "react";

type ContactFormDto = {
    senderName: string
    senderEmail: string
    sendTo: string
    message: string 
    subject: string
}

export default function Contact() {
    const [locations, setLocations] = useState<Array<Location>>([]);
    const [emailMessage, setEmailMessage] = useState<ContactFormDto>({
        senderName: "",
        senderEmail: "",
        sendTo: "",
        message: "", 
        subject: ""
    })
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
            return  <option value="0">No locations to choose from</option>;
        }
        let index = -1;
        return locations.map(location => {
            index++;
            return <option value={index}>{location.city}, {location.address}</option>
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(chosenLocation);
        console.log(emailMessage);
        try {
            const response = await axios.post(`http://localhost:8080/api/email/contact`, emailMessage);

            if (response.status === 200) {
                console.log('Succesfully sent mail');
                setEmailMessage({
                    senderName: "",
                    senderEmail: "",
                    sendTo: "",
                    message: "", 
                    subject: ""
                })
            } else {
                console.error('Could not send email');
                console.log(response)
            }
        } catch (error) {
            console.error('Error during sending email:', error);     
        }
    }

    const handleSelectChange = (event: ChangeEvent<any>) => {
        setChosenLocation(locations[event.target.value])      
    }

    const handleInputChange = (event: ChangeEvent<any>) => {
        refreshInput(event, emailMessage, setEmailMessage);   
    }

    useEffect(() => {
        getLocations();
    },[])

    useEffect(() => {
        if (locations.length > 0){
            setChosenLocation(locations[0]);
        }    
    },[locations]);

    useEffect(() => {
        setEmailMessage({...emailMessage, sendTo: chosenLocation.email});
    }, [chosenLocation])

    return (
        <div className="contact-container">
            <div className="border rounded m-4 p-3">
                <label htmlFor="chosenLocation">Choose location:</label>
                <select className="form-select" name="chosenLocation" id="chosenLocation" onChange={handleSelectChange}>
                {mapLocations()}
                </select>
                <div className="border rounded p-3 mt-2">
                    <p className="border-bottom pb-1"><h6>City:</h6> {chosenLocation.city}</p>
                    <p className="border-bottom pb-1"><h6>Street:</h6> {chosenLocation.address}</p>
                    <p className="border-bottom pb-1"><h6>Phone number:</h6> {chosenLocation.phoneNumber}</p>
                    <p className="border-bottom pb-1"><h6>E-mail:</h6> {chosenLocation.email}</p>
                </div>
                <h6 className="m-2">Contact form:</h6>
                <div className="mx-2">(Message will be send to chosen location)</div>
                <form className="contact-form border rounded mt-2" onSubmit={handleSubmit}>
                    <div className="row p-2">
                        <div className='form-group col'>
                            <label htmlFor="senderName">Name:</label>
                            <input type='text' name="senderName" id="senderName" className='form-control' placeholder='Your name' value={emailMessage.senderName}  onChange={handleInputChange}/>
                        </div>
                        <div className='form-group col'>
                            <label htmlFor="senderEmail">Your E-mail:</label>
                            <input type='email' name="senderEmail" id="senderEmail" className='form-control' placeholder='Your email' value={emailMessage.senderEmail} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className='form-group col'>
                            <label htmlFor="subject">Message title:</label>
                            <input type='text' name="subject" id="subject" className='form-control' placeholder='Title' value={emailMessage.subject}  onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className='form-group col'>
                            <label htmlFor="message">Message:</label>
                            <textarea rows={8} name="message" id="message" className='form-control' placeholder='Your message...' value={emailMessage.message}  onChange={handleInputChange}/>
                        </div>
                    </div>
                    <input type="submit" value="Send message" className='btn btn-primary m-2' />
                </form>
            </div>   
        </div>
    )
}