import { ChangeEvent, SetStateAction } from "react";

export const refreshInput = (event: ChangeEvent<HTMLInputElement>, objectData: Object, setObject: (data: SetStateAction<any>) => void) => {
    const { name, value } = event.target;
    switch (event.target.type) {
        case "checkbox":
            setObject({ ...objectData, [name]: event.target.checked });
            break;
        case "select-one":
            setObject({ ...objectData, [name]:{id: value}});
            break;
        default:
            setObject({ ...objectData, [name]: value });
            break;
    }
};