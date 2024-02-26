import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import React from "react";

const Entity = ({ data, length }) => {
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
          <Box display="flex" alignItems="baseline">
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
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml={data.ListingId > length - 5 && "2"}
            >
              {data.OpenHours == "" || data.OpenHours.includes(",")
                ? "Uncertain"
                : data.OpenHours}
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
