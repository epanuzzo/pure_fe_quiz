import React from "react";
import Link from "next/link";

interface MenuItemProps {
  url: string;
  text: string;
}

interface MenuItemsProps {
  isAdmin?: boolean;
  isLoggedIn?: boolean;
  wrapperClassName?: string;
  menuItems?: MenuItemProps[];
}

const MenuItems: React.FC<MenuItemsProps> = ({
  isAdmin = false,
  isLoggedIn = false,
  wrapperClassName = "",
  menuItems = [{ url: "/", text: "Home" }],
}) => {
  if (!isLoggedIn) {
    menuItems.push({ url: "/register", text: "Register" });
  }
  if (isAdmin) {
    menuItems.push({ url: "/admin", text: "Admin" });
  }
  return (
    <nav className={`flex space-x-4 pl-4 ${wrapperClassName}`}>
      {menuItems.map((item: MenuItemProps) => (
        <Link href={item.url} className="text-1xl" key={item.url} passHref>
          {item.text}
        </Link>
      ))}
    </nav>
  );
};

export default MenuItems;
