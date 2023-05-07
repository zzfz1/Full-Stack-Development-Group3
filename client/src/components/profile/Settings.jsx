import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";

function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
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
    <Flex minH={"100%"} minW={"100%"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12}>
        <Stack align={"center"}>
          <Heading
            fontSize={{ sm: "lg", md: "2xl", lg: "4xl" }}
            textAlign={"center"}
          >
            Settings
          </Heading>
        </Stack>
        <Box
          /*           rounded={"lg"} */
          /* bg={useColorModeValue("white", "gray.900")} */
          /*    boxShadow={"lg"} */
          px={{ base: 1, md: 4, lg: 6 }}
          py={{ base: 1, md: 4, lg: 6 }}
        >
          <Stack spacing={6}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.put(
                    "http://localhost:3000/api/users/lo",
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
                  console.log(res.data);
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
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size={{ base: "md", md: "lg" }}
                      bg={"primary.500"}
                      color={"white"}
                      _hover={{
                        bg: "primary.600",
                      }}
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Change password
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Settings;
