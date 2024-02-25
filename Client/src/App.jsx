import AllPlaces from "./Components/AllPlaces";
import Entity from "./Components/Entity";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <NavBar />
      <Home />
      <AllPlaces/>
    </Box>
  );
}

export default App;
