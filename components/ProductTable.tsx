"use client"
import { ActionIcon, Box, Button, Flex, Group, Text, TextInput } from "@mantine/core"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import sortBy from "lodash/sortBy"
import { IconChevronUp, IconEdit, IconEye, IconSelector, IconTrash } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { Product } from "@prisma/client"

interface Props {
  data: Array<Product>
}

const PAGE_SIZES = [10, 15, 20]

export default function ProductsTable({ data }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1])

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Product>>({ columnAccessor: "#", direction: "asc" })
  const [records, setRecords] = useState(sortBy(data.slice(0, pageSize), "id"))

  useEffect(() => {
    const myData = sortBy(data, sortStatus.columnAccessor)

    setRecords(sortStatus.direction === "desc" ? myData.reverse() : myData)
  }, [sortStatus, data])

  useEffect(() => {
    const from = (page - 1) * pageSize
    const to = from + pageSize
    setRecords(data.slice(from, to))
  }, [page, pageSize])

  const router = useRouter()

  return (
    <>
      <Flex justify={"between"} mb={"md"} gap={"md"}>
        <TextInput placeholder="Search" />
        <Button onClick={() => router.push("/admin/product/add")}>Add</Button>
      </Flex>
      <DataTable
        withTableBorder
        withColumnBorders
        striped
        highlightOnHover
        textSelectionDisabled
        mih={150}
        records={records}
        columns={[
          {
            accessor: "id",
            title: "#",
            textAlign: "center",
            sortable: true,
          },
          { title: "Product", accessor: "product_title", sortable: true },
          { title: "Desc", accessor: "description", width: 200 },
          { title: "Price", accessor: "price", sortable: true, render: ({ price }: Product) => <Text>${price}</Text> },
          { title: "Stock", accessor: "stock", sortable: true },
          {
            title: "Action",
            accessor: "actions",
            textAlign: "center",

            render: (product) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon size="sm" variant="subtle" color="green">
                  <IconEye size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => router.push("/admin/product/" + product.id + "/edit")}>
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="subtle" color="red">
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        sortIcons={{
          sorted: <IconChevronUp size={16} />,
          unsorted: <IconSelector size={16} />,
        }}
        totalRecords={data.length}
        paginationActiveBackgroundColor="grape"
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        // onRowClick={({ record, index, event }) => {
        //   openModal({
        //     title: "Product information",
        //     children: (
        //       <Stack>
        //         <Text size="sm">
        //           You clicked on row[{index}], referring to company <em>{record.title}</em>.
        //           <br />
        //         </Text>
        //       </Stack>
        //     ),
        //   })
        // }}
      />
    </>
  )
}
