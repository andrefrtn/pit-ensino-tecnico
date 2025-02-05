import { createContext, useEffect, useState } from "react";

// Cria o contexto de autenticação
export const AuthContext = createContext({});

// Define o provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  // Função de login
  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  // Função de cadastro
  const cadastro = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já existe uma conta com esse E-mail";
    }

    const newUser = usersStorage ? [...usersStorage, { email, password }] : [{ email, password }];
    localStorage.setItem("users_bd", JSON.stringify(newUser));
  };

  // Função de logout
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  // Provedor do contexto de autenticação
  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, cadastro, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
