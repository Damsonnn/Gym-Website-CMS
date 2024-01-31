export{}
export const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    'Content-Type': 'application/json', }
};