import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import CheckEmail from "./checkEmail";
//cuz@example.com

function SendEmail() {
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const initialValues = {
    email: "",
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const handleSubmit = (values, actions) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }

    if (Object.keys(errors).length > 0) {
      actions.setErrors(errors);
    } else {
      actions.setSubmitting(true);
      console.log("data", values.email);
      // Send the form data to the server
      fetch(`http://localhost:3000/api/users/reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setEmail(values.email);
            setConfirm(true);
          } else {
            console.log("the erro block failed");
            toast.error("User not found", {
              position: toast.POSITION.TOP_CENTER,
            });
          }

          actions.setSubmitting(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Server Error", {
            position: toast.POSITION.TOP_CENTER,
          });
          actions.setSubmitting(false);
        });
    }
  };

  if (confirm) {
    return (
      <div>
        <CheckEmail email={email} />
      </div>
    );
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Box pt={2}>
            <img src="/images/key2.png" alt="Animated icon" />
          </Box>
          <Heading fontSize={"lg"} textAlign={"center"}>
            Forgot your password
          </Heading>
          <Text fontSize={"lg"} textAlign={"center"} color={"gray"} pt="4%">
            No worries, we will send you reset instructions
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
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage color="red">
                          {form.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* submit button and login section */}
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
                      Reset Password
                    </Button>
                  </Stack>
                  <Stack pt={6} align="center">
                    <ChakraLink
                      display="flex"
                      alignItems="center"
                      href="#"
                      justifyContent="space-around"
                      color="primary.500"
                    >
                      <Box pr="2">
                        <BiArrowBack />
                      </Box>
                      Back to Login
                    </ChakraLink>
                  </Stack>
                  {/* end submit button and login section */}
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

export default SendEmail;
