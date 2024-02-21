import { Alert } from "react-bootstrap"

export enum AlertType {
    None = "",
    Danger = "danger",
    Success = "success"
}

export type AlertData = {
    type: AlertType,
    title: string,
    message: string
}

export default function ActionAlert(props: {data: AlertData}) {
    if (props.data.type === AlertType.None) return null;
    
    return <Alert variant={props.data.type} onClose={() => props.data.type = AlertType.None} dismissible>
        <Alert.Heading>{props.data.title}</Alert.Heading>
        <p>
            {props.data.message}
        </p>
    </Alert>
}