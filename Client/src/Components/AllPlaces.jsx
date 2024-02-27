import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Entity from "./Entity";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllPlaces = ({ data, fetched, setData }) => {
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState("");
  const [updated,setUpdated] = useState("")
  useEffect(() => {
    if (deleted !== "") {
      toast.success(deleted, {
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
  }, [deleted]);
  useEffect(() => {
    if (updated !== "") {
      toast.success(updated, {
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
    setUpdated("")
  }, [updated]);
  return (
    <Box>
      <ToastContainer />
      <Heading textAlign={"center"}>Explore Food Places</Heading>
      <Flex wrap={"wrap"} my={"3vw"}>
        {fetched ? (
          show ? (
            data.map((e, i) => {
              return (
                <Entity
                  key={i}
                  data={e}
                  length={data.length}
                  setData={setData}
                  setDeleted={setDeleted}
                />
              );
            })
          ) : (
            data.slice(0, 9).map((e, i) => {
              return (
                <Entity
                  key={i}
                  data={e}
                  length={data.length}
                  setData={setData}
                  setDeleted={setDeleted}
                  setUpdated={setUpdated}
                />
              );
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
        <Flex justify={"center"} my={"2vw"}>
          <Button onClick={() => setShow(!show)}>
            {show ? "Show Less" : "Show More"}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default AllPlaces;
