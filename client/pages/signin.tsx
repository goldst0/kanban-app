import Header from "../components/header";
import {
  Text,
  Container,
  Heading,
  Center,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  useToast,
  Divider,
  Link,
  HStack,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { resolve } from "path/posix";

const SignIn = () => {
  //react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  //successfully submit
  const toast = useToast();

  const [email, setEmail] = React.useState("");
  const emailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onSubmit = (values: any) => {
    // return new Promise((resolve: any) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 1));
    //     resolve();
    //   }, 3000);
    // });
    toast({
      title: "Successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box align="center">
        <Heading
          textAlign="center"
          size="2xl"
          color="gray.700"
          lineHeight="200%"
        >
          Sign In
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            id="email"
            isInvalid={errors.email ? true : false}
            width="fit-content"
          >
            <FormLabel htmlFor="email" color="gray.400">
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              //   value={email}
              //   onChange={emailChange}
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid e-mail address",
                },
              })}
              size="md"
              w="320px"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isInvalid={errors.password ? true : false}
            width="fit-content"
          >
            <FormLabel htmlFor="password" color="gray.400">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Passwords must be at least 6 characters",
                },
                maxLength: 20,
              })}
              size="md"
              w="320px"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Divider orientation="vertical" h="20px" />
          <Button
            isLoading={isSubmitting}
            type="submit"
            size="md"
            w="320px"
            bg="blue.500"
            color="white"
          >
            Sign In
          </Button>
          <Divider orientation="vertical" h="20px" />
        </form>
        <Divider />
        <Divider orientation="vertical" h="20px" />
        <HStack width="fit-content">
          <Text color="gray.400">New to Task App?</Text>
          <Text color="gray.400">
            <Link href="signup" color="cyan.600">
              Create an account
            </Link>
            .
          </Text>
        </HStack>
      </Box>
    </>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <Header>{page}</Header>;
};

export default SignIn;
