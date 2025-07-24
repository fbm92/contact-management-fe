import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi";
import {  alertSuccess } from "../../lib/alert";

export const UserLogout = () => {

    const [token, setToken] = useLocalStorage('token', "")
    const navigate = useNavigate()

    async function handleLogout() {
        const response = await userLogout (token)
        const responseBody = await response.json()
        console.log(responseBody);
        

        if (response.status === 200) {
            await alertSuccess('berhasil logout')
            setToken("")
            await navigate({
                pathname : '/login'
            })
        }

    }
    useEffectOnce( () => {
        handleLogout()
        .then(() => console.log('Berhasil Logout'))
    })

  return <></>;
};
