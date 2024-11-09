import React from 'react';
import { Mail, MapPin, Phone, Github, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "網站功能",
      links: [
        { name: "瀏覽經驗分享", href: "/experiences" },
        { name: "填寫申請資料", href: "/experiences/new" },
        { name: "學校資料庫", href: "/schools" },
        { name: "申請路徑分析", href: "/analytics" },
      ]
    },
    {
      title: "資源連結",
      links: [
        { name: process.env.NEXT_PUBLIC_UNIVERSITY_DEPARTMENT_ABBREVIATION_CN || "資工系", href: process.env.NEXT_PUBLIC_UNIVERSITY_WEBSITE || "#" },
        { name: "研究所入學", href: "#" },
        { name: "常見問題", href: "/faq" },
        { name: "使用說明", href: "/guide" },
      ]
    },
    {
      title: "聯絡資訊",
      items: [
        {
          icon: <MapPin className="h-4 w-4" />,
          text: process.env.NEXT_PUBLIC_UNIVERSITY_ADDRESS || "貴系地址"
        },
        {
          icon: <Phone className="h-4 w-4" />,
          text: process.env.NEXT_PUBLIC_UNIVERSITY_PHONE || "貴系電話"
        },
        {
          icon: <Mail className="h-4 w-4" />,
          text: process.env.NEXT_PUBLIC_UNIVERSITY_EMAIL || "貴系信箱"
        }
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-blue-600">{process.env.NEXT_PUBLIC_UNIVERSITY_DEPARTMENT_ABBREVIATION || "CSIE"}</span>
              <span className="text-gray-600">GradCompass</span>
            </div>
            <p className="text-gray-600 text-sm">
              {process.env.NEXT_PUBLIC_UNIVERSITY_DEPARTMENT_ABBREVIATION_CN || "資工系"}研究所申請經驗分享平台，透過學長姐的申請經驗，幫助學生規劃最佳的研究所申請路徑。
            </p>
          </div>

          {/* Links sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              {section.links ? (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {section.items?.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      {item.icon}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} GradCompass. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/hibana2077/GradCompass"
                className="text-gray-600 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/ntucsie"
                className="text-gray-600 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;