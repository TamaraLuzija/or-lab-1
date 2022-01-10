import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Spinner, VStack } from "@chakra-ui/react";
import { LinkButton } from "chakra-next-link";

const Home = () => {
  const { user, error, isLoading } = useUser();

  console.log(user, error, isLoading);

  return (
    <VStack>
      {isLoading ? (
        <Spinner />
      ) : !user ? (
        <LinkButton href="/api/auth/login?returnTo=/profile">Login</LinkButton>
      ) : (
        <>
          <LinkButton href="/profile">Profile</LinkButton>
          <LinkButton href="/api/auth/logout" colorScheme="red">
            Logout
          </LinkButton>
        </>
      )}
    </VStack>
  );
};

export default Home;
