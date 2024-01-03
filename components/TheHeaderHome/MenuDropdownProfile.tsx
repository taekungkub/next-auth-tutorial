"use client";
import { logout } from "@/actions/user/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Menu, Group, Text, Avatar, ActionIcon } from "@mantine/core";
import {
  IconSettings,
  IconTrash,
  IconChevronRight,
  IconLogin,
  IconPaperclip,
  IconWallpaper,
  IconAddressBook,
  IconHeart,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function MenuDropdownProfile() {
  const user = useCurrentUser();

  const router = useRouter();

  return (
    <div>
      <Group p="center">
        <Menu withArrow width={200} position="bottom" transitionProps={{ transition: "pop" }}>
          <Menu.Target>
            <ActionIcon variant={"transparent"}>
              <Avatar src={user?.image} radius={"xl"} size={"2.3rem"}>
                {user?.name?.slice(0, 2).toUpperCase()}
              </Avatar>
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {user ? (
              <>
                <Menu.Item leftSection={<IconPaperclip stroke={1.5} />} onClick={() => router.push("/account/order")}>
                  <Text>การสั่งซื้อของฉัน</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconWallpaper stroke={1.5} />} onClick={() => router.push("/account/settings")}>
                  <Text>บัญชีของฉัน</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconAddressBook stroke={1.5} />} onClick={() => router.push("/account/address-setting")}>
                  <Text>ที่อยู่ในการจัดส่ง</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconHeart stroke={1.5} />} onClick={() => router.push("/account/favorite")}>
                  <Text>สินค้าที่ชอบ</Text>
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item color="red" leftSection={<IconTrash stroke={1.5} />} onClick={() => logout()}>
                  <Text>ออกจากระบบ</Text>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item leftSection={<IconLogin />} onClick={() => router.push("/auth/signin")}>
                <Text>เข้าสู่ระบบ</Text>
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
}
