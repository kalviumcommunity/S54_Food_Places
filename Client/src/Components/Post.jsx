import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import HomeBG from "./../assets/Restuarant_BG.png";
import axios from "axios";
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
} from "@chakra-ui/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./Context/AuthContext";
import { getCookie } from "./ManageCookie";

const Post = ({ fetchData }) => {
  const [isPosted, setIsPosted] = useState(true);
  const { isLoggedin, setIsLoggedin,Username } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    reset,
  } = useForm();

  const navigate = useNavigate();
  useLayoutEffect(()=>{
    if (!isLoggedin) {
      navigate('/login')
    }
  },[])
  useEffect(()=>console.log("userName: ", Username))

  const formSubmit = (data) => {
    console.log(data);
    setIsPosted(false)
    PostRequest(data);
  };
  const PostRequest = async (data) => {
    try {
      if (data.Website.includes("http://")) {
        data.Website = data.Website.slice(7)
      } else if(data.Website.includes("https://")) {
        data.Website = data.Website.slice(8)
      }
      const res = await axios.post(
        "https://food-places.onrender.com/api/foodplaces",
        {
          ...data,
          PostedBy: Username,
        }
      );
      setIsPosted(true)
      // console.log("res", res.data.p);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/");
      }, 4000);
      fetchData();
    } catch (error) {
      console.log("error", error);
      setIsPosted(true)
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
            Add Place
          </Heading>
          <FormControl
            boxShadow={"0 0 1vw #00000026"}
            p={"2vw"}
            mb={"2vw"}
            width={"50vw"}
            // height={"80vh"}
            bgColor={"white"}
            borderRadius="lg"
          >
            <VStack>
              <FormControl isInvalid={errors.Name}>
                <FormLabel>Name <span style={{color: "red"}}>*</span></FormLabel>
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
              <FormControl isInvalid={errors.Location}>
                <FormLabel>Location <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                  type="text"
                  placeholder="Enter FoodPlace's Location"
                  {...register("Location", {
                    required: "Location can't be Empty",
                  })}
                />
                <FormErrorMessage>{errors.Location?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.SpendPerPerson}>
                <FormLabel>Spend Per Person <span style={{color: "red"}}>*</span></FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter the range of spend"
                    {...register("SpendPerPerson", {
                      required: "Please provide expense per person",
                    })}
                  />
                  <InputRightAddon>/person</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {errors.SpendPerPerson?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Cuisines</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Cuisines avaialble in the FoodPlace"
                  {...register("Cuisines")}
                />
              </FormControl>
              <FormControl isInvalid={errors.Rating}>
                <FormLabel>Rating <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                  type="number"
                  placeholder="Provide Rating of the FoodPlace"
                  {...register("Rating", {
                    required: "Please Provide a Rating for the FoodPlace",
                    min: 0,
                    max: 5,
                  })}
                />
                <FormErrorMessage>{errors.Rating?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Open Hours</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the time when Foodplace is Open"
                  {...register("OpenHours")}
                />
              </FormControl>
              <FormControl isInvalid={errors.Image}>
                <FormLabel>Image <span style={{color: "red"}}>*</span></FormLabel>
                <Input
                  type="text"
                  placeholder="Provide Image for the Food Place(Only Link Supported)"
                  {...register("Image", {
                    required: "Image is required",
                  })}
                />
                <FormErrorMessage>{errors.Image?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.PhoneNumber}>
                <FormLabel>Phone Number <span style={{color: "red"}}>*</span></FormLabel>
                <InputGroup>
                  <InputLeftAddon>+ 91</InputLeftAddon>
                  <Input
                    type="number"
                    placeholder="Enter the time when Foodplace is Open"
                    {...register("PhoneNumber", {
                      required: "Phone Number is Mandatory",
                      minLength: {
                        value: 10,
                        message: "Phone Number has to be of 10 digits",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.PhoneNumber?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.Email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    {...register("Email")}
                  />
                <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the time when Foodplace is Open"
                  {...register("Website")}
                />
              </FormControl>
              <Flex width={"100%"} justify={"end"} mt={"1vw"}>
                {isPosted ? (
                  <Button
                    bgColor={"#ddc3ac"}
                    _hover={{ bgColor: "#ddb99a" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    isLoading
                    loadingText='Submitting'
                    bgColor={"#ddc3ac"}
                    _hover={{ bgColor: "#ddb99a" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
                <Link to={'/'}>
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
            </VStack>
          </FormControl>
        </form>
      </VStack>
    </>
  );
};

export default Post;
