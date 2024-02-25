import { Box, Heading } from "@chakra-ui/react";
import axios from 'axios'
import React, { useEffect, useState } from "react";

const AllPlaces = () => {
  const [data, setData] = useState([]);
  const API_URI = import.meta.env.VITE_API_URI
  const fetchData = async()=>{
    try {
        const res = await axios.get(API_URI)
        console.log(res);
        
    } catch (error) {
        
    }
  }
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <Box>
      <Heading textAlign={"center"}>Explore Food Places</Heading>
    </Box>
  );
};

export default AllPlaces;
