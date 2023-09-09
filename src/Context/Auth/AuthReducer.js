import React, { useReducer } from "react";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthState = (props) => {
	let initialState = {};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;