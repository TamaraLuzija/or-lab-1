import React from "react";
import { Box, Button, ChakraProvider, HStack, Link } from "@chakra-ui/react";
import { UserProvider } from "@auth0/nextjs-auth0";
import { LinkButton } from "chakra-next-link";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider resetCSS>
        <Box p="4" bg="purple.700" mb="4">
          <HStack>
            <LinkButton href="/">Home</LinkButton>
            <Link color="white" href="/result.json" isExternal>
              Download JSON
            </Link>
            <Link color="white" href="/result.csv" isExternal>
              Download CSV
            </Link>
          </HStack>
        </Box>

        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}
