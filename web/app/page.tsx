import React from 'react';
import { BookOpen, Users, BarChart2, GraduationCap, FileText, School } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1 text-blue-700 bg-blue-100 mb-4">
                <span className="text-sm font-medium">{process.env.NEXT_PUBLIC_UNIVERSITY_DEPARTMENT || "資工系"}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              研究所申請經驗分享平台
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              透過學長姐的申請經驗，規劃你的研究所之路
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full text-white">
              開始探索
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-6 w-6" />,
                title: "申請經驗分享",
                features: [
                  "基本資料與背景",
                  "學術成績與表現",
                  "申請準備過程",
                  "面試技巧與建議"
                ]
              },
              {
                icon: <School className="h-6 w-6" />,
                title: "學校資料庫",
                features: [
                  "各校系所介紹",
                  "研究領域分類",
                  "指導教授專長",
                  "實驗室研究方向"
                ]
              },
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: "視覺化工具",
                features: [
                  "申請路徑圖表",
                  "錄取率統計",
                  "分數分布分析",
                  "歷年趨勢追蹤"
                ]
              }
            ].map((section, i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "申請經驗" },
              { number: "20+", label: "合作學校" },
              { number: "95%", label: "錄取率" },
              { number: "1000+", label: "使用人數" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">分享你的申請經驗</h2>
          <p className="text-gray-600 mb-8">
            幫助學弟妹更好地規劃他們的研究所申請之路
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              填寫申請經驗
            </Button>
            <Button variant="outline">
              瀏覽經驗分享
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;