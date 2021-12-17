import React, { useReducer, createContext } from "react";

export const UserContext = createContext({});
const initialState = { state: { userInfo: null } };

function reducer(state, action) {
  switch (action.type) {
    case "SetUserInfo":
      return {
        userInfo: {
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
      };

    case "UpdateFavoringCrypto":
      return {
        userInfo: {
          profile: {
            favoringCryptos: action.favoringCryptos,
          },
        },
      };
    case "UpdateEmailAddress":
      return {
        userInfo: { profile: { email: action.email } },
      };

    default:
      return state;
  }
}

function UserContextComponent({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextComponent;
