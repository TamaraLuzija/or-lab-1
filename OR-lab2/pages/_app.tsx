import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
