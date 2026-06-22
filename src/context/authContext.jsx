import { createContext, useCallback, useContext, useState } from "react"
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export default function ContextProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [data, setData] = useState({
        auth: isAuthenticated,
        user: {},
    });

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