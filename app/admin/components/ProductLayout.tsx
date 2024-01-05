"use client";
import { TheSidebar } from "@/app/admin/components/TheSidebar/TheSidebar";
import { AppShell, Burger, Container, Group, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProductLayout({ children }: Props) {

  const [opened, { toggle , close }] = useDisclosure();

  const pathname =usePathname()
  const router = useRouter()
  useEffect(()=>{
    close()
  },[pathname])

  return (
    <>
   <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}  onClick={()=> router.push('/')} style={{cursor:'pointer'}}>Backoffice</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <TheSidebar/>
        
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
    </>
  );
}
