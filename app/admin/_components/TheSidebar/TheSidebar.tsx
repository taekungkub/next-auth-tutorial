"use client"
import { useState } from "react"
import { Group, Code } from "@mantine/core"
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconBrandProducthunt,
  IconBox,
  IconUser,
} from "@tabler/icons-react"
import classes from "./TheSidebar.module.css"
import { logout } from "@/actions/user/logout"

const data = [
  { link: "", label: "Product", icon: IconBox },
  { link: "", label: "User", icon: IconUser },
]

export function TheSidebar() {
  const [active, setActive] = useState("Billing")

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a className={classes.link} onClick={(event) => logout()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
