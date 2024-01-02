import { Box, Button, Card, Drawer, Group, Text, Title, useMantineTheme } from "@mantine/core"

import { useEffect } from "react"
import { useMediaQuery } from "@mantine/hooks"

interface Props {
  opened: boolean
  close: () => void
}

function CartDrawer({ opened, close }: Props) {
  const matches = useMediaQuery("(max-width: 48em)")

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position={!matches ? "right" : "bottom"}
        title="ตะกร้าสินค้า"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        size={!matches ? "350" : "100%"}
      >
        <Box px={20} style={{ display: "grid", height: "100%", alignItems: "center" }}>
          <Text c={"dimmed"} ta="center" mt={"md"}>
            คุณยังไม่ได้เลือกสินค้า
          </Text>
        </Box>
        <Card w={"100%"} bg={"white"} withBorder style={{ position: "fixed", bottom: 0, left: 0 }} pb={10}>
          <Group p="apart" mb={20}>
            <Title order={5} c="pink">
              ราคา (ยังไม่รวมค่าจัดส่ง)
            </Title>
            <Title order={4} c="pink">
              500.-
            </Title>
          </Group>

          <Button fullWidth color="pink" size="lg">
            สั่งสินค้า
          </Button>
        </Card>
      </Drawer>
    </>
  )
}

export default CartDrawer
