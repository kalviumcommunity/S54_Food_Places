import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HomeBG from "./../assets/Restuarant_BG.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "./ManageCookie";
import {
  Box,
  Flex,
  Input,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  useToast,
  Heading,
  InputGroup,
  InputLeftAddon,
  VStack,
  ButtonGroup,
  InputRightAddon,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { UserContext } from "./Context/AuthContext";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [error,setError] = useState("")
  const [showRepeat, setShowRepeat] = useState(false);
  const {setIsLoggedin} = useContext(UserContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    reset,
  } = useForm();


  const User_Api_Uri = import.meta.env.VITE_USER_API_URI;
  const formSubmit = async(data) => {
    try {
      const {Name,Username,Password,Email} = data
      const res = await axios.post(User_Api_Uri,{Name,Username,Password,Email})
      setCookie("Username",res.data.AccessToken)
      setIsLoggedin(true)
      toast.success(`User with username ${Username} is created`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,})
        setTimeout(() => {
          navigate("/");
        }, 4000);
    } catch (error) {
      setError(error.response.data.errorMessage);
    }
  };


  return (
    <Box>
      <ToastContainer/>
      <VStack
        pt={"3vw"}
        px={"5vw"}
        height={"40vw"}
        backgroundImage={HomeBG}
        backgroundSize={"100%"}
        backgroundRepeat={"no-repeat"}
        // align={"center"}
        // justify={"center"}
        borderRadius={"0 0 1vw 1vw"}
        mb={"3vw"}
      >
        <form onSubmit={handleSubmit(formSubmit)}>
          <Heading size={"2xl"} color={"white"} textAlign={"center"} my={"1vw"}>
            S I G N U P
          </Heading>
          <FormControl
            boxShadow={"0 0 1vw #00000026"}
            p={"2vw"}
            mb={"2vw"}
            width={"30vw"}
            // height={"80vh"}
            bgColor={"white"}
            borderRadius="lg"
          >
            <VStack>
              <FormControl isInvalid={errors.Name}>
                <FormLabel>
                  Name <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter FoodPlace's Name"
                  {...register("Name", {
                    required: "FoodPlace's Name can't be Empty",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters required",
                    },
                  })}
                />
                <FormErrorMessage>{errors.Name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.Username}>
                <FormLabel>
                  Username <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter FoodPlace's Username"
                  {...register("Username", {
                    required: "Username can't be Empty",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters required",
                    },
                  })}
                />
                <FormErrorMessage>{errors.Username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.Email}>
                <FormLabel>
                  Email <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Email"
                  {...register("Email", {
                    required: "Email can't be Empty",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email not valid",
                    },
                  })}
                />
                <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.Password}>
                <FormLabel>
                  Password <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("Password", {
                      required: "Password can't be empty",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:<>,.?\\\/]).{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one symbol",
                      },
                    })}
                  />
                  <InputRightElement>
                    <Button
                      bgColor={"transparent"}
                      _hover={{
                        bgColor: "transparent",
                        transform: "scale(1.1)",
                        transition: "0.2s",
                      }}
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.Password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.ConfirmPassword}>
                <FormLabel>
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showRepeat ? "text" : "password"}
                    placeholder="Enter Password to confirm"
                    {...register("ConfirmPassword", {
                      required: "Password can't be empty",
                      validate: (val) => {
                        if (watch("Password") != val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                  />
                  <InputRightElement>
                    <Button
                      bgColor={"transparent"}
                      _hover={{
                        bgColor: "transparent",
                        transform: "scale(1.1)",
                        transition: "0.2s",
                      }}
                      onClick={() => {
                        setShowRepeat(!showRepeat);
                      }}
                    >
                      {showRepeat ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.ConfirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <Flex width={"100%"} justify={"end"} mt={"1vw"}>
                <Button
                  bgColor={"#ddc3ac"}
                  _hover={{ bgColor: "#ddb99a" }}
                  type="submit"
                >
                  Sign up
                </Button>
                <Link to={"/"}>
                  <Button
                    ml={"1vw"}
                    variant={"outline"}
                    borderColor={"#ddc3ac"}
                    borderWidth={"2px"}
                    _hover={{ bgColor: "#fff2e7cc" }}
                  >
                    Cancel
                  </Button>
                </Link>
              </Flex>
              {error  && <Text color={'red'}>{error}. Please <Button variant={'link'} color={'black'}><Link to={'/login'}>Login</Link></Button></Text>}
            </VStack>
          </FormControl>
        </form>
      </VStack>
    </Box>
  );
};

export default SignUp;
