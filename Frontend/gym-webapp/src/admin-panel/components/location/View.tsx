import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { createObject, editObject, getOneObject } from '../../../utils/ApiRequests';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import ActionAlert, { AlertType, AlertData } from '../../../utils/ActionAlert';

type LocationDto = {
    city: string
    address: string
    phoneNumber: string
    email: string
}

const ENDPOINT = "locations"

export default function LocationView(props: { action: CrudAction }) {
    const [alert, setAlert] = useState<AlertData | null>();
    const action = props.action
    const navigate = useNavigate();
    const { id } = useParams();

    const schema = yup.object().shape({
        city: yup.string().required().min(3).max(100),
        address: yup.string().required().min(3).max(300),
        phoneNumber: yup.string().required().min(3).max(20),
        email: yup.string().required().email().max(50)
    })

    const { register, handleSubmit, formState: { errors, submitCount, isValid }, reset } = useForm<LocationDto>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: LocationDto) => {
        if (action === CrudAction.Create) createObject(data, ENDPOINT, navigate, setAlert);
        else if (id) editObject(data, id, ENDPOINT, setAlert)
    };

    useEffect(() => {
        if (action !== CrudAction.Create) getOneObject(id, ENDPOINT, reset);
    }, []);

    useEffect(() => {
        if (submitCount > 0 && !isValid) setAlert({
            type: AlertType.Danger,
            title: "Form error",
            message: "Please correct all errors in the form"
        });
    }, [submitCount]);

    return (
        <div className="container border rounded p-4 mt-4">
            {alert ? <ActionAlert data={alert} /> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='form-group col'>
                        <label htmlFor="city">City:</label>
                        <input type="text" className={`form-control ${errors.city ? "input-invalid" : null}`} {...register("city")} placeholder='City' disabled={action === CrudAction.View} />
                        <p className="text-danger">{errors.city?.message}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group col'>
                        <label htmlFor="address">Address:</label>
                        <input type="text" className={`form-control ${errors.address ? "input-invalid" : null}`} {...register("address")} placeholder='Street' disabled={action === CrudAction.View} />
                        <p className="text-danger">{errors.address?.message}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group col'>
                        <label htmlFor="phoneNumber">Phone number:</label>
                        <input type="text" className={`form-control ${errors.phoneNumber ? "input-invalid" : null}`} {...register("phoneNumber")} placeholder='123123123' disabled={action === CrudAction.View} />
                        <p className="text-danger">{errors.phoneNumber?.message}</p>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="emial">E-mail:</label>
                        <input type="email" className={`form-control ${errors.email ? "input-invalid" : null}`} {...register("email")} placeholder='E-mail' disabled={action === CrudAction.View} />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>
                </div>
                {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
                {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
            </form>
        </div>
    )
}
