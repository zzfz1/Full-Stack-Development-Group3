import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Divider,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsGithub, BsDiscord, BsGoogle } from "react-icons/bs";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import GoogleLogin from "../components/googleLogin.jsx";
import axios from "axios";

import { loginSuccess } from "../redux/userRedux.jsx";
import { useSelector } from "react-redux";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign in
          </Heading>
          <Text fontSize={"lg"} color={"gray"} pt="4%" px={["5%", "15%"]}>
            to see your purchase history and save your favorite product ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/api/users/login",
                    {
                      email: values.email,
                      password: values.password,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    }
                  );
                  dispatch(loginSuccess(res.data));
                  navigate("/");
                  actions.setSubmitting(false);
                } catch (err) {
                  console.error(err.message);
                  actions.setSubmitting(false);
                }
              }}
              validate={validate}
            >
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                      >
                        <FormLabel>Email</FormLabel>

                        <Input borderColor={"gray.700"} {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            borderColor={"gray.700"}
                            {...field}
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                        <Text align={"center"} color={"primary.500"}>
                          <Link to="/reset">Forgot your password? </Link>
                        </Text>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"primary.500"}
                      color={"white"}
                      _hover={{
                        bg: "primary.600",
                      }}
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Stack pt={6}>
              <Text align={"center"}>Don't have an account yet? </Text>
              <Link to="/register">
                <Text align={"center"} color={"primary.500"}>
                  Sign Up
                </Text>
              </Link>
            </Stack>

            <Stack>
              <GoogleLogin />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;

/* 
{async (values, actions) => {
                try {
                  const data = await axios.post(
                    "http://localhost:3000/api/users/login",
                    {
                      email: values.email,
                      password: values.password,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  console.log(data);
                  actions.setSubmitting(false);
                } catch (err) {
                  console.error(err.message);
                  actions.setSubmitting(false);
                }
              }} */
