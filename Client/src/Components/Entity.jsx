import { StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Icon,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { RiEdit2Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import UpdateModal from "./UpdateModal";

const Entity = ({ data, length,setData,setDeleted,setUpdated }) => {
  
  const API_URI = import.meta.env.VITE_API_URI;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API_URI}/${data._id}`);
      setDeleted(res.data.message)
      setData(prev=>prev.filter(e=>e._id !== res.data.deletePlace._id))
      onClose()
    } catch (error) {}
  };
  const cancelRef = useRef();
  return (
    <>
      <Box
        maxW="sm"
        minW={"sm"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        my={"2vw"}
        mx={"auto"}
        boxShadow={"0 0 0.5vw #00000026"}
        _hover={{
          transform: "scale(1.03)",
          transition: "transform 0.3s",
        }}
        cursor={"pointer"}
      >
        <Image src={data.Image} w={"100%"} h={"40vh"} />

        <Box p="6">
          <Box
            display="flex"
            alignItems="baseline"
            justifyContent={"space-between"}
          >
            <Box>
              {data.ListingId > length - 5 && (
                <Badge
                  borderRadius="md"
                  px="2"
                  bgColor={"#ddc3ac"}
                  color="#00000099"
                >
                  New
                </Badge>
              )}
              <Box
                display={"inline"}
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="0.9vw"
                textTransform="uppercase"
                ml={data.ListingId > length - 5 && "2"}
              >
                {data.OpenHours == "" || data.OpenHours.includes(",")
                  ? "Uncertain"
                  : data.OpenHours}
              </Box>
            </Box>
            <Box>
              {/* <Button
                variant={"ghost"}
                w={"0px"}
                h={"30px"}
                _hover={{ bgColor: "#ddb99a33" }}
              >
                <Icon
                  as={RiEdit2Line}
                  color={"#ad8f76"}
                  w={"22px"}
                  h={"22px"}
                />
              </Button> */}
              <UpdateModal data={data} setUpdated={setUpdated} setData={setData}/>
              <Button
                onClick={onOpen}
                variant={"ghost"}
                w={"0px"}
                h={"30px"}
                _hover={{ bgColor: "#ddb99a33" }}
              >
                <DeleteIcon color={"#ad8f76"} />
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Place
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" onClick={()=>{
                          handleDelete()
                        }} ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Button>
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {data.Name}
          </Box>

          <Box>
            {data.SpendPerPerson}
            <Box as="span" color="gray.600" fontSize="sm">
              / person
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < data.Rating ? "#ad8f76" : "gray.300"}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Entity;
