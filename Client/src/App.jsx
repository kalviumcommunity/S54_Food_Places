import { useEffect, useState } from "react";
import AllPlaces from "./Components/AllPlaces";
import axios from "axios";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { Box } from "@chakra-ui/react";

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
      <NavBar />
      <Home />
      <AllPlaces data={data} fetched={fetched}/>
    </Box>
  );
}

export default App;
