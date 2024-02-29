export const getConfig = () => {
    return {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json', }
        }
    
}
