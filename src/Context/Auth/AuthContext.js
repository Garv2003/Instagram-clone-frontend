import { createContext } from "react";

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    return (
        <AuthenticationContext.Provider value={{}}>
            {children}
        </AuthenticationContext.Provider>
    );
};


export default AuthenticationContext;