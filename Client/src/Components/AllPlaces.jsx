import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Select,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Entity from "./Entity";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AllPlaces = ({ data, fetched, setData }) => {
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState("");
  const [userData, setUserData] = useState([]);
  const [userFetched, setUserFetched] = useState(false);
  const [updated, setUpdated] = useState("");
  const [select, setSelect] = useState("All");
  const USER_API = import.meta.env.VITE_USER_API_URI;
  const fetchUser = async () => {
    try {
      const res = await axios.get(USER_API);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const filteredData = data.filter((e)=>{
    return select=="All"?true:e.PostedBy === select
  })
  useEffect(() => {
    if (userData.length != 0) {
      setUserFetched(true);
    }
  }, [userData]);
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
    setUpdated("");
  }, [updated]);
  return (
    <Box>
      <ToastContainer />
      <Flex justify={"center"}>
        <Center>
          <Heading>Explore Food Places</Heading>
        </Center>
        {userFetched ? (
          <Select
            position={"absolute"}
            right={"4vw"}
            placeholder={"All"}
            w={"10vw"}
            onChange={(e) => {
              setSelect(e.target.value?e.target.value:'All');
            }}
          >
            {userData.map((e, i) => {
              return (
                <option key={i} value={e.Username}>
                  {e.Username}
                </option>
              );
            })}
          </Select>
        ) : (
          <Button
            position={"absolute"}
            right={"4vw"}
            w={"10vw"}
            variant={"outline"}
          >
            <Spinner />
          </Button>
        )}
      </Flex>
      <Flex wrap={"wrap"} my={"3vw"}>
        {fetched ? (
          show ? (
            filteredData.map((e, i) => {
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
          ) : filteredData.length > 9 ? (
            filteredData.slice(0, 9).map((e, i) => {
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
          ) : (
            filteredData.map((e, i) => {
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
      {fetched && filteredData.length > 9  && (
        <Flex justify={"center"} my={"2vw"}>
          <Button onClick={() => setShow(!show)}>
            {show ? "Show Less" : "Show More"}
          </Button>
        </Flex>
      )}
      {fetched && filteredData.length == 0 && 
      <Center><Heading>User has not Posted yet.</Heading></Center>}
    </Box>
  );
};

export default AllPlaces;
