import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEdit2Line } from "react-icons/ri";

const UpdateModal = ({ data, setUpdated, setData }) => {
  // console.log(setUpdated);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [patching,setPatching] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    reset,
  } = useForm();

  const formSubmit = async (formData) => {
    try {
      if (formData.Website.includes("http://")) {
        formData.Website = formData.Website.slice(7);
      } else if (formData.Website.includes("https://")) {
        formData.Website = formData.Website.slice(8);
      }
      setPatching(true)

      const res = await axios.patch(
        `https://food-places.onrender.com/api/foodplaces/${data._id}`,
        {
          ...formData,
          PhoneNumber: `+91 ${formData.PhoneNumber}`,
          Email: formData.Email == "" ? "NA" : formData.Email,
          Website: `http://${formData.Website}`,
        }
      );
      setPatching(false)
      setData((prev) => {
        return prev.map((e) => {
          if (e._id === data._id) {
            return {
              ...e,
              ...formData,
              PhoneNumber: `+91 ${formData.PhoneNumber}`,
              Email: formData.Email == "" ? "NA" : formData.Email,
              Website: `http://${formData.Website}`,
            };
          } else {
            return e;
          }
        });
      });
      onClose();
      setUpdated(`Place Updated`);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Button
        variant={"ghost"}
        onClick={onOpen}
        w={"0px"}
        h={"30px"}
        _hover={{ bgColor: "#ddb99a33" }}
      >
        <Icon as={RiEdit2Line} color={"#ad8f76"} w={"22px"} h={"22px"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Place</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(formSubmit)}>
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
                  defaultValue={data.Name}
                />
                <FormErrorMessage>{errors.Name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.Location}>
                <FormLabel>
                  Location <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter FoodPlace's Location"
                  {...register("Location", {
                    required: "Location can't be Empty",
                  })}
                  defaultValue={data.Location}
                />
                <FormErrorMessage>{errors.Location?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.SpendPerPerson}>
                <FormLabel>
                  Spend Per Person <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter the range of spend"
                    {...register("SpendPerPerson", {
                      required: "Please provide expense per person",
                    })}
                    defaultValue={data.SpendPerPerson}
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
                  defaultValue={data.Cuisines}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Open Hours</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the time when Foodplace is Open"
                  {...register("OpenHours")}
                  defaultValue={data.OpenHours}
                />
              </FormControl>
              <FormControl isInvalid={errors.Image}>
                <FormLabel>
                  Image <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Provide Image for the Food Place(Only Link Supported)"
                  {...register("Image", {
                    required: "Image is required",
                  })}
                  defaultValue={data.Image}
                />
                <FormErrorMessage>{errors.Image?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.PhoneNumber}>
                <FormLabel>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon>+ 91</InputLeftAddon>
                  <Input
                    type="number"
                    placeholder="Enter Phone Number to update"
                    {...register("PhoneNumber", {
                      required: "Phone Number is Mandatory",
                      minLength: {
                        value: 10,
                        message: "Phone Number has to be of 10 digits",
                      },
                    })}
                    defaultValue={Number(data.PhoneNumber.slice(4))}
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
                  defaultValue={data.Email == "NA" ? "" : data.Email}
                />
                <FormErrorMessage>{errors.Email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the time when Foodplace is Open"
                  {...register("Website")}
                  defaultValue={
                    data.Website.includes("https://")
                      ? data.Website.slice(8)
                      : data.Website.includes("http://")
                      ? data.Website.slice(7)
                      : data.Website
                  }
                />
              </FormControl>
              <Flex justify={"right"} mt={"2vw"}>
                <Button colorScheme="gray" mr={3} onClick={onClose}>
                  Close
                </Button>
                {patching?<Button type="submit" isLoading loadingText="Changing">Save Changes</Button>:<Button type="submit">Save Changes</Button>}
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
