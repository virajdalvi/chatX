import {
  Box,
  Container,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Text
        fontSize={"4xl"}
        color="white"
        fontFamily={"'Nunito', sans-serif"}
        p={4}
      >
        chatX
      </Text>
      <Box p={4} borderRadius="lg" w="100%" background={"#181D21"}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Login />
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <Signup />
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
