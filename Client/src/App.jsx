import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { Box } from "@chakra-ui/react";
import Post from "./Components/Post";

function App() {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const API_URI = import.meta.env.VITE_API_URI;
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URI);
      setData(res.data);
      setFetched(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home data={data} fetched={fetched} />} />
        <Route path="/post" element={<Post fetchData={fetchData} />} />
      </Routes>
    </Box>
  );
}

export default App;
