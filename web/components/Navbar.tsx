'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: "申請經驗",
      items: [
        { name: "瀏覽經驗分享", href: "/experiences" },
        { name: "填寫申請經驗", href: "/experiences/new" },
      ]
    },
    {
      title: "學校資料",
      items: [
        { name: "瀏覽學校", href: "/schools" },
        { name: "研究領域搜尋", href: "/schools/research" },
      ]
    },
    {
      title: "數據分析",
      items: [
        { name: "申請路徑圖", href: "/analytics/paths" },
        { name: "錄取統計", href: "/analytics/statistics" },
      ]
    },
    {
      title: "其他",
      items: [
        { name: "關於我們", href: "/about" },
      ]
    }
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">{process.env.NEXT_PUBLIC_UNIVERSITY_DEPARTMENT_ABBREVIATION || "CSIE"}</span>
              <span className="text-gray-600">GradCompass</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <span>{item.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded-xl shadow-lg border border-gray-200 min-w-[200px]">
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} className="hover:bg-gray-100 focus:bg-gray-100 rounded-xl">
                      <a href={subItem.href} className="w-full px-4 py-2 text-sm text-gray-700 hover:text-blue-600">
                        {subItem.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline">登入</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">註冊</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] bg-white">
                <SheetHeader className="border-b border-gray-200 pb-4">
                  <SheetTitle className="text-lg font-semibold text-gray-900">選單</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-6">
                  {menuItems.map((section) => (
                    <div key={section.title} className="space-y-3">
                      <div className="font-medium text-gray-900 px-2">{section.title}</div>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-2 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 space-y-3 border-t border-gray-200">
                    <Button className="w-full" variant="outline">
                      登入
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      註冊
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;