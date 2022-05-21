import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export enum LoginState {
  Unknown,
  No,
  Yes,
}

interface User {}

type Context = {
  user?: User;
  isAuthenticated: LoginState;
};

const AuthContext = React.createContext<Context>({
  isAuthenticated: LoginState.Unknown,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<LoginState>(
    LoginState.Unknown
  );

  useEffect(() => {
    if (isAuthenticated === LoginState.No) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
