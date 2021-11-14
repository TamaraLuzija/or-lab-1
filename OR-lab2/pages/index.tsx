import React from "react";

import { VStack, HStack, Box, Heading, Code, SimpleGrid, Text } from "@chakra-ui/react";
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
          <VStack backgroundColor="gray.200">
            <Heading pt="10" size="xl" color="gray.600">
              {" "}
              Druga laboratorijska vjezba{" "}
            </Heading>
            <Heading pb="10" color="gray.800">
              {" "}
              Product catalog{" "}
            </Heading>

            <Text maxW="80%" textAlign="center" pb="10">
              Product catalog je aplikacija u kojoj mozemo vizualno pregledati nas otvoreni skup
              podataka (u ovo slucaju katalog tenisica), te ga mozemo pretrazivati po svim ili
              odredenim stupcima. Rezultate pretrage mozemo preuzeti u JSON ili CSV obliku
            </Text>

            <Text> Verzija 2.0 </Text>
            <Text> Autor: Tamara Luzija </Text>
            <HStack pt="10">
              <LinkButton colorScheme="green" href="/datatable">
                Datatable
              </LinkButton>
              <LinkButton colorScheme="orange" href="/all.csv">
                CSV
              </LinkButton>
              <LinkButton colorScheme="yellow" href="/all.json">
                JSON
              </LinkButton>
              <LinkButton colorScheme="teal" href="/schema.json" isExternal>
                Schema
              </LinkButton>
            </HStack>
          </VStack>
          <Box p="10">
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
