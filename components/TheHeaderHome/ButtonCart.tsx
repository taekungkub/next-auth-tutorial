import { ActionIcon, Indicator } from "@mantine/core"
import { IconShoppingCart } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import CartDrawer from "@/components/CartDrawer"

function ButtonCart() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Indicator inline label={10} size={16} color="red">
        <ActionIcon variant="default" color="cyan" size="lg" aria-label="Settings" onClick={() => open()}>
          <IconShoppingCart stroke={1.5} />
        </ActionIcon>
      </Indicator>
      <CartDrawer opened={opened} close={close} />
    </>
  )
}

export default ButtonCart
