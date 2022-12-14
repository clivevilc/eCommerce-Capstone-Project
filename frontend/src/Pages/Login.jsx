import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { facebookLoginThunk } from "../redux/authSlice";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebookSquare } from "react-icons/fa";

export default function Login() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const responseFacebook = (userInfo) => {
    dispatch(facebookLoginThunk(userInfo));
  };
  return (
    <div>
      <div className="App">
        <div class="container-fluid ps-md-0">
          <div class="row g-0">
            <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div class="col-md-8 col-lg-6">
              <div class="login d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-md-9 col-lg-8 mx-auto">
                      <h3 class="login-heading mb-4">Welcome back!</h3>
                      <Form>
                        <FormGroup floating>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={handleChange}
                          />
                          <Label for="exampleEmail">Email</Label>
                        </FormGroup>{" "}
                        <FormGroup floating>
                          <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={handleChange}
                          />
                          <Label for="examplePassword">Password</Label>
                        </FormGroup>{" "}
                        <Button
                          style={{ padding: "14px 40px", margin: "0 9px" }}
                          onClick={() =>
                            dispatch(loginThunk(credentials)).then(() =>
                              navigate("/")
                            )
                          }
                        >
                          Login
                        </Button>
                        <Button
                          style={{ padding: "14px 40px" }}
                          onClick={() => navigate("/signup")}
                        >
                          Create an Account
                        </Button>
                      </Form>
                      <br/>
                      <div className="col">
                        <FacebookLogin
                          appId={process.env.REACT_APP_FACEBOOK_LOGIN}
                          autoLoad={false}
                          fields="name,email"
                          callback={responseFacebook}
                          render={renderProps => (
                            <Button onClick={renderProps.onClick} variant="outline-primary"><FaFacebookSquare /></Button>
                        )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
