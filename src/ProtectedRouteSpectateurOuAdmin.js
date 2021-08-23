import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../src/components/authentification/auth";


 
export  const ProtectedRouteSpectateurOuAdmin = ({ component: Component, ...rest }) => {
   return (
    <Route
      {...rest}
           render={props => {
        if (auth.isAuthenticated() && (auth.isSpectateur() || auth.isAdmin())) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};  