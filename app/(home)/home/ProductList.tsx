"use client";

import CardProduct from "@/components/Cards/CardProduct";
import { Box, Container, Grid } from "@mantine/core";
import { Product } from "@prisma/client";

export function ProductList({ items }: { items: Product[] }) {
  const itemss = items?.map((v) => {
    return (
      <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 4 }} key={v.id}>
        <Box>
          <CardProduct data={v} />
        </Box>
      </Grid.Col>
    );
  });

  return (
    <Container  >
      <Grid>{itemss}</Grid>
    </Container>
  );
}
