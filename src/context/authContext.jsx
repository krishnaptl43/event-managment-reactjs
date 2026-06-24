import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { axiosClient } from "../services/apiClient";
import { Urls } from "../services/urls";
import { toast } from "react-toastify";
import { getUserProfile } from "../services/userApis"

const AuthContext = createContext();

export default function ContextProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [data, setData] = useState({
        auth: isAuthenticated,
        user: {},
    });

    const fetchUser = useCallback(async () => {

        if (!isAuthenticated) {
            setData({
                auth: false,
                user: {},
            });
            return;
        };
        let profile = await getUserProfile();
        if (profile.status) {
            setData({
                auth: true,
                user: profile.data,
            })
        } else {
            setData({
                auth: false,
                user: {},
            });
        }

    }, [isAuthenticated])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (<>
        <AuthContext.Provider value={{ data, setData }}>
            {children}
        </AuthContext.Provider>
    </>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
};