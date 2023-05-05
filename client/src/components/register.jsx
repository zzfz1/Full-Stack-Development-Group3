import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useColorModeValue,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    checkbox: true,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.name) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (values.password && values.password.length < 6) {
      errors.password = "Password must contain at least 6 characters";
    }
    if (values.checkbox === false) {
      errors.checkbox = "You must agree to the terms of service";
    }

    return errors;
  };

  const handleSubmit = (values, actions) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.name) {
      errors.username = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.checkbox) {
      errors.checkbox = "You must agree to the terms of service";
    }
    if (Object.keys(errors).length > 0) {
      actions.setErrors(errors);
    } else {
      actions.setSubmitting(true);
      console.log("data", values.name, values.email, values.password);
      // Send the form data to the server
      fetch(`http://localhost:3000/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
          console.log(response);
          alert(response.status);
          actions.setSubmitting(false);
        })
        .catch((error) => {
          console.error(error);
          actions.setSubmitting(false);
        });
    }
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
            Sign up
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
          {/* form control */}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validate}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Full Name</FormLabel>
                        <Input {...field} borderColor={"gray.700"} />
                        <FormErrorMessage color="red">
                          {form.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel>Username</FormLabel>
                        <Input {...field} borderColor={"gray.700"} />
                        <FormErrorMessage color="red">
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input {...field} borderColor={"gray.700"} />
                        <FormErrorMessage color="red">
                          {form.errors.email}
                        </FormErrorMessage>
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
                        <FormErrorMessage color="red">
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"primary.500"}
                      color={"white"}
                      _hover={{
                        bg: "primary.600",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <HStack alignItems="center">
                    {/* the checkbook */}
                    <FormControl
                      isInvalid={errors.checkbox && touched.checkbox}
                    >
                      <Field
                        as={Checkbox}
                        id="checkbox"
                        name="checkbox"
                        colorScheme="primary"
                        style={{ borderColor: "black" }}
                        defaultChecked={true}
                      >
                        {/* the checkbook text */}
                        <Text fontSize={"xs"} align={"center"}>
                          By clicking ‘Sign up’, I agree to{" "}
                          <Link
                            href="https://openai.com/blog/chatgpt"
                            color={"primary.500"}
                          >
                            {" "}
                            <Text as="u">terms of service</Text>
                          </Link>
                        </Text>
                        {/* end of the checkbook text*/}
                      </Field>
                      <FormErrorMessage color="red">
                        {errors.checkbox}
                      </FormErrorMessage>
                    </FormControl>
                    {/*end of the checkbook */}
                  </HStack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link as="u" color={"primary.500"}>
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
            {/* end of form control */}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Register;
