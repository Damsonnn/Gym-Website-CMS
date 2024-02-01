import { CrudAction } from "./CrudAction";
import axios from "axios";
import { NavigateFunction } from "react-router";
import { config } from "./JWTConfig";
import { SetStateAction } from "react";



export const createOrEditRequest = async (action: CrudAction, objectData: Object, id: string | undefined, endpoint: string, navigate: NavigateFunction) => {
    if (action === CrudAction.Create) {
        try {
            const response = await axios.post(`http://localhost:8080/api/${endpoint}`, objectData, config);

            if (response.status === 201) {
                console.log('Succesfully created');
                console.log(response.data);
                sessionStorage.setItem("token", response.data.token);
                navigate(`/manage/${endpoint}`);
            } else {
                console.error('Could not create');
            }
        } catch (error) {
            console.error('Error during creating:', error);
        }
    }
    else {
        try {
            const response = await axios.put(`http://localhost:8080/api/${endpoint}/${id}`, objectData, config);

            if (response.status === 200) {
                console.log('Succesfully updated');
                console.log(response.data);
            } else {
                console.error('Could not update data');
            }
        } catch (error) {
            console.error('Error during updating data:', error);
        }
    }
}

export const getOneObject = async (id: string | undefined, endpoint: string, setData: (data: SetStateAction<any>) => void) => {
    try {
        await axios.get(`http://localhost:8080/api/${endpoint}/${id}`, config).then(response => {
            console.log(response)
            if (response.status === 200) {
                setData(response.data)
            }
            else {
                console.log("Could not get data");
            }
        })
    } catch (error) {
        console.error('Error during fetching:', error);
    }
}

export const getAllObjects = async (endpoint: string, setData: (data: SetStateAction<Array<any>>) => void) =>{
    try {await axios.get(`http://localhost:8080/api/${endpoint}`, config).then(response =>{
                console.log(response)
                if (response.status === 200) {
                    setData(response.data)
                }
                else {
                    console.error('Could not get data');
                }
            })
        } catch (error) {
            console.error('Error during getting data:', error);
    }
}

export const deleteObject = async (endpoint: string, id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/${endpoint}/${id}`, config);

        if (response.status === 200) {
            console.log('Succesfully deleted');
            console.log(response.data);
            window.location.reload();
        } else {
            console.error('Could not delete data');
        }
    } catch (error) {
        console.error('Error during deleting data:', error);
    }
}