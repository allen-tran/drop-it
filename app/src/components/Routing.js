import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomeView from "./HomeView";
import UploadView from "./UploadView";
import Login from "./Login";
import SignUp from "./SignUp";
import { PrivateRoute } from "./PrivateRoute";

function Routing({ appProps }) {
  const [loading, setLoading] = useState(false);
  const signedOutRoutes = [
    { path: "/login", C: Login },
    { path: "/signup", C: SignUp },
  ];

  useEffect(() => {
    getAdminStatus();
    // eslint-disable-next-line
  }, []);

  async function getAdminStatus() {
    setLoading(true);
    setLoading(false);
  }

  return (
    !loading && (
      <div>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            appProps={{ allowed: appProps.authenticated, ...appProps }}
            component={HomeView}
          />
          <PrivateRoute
            path="/drop"
            appProps={{
              allowed: appProps.authenticated,
              redirect: "/",
              ...appProps,
            }}
            component={UploadView}
          />
          {signedOutRoutes.map((x, index) => {
            return (
              <Route
                key={index}
                exact
                path={x.path}
                render={(props) =>
                  !appProps.authenticated ? (
                    <x.C {...appProps} {...props} />
                  ) : (
                    <Route
                      render={() => (
                        <Redirect
                          to={{
                            pathname: "/",
                            state: { from: props.location },
                          }}
                        />
                      )}
                    />
                  )
                }
              />
            );
          })}
          <Route
            render={(props) => (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )}
          />
          } />
        </Switch>
      </div>
    )
  );
}

export default Routing;
