"use client";

import { IconHeart, IconShoppingCartPlus } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon, rem, Title, Flex, Rating } from "@mantine/core";
import { Product } from "@prisma/client";

interface BadgeCardProps {
  data: Product;
  onToggle?: () => void;
  onAddToCart?: () => void;
}

export default function CardProduct(product: BadgeCardProps) {
  return (
    <Card withBorder radius="md" p="md" style={{cursor:'pointer'}}>
      <Card.Section>
        <Image fit="cover" src={"/uploads/product/" + product.data.images[0]} alt={product.data.product_title} mah={180} />
      </Card.Section>

      <Card.Section p={"md"}>
        <Group p="apart">
          <Text fz="lg" fw={500} lineClamp={1}>
            {product.data.product_title}
          </Text>
        </Group>

        <Text fz="sm" mt="xs" c={"dimmed"} lineClamp={2}>
          {product.data.description}
        </Text>

        <Text fz="sm" mt="xs" lineClamp={2}>
          ${product.data.price}
        </Text>
      </Card.Section>
      <Group mt="xs">
        <Button  radius={"md"} style={{ flex: 1 }} onClick={product.onToggle}>
        Add To Cart
        </Button>
        <ActionIcon  variant="default" color="green" radius="md" size={36} onClick={product.onAddToCart}>
          <IconHeart size="1.25rem" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
