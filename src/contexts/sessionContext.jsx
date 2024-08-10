import { createContext, useCallback, useContext } from "react";
import { useStorageState } from "../Hooks/useStorageState";
import { useMutation, queryCache } from "@tanstack/react-query";

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
  const logoutMutation = useMutation(() => {
    removeUser();
    queryCache.clear();
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <SessionContext.Provider
      value={{
        user,
        saveUser,
        removeUser,
        isLoading,
        handleLogout, // Provide handleLogout function to consumers
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
