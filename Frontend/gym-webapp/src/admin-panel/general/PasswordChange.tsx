import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import axios from "axios";
import ActionAlert, { AlertType, AlertData } from "../../utils/ActionAlert";
import { config } from "../../utils/JWTConfig";

type PasswordChangeDto = {
    oldPassword: string
    newPassword: string
}

type PasswordChangeForm = {
    oldPassword: string
    newPassword: string
    repeatPassword: string
}

export default function PasswordChange() {
    const [alert, setAlert] = useState<AlertData | null>();
    const schema = yup.object().shape({
        oldPassword: yup.string().required(),
        newPassword: yup.string().required(),
        repeatPassword: yup.string().required().oneOf([yup.ref("newPassword")], "Passwords does not match")
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordChangeForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: PasswordChangeForm) => {
        const dataToSend: PasswordChangeDto = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        } 
        await axios.put('http://localhost:8080/api/users/password-change', dataToSend, config).then(response => {
            if (response.status === 200) {
                setAlert({
                    type: AlertType.Success,
                    title: "Success",
                    message: "Password changed successfully"
                })
            }}).catch(error => {
                console.error('Error during login:', error);
                console.error('Error during creating:', error);
                if (error.response){
                    console.log(error)
                    setAlert({
                        type: AlertType.Danger,
                        title: "Password change failed",
                        message: "Do it again"
                    })
                } else{
                    setAlert({
                        type: AlertType.Danger,
                        title: "Something went wrong",
                        message: "We couldn't send or receive this request"
                    });
                }
            })
    }

    return (
        <div className='container p-5 login-container'>
            {alert ? <ActionAlert data={alert} /> : null}
            <div className='border rounded'>
                <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="oldPassword">Password:</label>
                    <input type="password" className={`form-control ${errors.oldPassword ? "input-invalid" : null}`} placeholder='Old password' {...register("oldPassword")} />
                    <p className="text-danger">{errors.oldPassword?.message}</p>
                    <label htmlFor="password">New password:</label>
                    <input type="password" className={`form-control ${errors.newPassword ? "input-invalid" : null}`} placeholder='New password' {...register("newPassword")} />
                    <p className="text-danger">{errors.newPassword?.message}</p>
                    <label htmlFor="password">Repeat new password:</label>
                    <input type="password" className={`form-control ${errors.repeatPassword ? "input-invalid" : null}`} placeholder='Repeat new password' {...register("repeatPassword")} />
                    <p className="text-danger">{errors.repeatPassword?.message}</p>
                    <input type="submit" value="Save changes" className='btn btn-primary' />
                </form>
            </div>
        </div>
    )
}
