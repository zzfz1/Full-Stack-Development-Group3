import React from "react";
import {
  Flex,
  SimpleGrid,
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
  FormHelperText,
} from "@chakra-ui/react";
import { isValidNumber } from "libphonenumber-js";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userRedux.jsx";

export default function AddressForm({ originalAddress = {}, userID, onClose }) {
  const dispatch = useDispatch();
  const initialValues = originalAddress
    ? originalAddress
    : {
        firstName: "",
        lastName: "",
        streetAddress: "",
        apartmentNumber: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      };

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Required";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    }

    if (!values.streetAddress) {
      errors.streetAddress = "Required";
    }

    if (!values.city) {
      errors.city = "Required";
    }

    if (!values.postalCode) {
      errors.postalCode = "Required";
    }

    if (!values.country) {
      errors.country = "Required";
    }

    if (values.phoneNumber && !isValidNumber(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }
    return errors;
  };
  const handleSubmit = async (values, actions) => {
    const errors = validate(values);

    if (Object.keys(errors).length > 0) {
      actions.setErrors(errors);
    } else {
      actions.setSubmitting(true);
      // Send the form data to the server
      try {
        const userInfo = await axios.put(
          `https://us-central1-web-shop-group-3.cloudfunctions.net/api/users/address/${userID}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(loginSuccess(userInfo.data));
        actions.setSubmitting(false);
        onClose();
      } catch (error) {
        console.error(error);
        actions.setSubmitting(false);
      }
    }
  };
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"80vw"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontSize={{ sm: "lg", md: "2xl", lg: "4xl" }}
            textAlign={"center"}
          >
            Address Form
          </Heading>
          <Text fontSize={"lg"} color={"gray"} pt="4%" px={["5%", "15%"]}>
            Please fill in your address details
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
                  <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={10}>
                    <Box>
                      <Field name="firstName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.firstName && form.touched.firstName
                            }
                          >
                            <FormLabel minWidth="100px">First Name *</FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(
                              form.errors.firstName && form.touched.firstName
                            ) ? (
                              <FormHelperText>Your first name</FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.firstName}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="lastName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.lastName && form.touched.lastName
                            }
                          >
                            <FormLabel minWidth="100px">Last Name *</FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(
                              form.errors.lastName && form.touched.lastName
                            ) ? (
                              <FormHelperText>Your last name</FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.lastName}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="streetAddress">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.streetAddress &&
                              form.touched.streetAddress
                            }
                          >
                            <FormLabel minWidth="100px">
                              Street Address *
                            </FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(
                              form.errors.streetAddress &&
                              form.touched.streetAddress
                            ) ? (
                              <FormHelperText>
                                Your street address
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.streetAddress}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="apartmentNumber">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.apartmentNumber &&
                              form.touched.apartmentNumber
                            }
                          >
                            <FormLabel minWidth="100px">
                              Apartment Number
                            </FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(
                              form.errors.apartmentNumber &&
                              form.touched.apartmentNumber
                            ) ? (
                              <FormHelperText>If applicable</FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.apartmentNumber}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="city">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.city && form.touched.city}
                          >
                            <FormLabel minWidth="100px">City *</FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(form.errors.city && form.touched.city) ? (
                              <FormHelperText>Your city</FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.city}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="postalCode">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.postalCode && form.touched.postalCode
                            }
                          >
                            <FormLabel minWidth="100px">
                              Postal Code *
                            </FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(
                              form.errors.postalCode && form.touched.postalCode
                            ) ? (
                              <FormHelperText>Zip / Postal Code</FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.postalCode}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="country">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.country && form.touched.country
                            }
                          >
                            <FormLabel minWidth="100px">
                              Country / Region *
                            </FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(form.errors.country && form.touched.country) ? (
                              <FormHelperText>
                                Your country/region
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.country}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="phoneNumber">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.phoneNumber &&
                              form.touched.phoneNumber
                            }
                          >
                            <FormLabel minWidth="100px">Phone Number</FormLabel>
                            <Input {...field} borderColor={"gray.700"} />
                            {!(
                              form.errors.phoneNumber &&
                              form.touched.phoneNumber
                            ) ? (
                              <FormHelperText>
                                With area code (+00)
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage color="red">
                                {form.errors.phoneNumber}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </SimpleGrid>
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
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
