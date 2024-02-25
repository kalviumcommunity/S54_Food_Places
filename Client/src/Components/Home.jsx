import React from "react";
import { Container, Image, Box, Heading, Flex, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import HomeBG from "./../assets/Restuarant_BG.png";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <>
      <Flex
        pt={"3vw"}
        px={"5vw"}
        height={"40vw"}
        backgroundImage={HomeBG}
        backgroundSize={"100%"}
        backgroundRepeat={"no-repeat"}
        align={"center"}
        borderRadius={'0 0 1vw 1vw'}
        mb={'3vw'}
      >
        <Flex height={"40%"} direction={"column"} justify={"space-between"}>
          <Heading size={"4xl"} color={"white"}>
            EAT
          </Heading>
          <Heading size={"4xl"} color={"white"}>
            EXPLORE
          </Heading>
          <Button
            colorScheme={"whiteAlpha"}
            rightIcon={<ArrowForwardIcon />}
            width={"fit-content"}
          >
            Explore Places
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
