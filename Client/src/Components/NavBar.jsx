import React from "react";
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Link,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
const NavBar = () => {
  return (
    <Box mt={"2vw"} mx={'5vw'} position={"absolute"}>
      <Flex justify={"space-between"} width={"90vw"} align={"center"}>
        <Flex width={"28vw"} justify={"space-between"} align={"center"}>
          <Heading color={"white"}>Punjab Eats</Heading>
          <Flex width={"12vw"} justify={"space-between"} align={"center"}>
            <Link
              textShadow={"0 0 0.5vw black"}
              color="white"
              fontSize={"xl"}
              fontWeight={"semibold"}
            >
              Home
            </Link>
            <Link
              textShadow={"0 0 0.5vw black"}
              color="white"
              fontSize={"xl"}
              fontWeight={"semibold"}
            >
              About Us
            </Link>
          </Flex>
        </Flex>
        <Flex w={'15vw'} justify={"space-between"}>
        <ReactRouterLink to={'/userlogin'}>
            <Button
              bgColor={"#ddc3accc"}
              color={"#00000099"}
              boxShadow={"0 0 0.2vw -0.1vw black"}
              _hover={{ bgColor: "#ddb99acc" }}
            >
              Sign Up
            </Button>
          </ReactRouterLink>
          <ReactRouterLink to={'/post'}>
              <Button
              bgColor={"#ffffffcc"}
              leftIcon={<AddIcon boxSize={'12px'}/>}
              color={"#00000099"}
              boxShadow={"0 0 0.2vw -0.1vw black"}
              _hover={{ bgColor: "#d8d8d8cc" }}>
                Add Place
              </Button>
          </ReactRouterLink>
          {/* <Menu> 
                <MenuButton rightIcon={<ChevronDownIcon/>} as={Button}>Profile</MenuButton>
                <MenuList>
                    <MenuItem>Account</MenuItem>
                    <MenuItem>Favourites</MenuItem>
                    <MenuItem>Posts</MenuItem>
                </MenuList>
            </Menu> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
