import React, { createContext, useContext, useEffect, useState } from "react";

//Fn
import { getCookie } from "../utils/cookie";

const UserContext = createContext();

function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const res = getCookie("userData");
    setUserInfo(res);
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
const useUser = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  return [userInfo, setUserInfo];
};
export default UserInfoContextProvider;
export { useUser };
