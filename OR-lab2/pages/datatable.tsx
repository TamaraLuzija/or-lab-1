import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Spinner,
  Image,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { Form, FormHandler, InputField, ReactSelectField } from "chakra-form";
import { z } from "zod";
import Papa from "papaparse";

import { Product, ProductCatalog } from "../types";
import { LinkButton } from "chakra-next-link";
import Head from "next/head";
import { SearchIcon } from "@chakra-ui/icons";

const schema = z.object({
  search: z.string(),
  columns: z.array(z.string()),
});

const getProducts = (): Promise<ProductCatalog> => {
  return fetch("http://localhost:3000/api/list").then((res) => res.json());
};

const columns = [
  { label: "Name", value: "name" },
  { label: "Short description", value: "short_description" },
  { label: "Description", value: "description" },
  { label: "Price", value: "price" },
  { label: "Stock", value: "stock" },
  { label: "Rating", value: "rating" },
  { label: "Shop name", value: "shop_name" },
  { label: "Shop description", value: "shop_description" },
  { label: "Shop address", value: "shop_address" },
  { label: "Shop contact", value: "shop_contact" },
];

const Datatable = () => {
  const { data } = useQuery("products", getProducts);
  const [filteredData, setFilteredData] = useState<ProductCatalog>([]);
  const [shopId, setShopId] = useState<number | undefined>(undefined);
  const modalProps = useDisclosure();

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const onDownload = (format: "json" | "csv") => () => {
    let data = undefined;
    if (format === "csv") {
      data = Papa.unparse(filteredData);
    } else {
      data = JSON.stringify(filteredData, null, 2);
    }

    const dataStr = `data:text/${format};charset=utf-8,${encodeURIComponent(data)}`;

    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `productCatalog.${format}`);
    dlAnchorElem.click();
  };

  const formRef = useRef<FormHandler<typeof schema>>(null);

  if (!data) {
    return <Spinner />;
  }

  const shop = data.find((d) => d.shop_id === shopId);
  const openShop = (id: number) => () => {
    setShopId(id);
    modalProps.onOpen();
  };

  return (
    <>
      <Head>
        <title>Product datatable - druga laboratorijska vjezba</title>
        <meta
          name="description"
          content="Open product catalog for Nike shoes with json and csv + filtering"
        />
        <meta name="keywords" content="products,tenisice,Nike,open dataset,json,csv,open-source" />
        <meta name="author" content="Tamara Luzija" />
      </Head>
      <Modal {...modalProps} size="4xl">
        <ModalOverlay />
        <ModalContent>
          {shop && (
            <ModalBody>
              <ModalCloseButton />
              <ModalHeader>{shop.name}</ModalHeader>

              <DataTable
                data={Object.entries(shop).filter((row) => row[0].startsWith("shop")) as any[]}
                keys={["key", "value"] as const}
                mapper={{
                  key: (r) => r[0].slice(5),
                  value: (r) => {
                    switch (r[0]) {
                      case "shop_background_image":
                        return <Image src={r[1]} w="250px" />;
                      case "shop_created_at":
                        return new Date(r[1]).toLocaleString();
                      default:
                        return r[1];
                    }
                  },
                }}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <Form
        ref={formRef}
        schema={schema}
        initialValues={{ columns: ["name", "description"] }}
        onSubmit={(submitData) => {
          const filterByColumns: (keyof Product)[] =
            submitData.columns.length > 0 ? submitData.columns : columns.map((c) => c.value);

          setFilteredData(
            data.filter((row) =>
              filterByColumns.some((key) =>
                (row[key] as any).toString().toLowerCase().includes(submitData.search.toLowerCase())
              )
            )
          );
        }}
      >
        <Heading m="6"> Product Catalog </Heading>
        <Box display="flex" w="100%" justifyContent="space-around" pb="10">
          <HStack w="70%" align="flex-end">
            <InputField name="search" />
            <ReactSelectField name="columns" options={columns} />

            <HStack>
              <Button type="submit" colorScheme="green" rightIcon={<SearchIcon />}>
                Search
              </Button>
              <Button
                type="reset"
                colorScheme="blue"
                onClick={() => {
                  setFilteredData(data);
                  formRef.current.setValue("columns", []);
                }}
              >
                Clear
              </Button>
            </HStack>
          </HStack>
          <HStack align="flex-end">
            <Button onClick={onDownload("json")} colorScheme="orange">
              JSON
            </Button>
            <Button onClick={onDownload("csv")} colorScheme="yellow">
              CSV
            </Button>

            <LinkButton href="/schema.json" colorScheme="teal" isExternal>
              Schema
            </LinkButton>
          </HStack>
        </Box>
      </Form>

      <DataTable
        data={filteredData}
        keys={
          [
            "id",
            "name",
            "short_description",
            "main_image",
            "images",
            "description",
            "price",
            "stock",
            "rating",
            "created_at",
            "shop",
          ] as const
        }
        widths={{ id: 24, description: "64" }}
        labels={{
          id: `ID (${filteredData.length})`,
          short_description: "Short description",
          main_image: "Main image",
          created_at: "Created at",
        }}
        striped
        tableProps={{ td: { px: 4, py: 2 } }}
        mapper={{
          id: true,
          name: true,
          short_description: true,
          main_image: (row) => <Image aria-label="slika" src={row.main_image} w="260px" />,
          images: (row) => (
            <VStack>
              {row.images.map((image) => (
                <Image aria-label="slika" src={image} w="260px" />
              ))}
            </VStack>
          ),
          description: true,
          price: true,
          stock: true,
          rating: (row) => <Text>{row.rating}</Text>,
          created_at: (row) => new Date(row.created_at).toLocaleString(),
          shop: (row) => <Button onClick={openShop(row.shop_id)}>{row.shop_name}</Button>,
        }}
      />
    </>
  );
};

export default Datatable;
