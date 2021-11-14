import React from "react";

import { VStack, HStack, Box, Heading } from "@chakra-ui/react";
import { LinkButton } from "chakra-next-link";

const Home = () => {
  return (
    <Box display="flex" w="100vw" h="100vh">
      <VStack margin="0 auto" pt="20">
        <Heading p="10" size="2xl">
          {" "}
          Druga laboratorijska vjezba{" "}
        </Heading>
        <HStack>
          <LinkButton colorScheme="green" href="/datatable">
            Database
          </LinkButton>
          <LinkButton colorScheme="blue" href="/schema.json">
            Schema
          </LinkButton>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
