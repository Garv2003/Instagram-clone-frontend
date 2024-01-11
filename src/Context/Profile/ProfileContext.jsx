import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get(`/api/profile/${user._id}`);
                setProfile(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProfile();
    }, [user._id]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext;

