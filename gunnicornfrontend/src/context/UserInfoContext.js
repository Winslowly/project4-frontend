import { createContext, useState } from "react";

export const UserInfoContext = createContext()

export const UserInfoProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    return (
        <UserInfoContext.Provider value={{ userData, setUserData}}>
            {children}
        </UserInfoContext.Provider>
    )
}

// export default UserInfoContext