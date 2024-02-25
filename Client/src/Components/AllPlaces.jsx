import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Entity from "./Entity";

const AllPlaces = ({data,fetched}) => {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Heading textAlign={"center"}>Explore Food Places</Heading>
      <Flex wrap={"wrap"} my={"3vw"}>
        {fetched ? (
          show ? (
            data.map((e, i) => {
              return <Entity key={i} data={e} length={data.length}/>;
            })
          ) : (
            data.slice(0, 9).map((e, i) => {
              return <Entity key={i} data={e} length={data.length}/>;
            })
          )
        ) : (
          <Spinner
            margin={"auto"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#ad8f76"
            size="xl"
          />
        )}
      </Flex>
      {fetched && (
        <Flex justify={'center'} my={'2vw'}>
            <Button onClick={() => setShow(!show)} >
              {show ? "Show Less" : "Show More"}
            </Button>
        </Flex>
      )}
    </Box>
  );
};

export default AllPlaces;
