import { ChangeEvent, SetStateAction } from "react";

export const refreshInput = (event: ChangeEvent<HTMLInputElement>, objectData: Object, setObject: (data: SetStateAction<any>) => void) => {
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
        setObject({ ...objectData, [name]: event.target.checked });
        return;
    }
    if (name === "category"){
        setObject({ ...objectData, [name]: {id: value} });
        return;
    }
    setObject({ ...objectData, [name]: value });
};