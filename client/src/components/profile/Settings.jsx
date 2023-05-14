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
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { loginSuccess } from "../../redux/userRedux";

function Settings() {
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const userSlug = useSelector((state) => state.user.currentUser.slug);
  const initialValues = {
    email: "",
    oldPassword: "",
    newPassword: "",
  };

  const validate = (values) => {
    const errors = {};
    if (values.email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
    }
    if (values.newPassword && values.newPassword.length < 6) {
      errors.newPassword = "Password must contain at least 6 characters";
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
                    `http://localhost:3000/api/users/update/${userSlug}`,
                    {
                      email: values.email,
                      oldPassword: values.oldPassword,
                      newPassword: values.newPassword,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    }
                  );
                  dispatch(loginSuccess(res.data));
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
                      >
                        <FormLabel>Email</FormLabel>

                        <Input borderColor={"gray.700"} {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="oldPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.oldPassword && form.touched.oldPassword
                        }
                      >
                        <FormLabel>Old Password</FormLabel>
                        <InputGroup>
                          <Input
                            borderColor={"gray.700"}
                            {...field}
                            type={showOldPassword ? "text" : "password"}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowOldPassword(
                                  (showOldPassword) => !showOldPassword
                                )
                              }
                            >
                              {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.oldPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="newPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.newPassword && form.touched.newPassword
                        }
                      >
                        <FormLabel>New Password</FormLabel>
                        <InputGroup>
                          <Input
                            borderColor={"gray.700"}
                            {...field}
                            type={showNewPassword ? "text" : "password"}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                setShowNewPassword(
                                  (showNewPassword) => !showNewPassword
                                )
                              }
                            >
                              {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.newPassword}
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
                      Update
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
