import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>{props.children}</AuthContext.Provider>
  );
}
