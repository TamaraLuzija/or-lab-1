import React from "react";

import { VStack, HStack, Box, Heading, Code, SimpleGrid } from "@chakra-ui/react";
import { LinkButton } from "chakra-next-link";
import { DataTable } from "chakra-data-table";
import Head from "next/head";

const data = [
  { key: "id", description: "Identifikator proizvoda", type: "int" },
  { key: "name", description: "Naziv proizvoda", type: "string" },
  { key: "short_description", description: "Kratki opis ispod slike proizvoda", type: "string" },
  { key: "images", description: "Lista slika proizvoda", type: "string[]" },
  { key: "description", description: "Detaljan opis proizvoda", type: "string" },
  { key: "price", description: "Cijena proizvoda", type: "int" },
  { key: "stock", description: "Dostupna kolicina proizvoda", type: "int" },
  { key: "rating", description: "Ocijena proizvoda", type: "float" },
  {
    key: "created_at",
    description: "Vrijeme i datum kreiranja proizvoda u tablici",
    type: "datetime string",
  },
  { key: "shop_id", description: "Identifikator trgovine u kojoj se nalazi proizvod", type: "int" },
  { key: "shop_slug", description: "Skraceni naziv trgovine", type: "string" },
  { key: "shop_name", description: "Puni naziv trgovine", type: "string" },
  { key: "shop_description", description: "Generalni opis", type: "string" },
  { key: "shop_background_image", description: "Pozadinska slika trgovine", type: "string" },
  { key: "shop_address", description: "Adresa", type: "string" },
  { key: "shop_contact", description: "Kontakt", type: "string" },
  { key: "shop_rating", description: "Ocijena", type: "float" },
  {
    key: "shop_timezone",
    description: "Vremenska zona u kojoj se nalazi trgovina",
    type: "string",
  },
  {
    key: "shop_created_at",
    description: "Vrijeme i datum dodavanja trgovine u bazu",
    type: "datetime string",
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Product catalog - druga laboratorijska vjezba</title>
        <meta
          name="description"
          content="Open product catalog for Nike shoes with json and csv + filtering"
        />
        <meta name="keywords" content="products,tenisice,Nike,open dataset,json,csv,open-source" />
        <meta name="author" content="Tamara Luzija" />
      </Head>
      <Box display="flex" h="100vh">
        <SimpleGrid columns={2}>
          <VStack>
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
          <Box p="10" backgroundColor="gray.100">
            <DataTable
              data={data}
              title="Schema description"
              keys={["key", "description", "type"] as const}
              mapper={{
                key: [true, { fontWeight: "bold" }],
                description: true,
                type: (r) => <Code>{r.type}</Code>,
              }}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
