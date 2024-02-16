import { Alert } from "react-bootstrap"
import { SetStateAction } from "react"

export enum AlertType {
    None,
    Success,
    Incomplete,
    Failure
}

export const showAlert = (alert: AlertType, setAlert: (data: SetStateAction<any>) => void) => {
    switch (alert) {
        case AlertType.Failure:
            return <Alert variant="danger" onClose={() => setAlert(AlertType.None)} dismissible>
                <Alert.Heading>Something went wrong</Alert.Heading>
                <p>
                    We couldn't process the request
                </p>
            </Alert>
        case AlertType.Incomplete:
            return <Alert variant="danger" onClose={() => setAlert(AlertType.None)} dismissible>
                <Alert.Heading>Form needs corrections</Alert.Heading>
                <p>
                    Please check if the form was correctly filled
                </p>
            </Alert>
        case AlertType.Success:
            return <Alert variant="success" onClose={() => setAlert(AlertType.None)} dismissible>
                <Alert.Heading>Update successfull</Alert.Heading>
                <p>
                    All the changes were saved
                </p>
            </Alert>
        default:
            return null
    }
}