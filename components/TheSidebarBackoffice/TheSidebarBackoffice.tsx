"use client"
import { useEffect, useState } from "react"
import { IconLogout, IconBox, IconUser } from "@tabler/icons-react"
import classes from "./TheSidebarBackoffice.module.css"
import { logout } from "@/actions/user/logout"
import { usePathname, useRouter } from "next/navigation"
import { ScrollArea, rem } from "@mantine/core"

const data = [
  { link: "", label: "Product", icon: IconBox, path: "/admin/product" },
  { link: "", label: "User", icon: IconUser, path: "/admin/user" },
]

export function TheSidebarBackoffice() {
  const [active, setActive] = useState("Billing")
  const pathname = usePathname()
  const router = useRouter()

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={pathname.startsWith(item.path) || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
        router.push(item.path)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <ScrollArea h={`calc(100vh - ${rem(200)})`}>
        <div className={classes.navbarMain}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <a className={classes.link} onClick={(event) => logout()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
