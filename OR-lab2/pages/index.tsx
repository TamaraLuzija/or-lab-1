import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Spinner, Image, Button, VStack, HStack } from "@chakra-ui/react";
import { DataTable } from "chakra-data-table";
import { Form, InputField, ReactSelectField } from "chakra-form";
import { z } from "zod";
import Papa from "papaparse";

import { Product, ProductCatalog } from "../types";
import { LinkButton } from "chakra-next-link";

const schema = z.object({
  search: z.string(),
  columns: z.array(z.string()),
});

const getProducts = (): Promise<ProductCatalog> => {
  return fetch("http://localhost:3000/api/list").then((res) => res.json());
};

const columns = [
  { label: "Name", value: "name" },
  { label: "Šort deskripšn", value: "short_description" },
];

const Home = () => {
  const { data } = useQuery("products", getProducts);
  const [filteredData, setFilteredData] = useState<ProductCatalog>([]);

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

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      <Form
        schema={schema}
        initialValues={{ columns: [] }}
        onSubmit={(submitData) => {
          const filterByColumns: (keyof Product)[] =
            submitData.columns.length > 0 ? submitData.columns : columns.map((c) => c.value);

          setFilteredData(
            data.filter((row) =>
              filterByColumns.some((key) =>
                (row[key] as any).toLowerCase().includes(submitData.search.toLowerCase())
              )
            )
          );
        }}
      >
        <InputField name="search" />
        <ReactSelectField name="columns" options={columns} />

        <HStack>
          <Button type="submit">Submit</Button>
          <Button onClick={() => setFilteredData(data)}>Clear</Button>

          <Button onClick={onDownload("json")}>JSON</Button>
          <Button onClick={onDownload("csv")}>CSV</Button>

          <LinkButton href="/schema.json">Schema</LinkButton>
        </HStack>
      </Form>

      <DataTable
        data={filteredData}
        keys={["id", "name", "short_description", "main_image", "images"] as const}
        labels={{ short_description: "Šort diskripšn", main_image: "Main image" }}
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
        }}
      />
    </>
  );
};

export default Home;
