import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image,Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Entity = () => {
  const dummyData = {
    _id: "65cc4c476fb792c7ef3bdc3c",
    ListingId: 1,
    Name: "Kitchen At 95",
    Image:
      "https://media-cdn.tripadvisor.com/media/photo-o/0e/5b/5c/b3/kitchen-at-95-multi-cuisine.jpg",
    Rating: 5,
    Location: "Ferozepur Road, Ludhiana 141012 India",
    SpendPerPerson: "₹800 - ₹2,000",
    Cuisines: "Chinese, Indian, Asian, Italian, International",
    OpenHours: "06:30 AM - 12:00 AM",
    PhoneNumber: "+91 82840 00231",
    Website: "http://ludhiana.regency.hyatt.com/en/hotel/our-hotel.html",
    Email: "atul.bhasin@hyatt.com",
    PostedBy: "spjyotiranjan",
  };
  return (
    <>
        <Heading textAlign={"center"}>Explore Food Places</Heading>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" my={'2vw'} mx={'auto'} boxShadow={'0 0 0.5vw #00000026'}>
          <Image src={dummyData.Image} />
    
          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="md" px="2" bgColor={'#ddc3ac'} color="#00000099">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {dummyData.OpenHours.includes(",")?"Changes Day to Day":`From ${dummyData.OpenHours.slice(0,8)} to ${dummyData.OpenHours.slice(8)}`}
              </Box>
            </Box>
    
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {dummyData.Name}
            </Box>
    
            <Box>
              {dummyData.SpendPerPerson}
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
                    color={i < dummyData.Rating ? "#ad8f76" : "gray.300"}
                  />
                ))}
            </Box>
          </Box>
        </Box>
    </>
  );
};

export default Entity;
