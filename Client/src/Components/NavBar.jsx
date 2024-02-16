import React from "react";
import {ChevronDownIcon} from "@chakra-ui/icons"
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
} from "@chakra-ui/react";
const NavBar = () => {
  return (
    <Box bgGradient='' pt={"2vw"} px={"5vw"} position={"absolute"}>
      <Flex justify={"space-between"} width={"90vw"} align={"center"}>
        <Heading color={"white"}>FOODISTA</Heading>
        <Flex width={"13vw"} justify={"space-between"} align={"center"}>
          <Link textShadow={'0 0 0.5vw black'} color="white" fontSize={"xl"} fontWeight={"semibold"}>
            Home
          </Link>
          <Link textShadow={'0 0 0.5vw black'} color="white" fontSize={"xl"} fontWeight={"semibold"}>
            About Us
          </Link>
        </Flex>
        <Flex>
            <Button colorScheme="teal">Sign Up</Button>
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
