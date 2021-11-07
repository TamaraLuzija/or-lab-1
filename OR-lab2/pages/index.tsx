import React from "react";
import { useQuery } from "react-query";
import { useSortBy, useTable } from "react-table";
import {
  chakra,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  VStack,
  Box,
  Heading,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const getProducts = () => {
  return fetch("http://localhost:3000/api/list")
    .then((res) => res.json())
    .then((res) => res);
};

const columns = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "name",
    accessor: "name",
  },
  {
    Header: "short_description",
    accessor: "short_description",
  },
  {
    Header: "main_image",
    accessor: "main_image",
    Cell: ({ value }) => {
      return <Image aria-label="slika" src={value} />;
    },
  },
  {
    Header: "images",
    accessor: "images",
    Cell: ({ value }) => {
      return (
        <VStack>
          {JSON.parse(`[${value.slice(1, -1)}]`).map((image) => (
            <Image aria-label="slika" src={image} />
          ))}
        </VStack>
      );
    },
  },
  {
    Header: "description",
    accessor: "description",
  },
  {
    Header: "price",
    accessor: "price",
  },
  {
    Header: "stock",
    accessor: "stock",
  },
  {
    Header: "Raiting",
    accessor: "raiting",
  },
  {
    Header: "created_at",
    accessor: "created_at",
  },
  {
    Header: "shop_id",
    accessor: "shop_id",
  },
  {
    Header: "shop_slug",
    accessor: "shop_slug",
  },
  {
    Header: "shop_name",
    accessor: "shop_name",
  },
  {
    Header: "shop_description",
    accessor: "shop_description",
  },
  {
    Header: "shop_background_image",
    accessor: "shop_background_image",
  },
  {
    Header: "shop_address",
    accessor: "shop_address",
  },
  {
    Header: "shop_contact",
    accessor: "shop_contact",
  },
  {
    Header: "shop_rating",
    accessor: "shop_rating",
  },
  {
    Header: "shop_timezone",
    accessor: "shop_timezone",
  },
  {
    Header: "shop_created_at",
    accessor: "shop_created_at",
  },
];

const Home = () => {
  const { data } = useQuery("products", getProducts);

  const tableInstance = useTable({ columns, data: data || [] }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Box>
      <Flex width="100%">
        <Heading p="20px">Products list</Heading>
        <HStack>
          <Button
            colorScheme="blue"
            onClick={() => console.log("Export to json")}
          >
            JSON
          </Button>
          <Button
            colorScheme="green"
            onClick={() => console.log("Export to csv")}
          >
            CSV
          </Button>
        </HStack>
      </Flex>
      <Table {...getTableProps()} width="80%">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td wordBreak="break-all" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Home;
