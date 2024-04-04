import { createContext, useCallback, useContext } from "react";
import { useStorageState } from "../Hooks/useStorageState";

const SessionContext = createContext();

export function useSession() {
  const value = useContext(SessionContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value)
      throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setUser] = useStorageState("user");

  const saveUser = useCallback((user) => {
    setUser(JSON.stringify(user));
  }, []);

  const removeUser = useCallback(() => {
    setUser(null);
  }, []);

  const user = session ? JSON.parse(session) : null;

  return (
    <SessionContext.Provider
      value={{
        user,
        saveUser,
        removeUser,
        isLoading,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
