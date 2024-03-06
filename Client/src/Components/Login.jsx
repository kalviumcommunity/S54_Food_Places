import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeBG from "./../assets/Restuarant_BG.png";
import {sha512} from "js-sha512"
// import jwt from 'jsonwebtoken'
// Dawdaw@1213
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { getCookie, setCookie } from "./ManageCookie";
import axios from "axios";
import { UserContext } from "./Context/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [error,setError] = useState({})
  const [isfetched,setIsFetched] = useState(false)
  const [password,setPassword] = useState("")
  const {setIsLoggedin,setUsername} = useContext(UserContext)
  const navigate = useNavigate()
  const User_Api_Uri = import.meta.env.VITE_USER_API_URI;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    reset,
  } = useForm();
  useEffect(()=>{
    if(isfetched){
      if(data.OneUser[0].Password === password){
        setCookie("Username",data.AccessToken)
        setIsLoggedin(true)
        setUsername(data.OneUser[0].Username)
        setError({})
        navigate('/')
      }
      else{
        setError({message: "Incorrect Password"})
      }
    }
  },[isfetched])

  const fetchUser = async (formdata) => {
    try {
      setIsFetched(false)
      const res = await axios.get(`${User_Api_Uri}/${formdata.Username}`);
      console.log(res.data);
      const password = sha512(formdata.Password) 
      setPassword(password) 
      setData(res.data);
      setIsFetched(true)
    } catch (error) {
      setError(error.response.data)
      console.log("response: ", error.response.data);
    }
  };
  const formSubmit = (formData) => {
    fetchUser(formData);
  };
  return (
    <>
    <ToastContainer/>
      <VStack
        pt={"7vw"}
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
            L O G I N
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
              <FormControl isInvalid={errors.Username}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Username"
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
              <FormControl isInvalid={errors.Password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("Password")}
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
              <Flex width={"100%"} justify={"end"} mt={"1vw"}>
                <Button
                  bgColor={"#ddc3ac"}
                  _hover={{ bgColor: "#ddb99a" }}
                  type="submit"
                >
                  Log in
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
              {error!={}&& <Text color={'red'}>{error.message}</Text>}
              <Text mt={"1vw"}>
                New to the website?{" "}
                <Button variant={"link"} color={"black"}>
                  <Link to={"/signup"}>Sign up</Link>
                </Button>
              </Text>
            </VStack>
          </FormControl>
        </form>
      </VStack>
    </>
  );
};
export default Login;
