import axios from "axios";
import { NavigateFunction } from "react-router";
import { getConfig } from "./JWTConfig";
import { SetStateAction } from "react";
import { AlertType } from "./ActionAlert";

export const createObject = async (objectData: Object, endpoint: string, navigate: NavigateFunction, setAlert: (data: SetStateAction<any>) => void | null) => {
    await axios.post(`http://localhost:8080/api/${endpoint}`, objectData, getConfig()).then(response => {
        console.log(response)
        if (response.status === 201) {
            console.log('Succesfully created');
            console.log(response.data);
            navigate(`/manage/${endpoint}`);
        }
     }).catch(error => {
        if (error.response) {
            console.error('Could not create');
            console.log(error.response);
            setAlert({
                type: AlertType.Danger,
                title: "Create request failed",
                message: error.response.data.message
            });
        } else {
            console.error('Error during creating:', error);
            setAlert({
                type: AlertType.Danger,
                title: "Something went wrong",
                message: "We couldn't send or receive this request"
            });
        }
    })
}


export const editObject = async (objectData: Object, id: string, endpoint: string, setAlert: (data: SetStateAction<any>) => void) => {
    await axios.put(`http://localhost:8080/api/${endpoint}/${id}`, objectData, getConfig()).then(response => {
        if (response.status === 200) {
            setAlert({
                type: AlertType.Success,
                title: "Success!",
                message: "We updated this successfully"
            });
        }}).catch(error => {
            if (error.response) {
                console.error('Could not update data');
                setAlert({
                    type: AlertType.Danger,
                    title: "Update request failed",
                    message: error.response.data.message
                });
            }else {
                console.error('Error during updating data:', error);
                setAlert({
                    type: AlertType.Danger,
                    title: "Something went wrong",
                    message: "We couldn't send or receive this request"
                });
            }
        });
} 

export const getOneObject = async (id: string | undefined, endpoint: string, setData: (data: SetStateAction<any>) => void) => {
    try {
        await axios.get(`http://localhost:8080/api/${endpoint}/${id}`, getConfig()).then(response => {
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

export const getOneObjectNoToken = async (id: string | undefined, endpoint: string, setData: (data: SetStateAction<any>) => void) => {
    try {
        await axios.get(`http://localhost:8080/api/${endpoint}/${id}`).then(response => {
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

export const getAllObjects = async (endpoint: string, setData: (data: SetStateAction<Array<any>>) => void) => {
    try {
        await axios.get(`http://localhost:8080/api/${endpoint}`, getConfig()).then(response => {
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

export const getAllObjectsNoToken = async (endpoint: string, setData: (data: SetStateAction<Array<any>>) => void) => {
    try {
        await axios.get(`http://localhost:8080/api/${endpoint}`).then(response => {
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
        const response = await axios.delete(`http://localhost:8080/api/${endpoint}/${id}`, getConfig());

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