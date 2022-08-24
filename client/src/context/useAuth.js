import { createContext, useMemo, useState, useContext } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
