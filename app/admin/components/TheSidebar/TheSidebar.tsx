"use client";
import { useEffect, useState } from "react";
import { IconLogout, IconBox, IconUser } from "@tabler/icons-react";
import classes from "./TheSidebar.module.css";
import { logout } from "@/actions/user/logout";
import { usePathname, useRouter } from "next/navigation";

const data = [
  { link: "", label: "Product", icon: IconBox, path: "/admin/product" },
  { link: "", label: "User", icon: IconUser, path: "/admin/user" },
];

export function TheSidebar() {
  const [active, setActive] = useState("Billing");
  const pathname = usePathname();
  const router = useRouter();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={pathname.startsWith(item.path) || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.path);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

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
  );
}
