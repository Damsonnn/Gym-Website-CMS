import { useState, useEffect, ChangeEvent } from "react"
import { Location } from "../admin-panel/components/location/List"
import { getAllObjectsNoToken } from "../utils/ApiRequests"
import axios from "axios";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

type ContactFormDto = {
    senderName: string
    senderEmail: string
    sendTo: string
    message: string
    subject: string
}

export default function Contact() {
    const [locations, setLocations] = useState<Array<Location>>([]);
    const [chosenLocation, setChosenLocation] = useState<Location>({
        id: 1,
        city: "-",
        address: "-",
        phoneNumber: "-",
        email: "-"
    })
    const schema = yup.object().shape({
        senderName: yup.string().required(),
        senderEmail: yup.string().required().email(),
        sendTo: yup.string().required(),
        message: yup.string().required(),
        subject: yup.string().required()
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormDto>({
        resolver: yupResolver(schema),
    });

    const mapLocations = () => {
        if (locations.length === 0) {
            return <option value="0">No locations to choose from</option>;
        }
        let index = -1;
        return locations.map(location => {
            index++;
            return <option key={index} value={index}>{location.city}, {location.address}</option>
        })
    }

    const onSubmit = async (data: ContactFormDto) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/email/contact`, data);

            if (response.status === 200) {
                reset();
            } else {
                console.error('Could not send email');
            }
        } catch (error) {
            console.error('Error during sending email:', error);
        }
    }

    const handleSelectChange = (event: ChangeEvent<any>) => {
        setChosenLocation(locations[event.target.value])
    }

    useEffect(() => {
        getAllObjectsNoToken("locations", setLocations);
    }, [])

    useEffect(() => {
        if (locations.length > 0) {
            setChosenLocation(locations[0]);
        }
    }, [locations]);

    useEffect(() => {
        reset({ ...schema, sendTo: chosenLocation.email });
    }, [chosenLocation])

    return (
        <div className="contact-container">
            <div className="border rounded m-4 p-3">
                <label htmlFor="chosenLocation">Choose location:</label>
                <select className="form-select" name="chosenLocation" id="chosenLocation" onChange={handleSelectChange}>
                    {mapLocations()}
                </select>
                <div className="border rounded p-3 mt-2">
                    <div className="border-bottom pb-1"><h6>City:</h6> {chosenLocation.city}</div>
                    <div className="border-bottom pb-1"><h6>Street:</h6> {chosenLocation.address}</div>
                    <div className="border-bottom pb-1"><h6>Phone number:</h6> {chosenLocation.phoneNumber}</div>
                    <div className="border-bottom pb-1"><h6>E-mail:</h6> {chosenLocation.email}</div>
                </div>
                <h6 className="m-2">Contact form:</h6>
                <div className="mx-2">(Message will be send to chosen location)</div>
                <form className="contact-form border rounded mt-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row p-2">
                        <div className='form-group col'>
                            <label htmlFor="senderName">Name:</label>
                            <input type='text' className={`form-control ${errors.senderName ? "input-invalid" : null}`} {...register("senderName")} placeholder='Your name'/>
                            <p className="text-danger">{errors.senderName?.message}</p>
                        </div>
                        <div className='form-group col'>
                            <label htmlFor="senderEmail">Your E-mail:</label>
                            <input type='email' className={`form-control ${errors.senderEmail ? "input-invalid" : null}`} {...register("senderEmail")} placeholder='Your email'/>
                            <p className="text-danger">{errors.senderEmail?.message}</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className='form-group col'>
                            <label htmlFor="subject">Message title:</label>
                            <input type='text' className={`form-control ${errors.subject ? "input-invalid" : null}`} {...register("subject")} placeholder='Title'/>
                            <p className="text-danger">{errors.subject?.message}</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className='form-group col'>
                            <label htmlFor="message">Message:</label>
                            <textarea rows={8} className={`form-control ${errors.message ? "input-invalid" : null}`} {...register("message")} placeholder='Your message...'/>
                            <p className="text-danger">{errors.message?.message}</p>
                        </div>
                    </div>
                    <input type="submit" value="Send message" className='btn btn-primary m-2' />
                </form>
            </div>
        </div>
    )
}
