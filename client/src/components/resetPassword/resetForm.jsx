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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { BiArrowBack } from "react-icons/bi";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

function ResetForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    confirmPassword: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    }

    if (values.password && values.password.length < 6) {
      errors.password = "Password must contain at least 6 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    }

    return errors;
  };

  const handleSubmit = (values, actions) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    }
    if (values.password != values.confirmPassword) {
      errors.confirmPassword =
        "The passwords you entered do not match, try again.";
    }

    if (Object.keys(errors).length > 0) {
      actions.setErrors(errors);
    } else {
      actions.setSubmitting(true);
      console.log("data", values.password);
      // Send the form data to the server
      fetch(
        `https://us-central1-web-shop-group-3.cloudfunctions.net/api/users/reset/${props.user}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: values.password,
            username: props.user,
          }),
        }
      )
        .then((response) => {
          console.log("the response", response);
          if (response.ok) {
            toast.success("Password Successfully reset it", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Faild to reset the password", {
              position: toast.POSITION.TOP_CENTER,
            });
            actions.resetForm(); // Add this line to reset the form
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
  console.log("the user inside the props", props.user);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <div>
            <img src="/images/key2.png" alt="Animated icon" />
          </div>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Set New Password
          </Heading>
          <Text fontSize={"lg"} color={"gray"} pt="4%" px={["5%", "15%"]}>
            Your new password must be different to previously used password
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
                            ref={props.register} // Add a ref attribute here
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
                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            ref={props.register} // Add a ref attribute here
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
                          {form.errors.confirmPassword}
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
                      Reset Password
                    </Button>
                  </Stack>
                  {/*  */}
                  <Stack pt={6} align="center">
                    <ChakraLink
                      display="flex"
                      alignItems="center"
                      href="/login"
                      justifyContent="space-around"
                      color="primary.500"
                    >
                      <Box pr="2">
                        <BiArrowBack />
                      </Box>
                      Back to Login
                    </ChakraLink>
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

export default ResetForm;
