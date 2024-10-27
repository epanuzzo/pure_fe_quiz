"use client";

import React, { useState } from "react";
import Image from "next/image";
import MenuItems from "@/components/MenuItems";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { logout, isLoggedIn, isUserAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-8 border-solid border-b border-slate-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo1.jpg"
            height={60}
            width={60}
            quality={100}
            alt="Logo"
          />
          <MenuItems isAdmin={isUserAdmin} isLoggedIn={isLoggedIn} />
        </div>
        {isLoggedIn && (
          <div className="cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
