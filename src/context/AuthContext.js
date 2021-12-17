import React, { useReducer, createContext } from "react";

export const AuthContext = createContext({});
const initialState = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      console.log(action);
      return {
        user: {
          isAuth: true,
          email: action.email,
          username: action.username,
          profile: {
            email: action.email,
            username: action.username,
            _id: action._id,
            firstName: action.firstName,
            lastName: action.lastName,
            favoringCryptos: action.favoringCryptos,
            favoringCryptoPrograms: action.favoringCryptoPrograms,
            createdDate: action.createdDate,
            updatedLast: action.updatedLast,
          },
        },
      };
    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
}

function AuthContextComponent({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextComponent;
