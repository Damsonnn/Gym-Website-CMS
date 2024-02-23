import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import axios from "axios";
import ActionAlert, { AlertType, AlertData } from "../../utils/ActionAlert";
import { Link } from "react-router-dom";

type PasswordResetForm = {
    email: string
}

export default function PasswordRecovery() {
    const [alert, setAlert] = useState<AlertData | null>();
    const schema = yup.object().shape({
        email: yup.string().required().email()
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordResetForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: PasswordResetForm) => {
        await axios.post(`http://localhost:8080/api/auth/reset-password?email=${data.email}`).then(response => {
            console.log(response)
            if (response.status === 200) {
                setAlert({
                    type: AlertType.Success,
                    title: "Success",
                    message: "Check your email"
                });
                reset();
            }}).catch(error => {
                console.error('Error during changing password:', error);
                if (error.response){
                    setAlert({
                        type: AlertType.Danger,
                        title: "Password change failed",
                        message: error.response.data.message
                    });
                    reset();
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
            <div className='border rounded p-5'>
                <div className='recovery-message'>
                    Enter your e-mail to reset password
                </div>
                <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" className={`form-control ${errors.email ? "input-invalid" : null}`} {...register("email")} placeholder='E-mail'/>
                    <p className="text-danger">{errors.email?.message}</p>
                    <input type="submit" value="Send recovery email" className='btn btn-primary' />
                </form>
            </div>
            <Link to={"/login"}>Get back to log in page</Link>
        </div>
    )
}
