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
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsGithub, BsDiscord, BsGoogle } from "react-icons/bs";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";

import GoogleLogin from '/src/components/googleLogin'

function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                try {
                  const data = await fetch(
                    `http://localhost:3000/api/users/login`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                      }),
                    }
                  );
                  console.log(data);
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
                        <Input {...field} />
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
              <Box textAlign="center" py={4}>
                <Divider borderColor="gray" />
                <Text fontSize="xl" fontWeight="semibold">
                  Or Continue With
                </Text>
                <Divider borderColor="gray" />
              </Box>
            </Stack>
            <Stack>
              <HStack spacing={5} px={5} justifyContent="space-around">
                <GoogleLogin/>
                <IconButton
                  aria-label="github"
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "primary.500" }}
                  icon={<BsGithub size="40px" />}
                />
                <IconButton
                  aria-label="discord"
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "primary.500" }}
                  icon={<BsDiscord size="40px" />}
                />
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
