import React, { useState } from "react";
import { useToast, Button, Heading, VStack } from "@chakra-ui/react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { LinkButton } from "chakra-next-link";

const Profile = () => {
  const { user, error, isLoading } = useUser();

  const toast = useToast();
  const [regenerateLoading, setRegenerateLoading] = useState(false);
  const [regenerateError, setRegenerateError] = useState();
  const regenerate = async () => {
    setRegenerateLoading(true);
    setRegenerateError(undefined);

    fetch("/api/regenerate", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          setRegenerateError(data.description || "Error");
        } else {
          toast({ status: "success", title: "Regenerated successfully" });
        }
      })
      .finally(() => setRegenerateLoading(false));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <VStack>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Button onClick={regenerate} isLoading={regenerateLoading}>
          Regenerate
        </Button>
        {regenerateError && <Heading size="sm">{regenerateError}</Heading>}
        <LinkButton colorScheme="red" href="/api/auth/logout">
          Logout
        </LinkButton>
      </VStack>
    )
  );
};

export default withPageAuthRequired(Profile);
