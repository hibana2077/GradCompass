'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Search, MapPin, GraduationCap, ChevronRight, School } from "lucide-react";

const MOCK_SCHOOLS = [
  {
    id: 1,
    name: "國立臺灣大學",
    abbr: "NTU",
    location: "臺北市",
    programCount: 48,
    ranking: 1,
    programs: [
      { id: 1, name: "資訊工程學系", degree: "碩士班", faculty: "電機資訊學院" },
      { id: 2, name: "電機工程學系", degree: "碩士班", faculty: "電機資訊學院" },
      { id: 3, name: "資訊管理學系", degree: "碩士班", faculty: "管理學院" }
    ]
  },
  {
    id: 2,
    name: "國立清華大學",
    abbr: "NTHU",
    location: "新竹市",
    programCount: 42,
    ranking: 2,
    programs: [
      { id: 4, name: "資訊工程學系", degree: "碩士班", faculty: "電機資訊學院" },
      { id: 5, name: "電機工程學系", degree: "碩士班", faculty: "電機資訊學院" }
    ]
  },
  {
    id: 3,
    name: "國立交通大學",
    abbr: "NCTU",
    location: "新竹市",
    programCount: 36,
    ranking: 3,
    programs: [
      { id: 6, name: "資訊工程學系", degree: "碩士班", faculty: "電機資訊學院" },
      { id: 7, name: "電機工程學系", degree: "碩士班", faculty: "電機資訊學院" }
    ]
  }
];

const SchoolsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSchool, setSelectedSchool] = React.useState(null);

  const filteredSchools = MOCK_SCHOOLS.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.abbr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* 頁面標題區域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            探索研究所學程
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            瀏覽全台頂尖大學的研究所課程，找到最適合你的學術殿堂
          </p>
        </div>

        {/* 搜尋區域 */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜尋學校名稱或簡稱..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 學校列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchools.map(school => (
            <Card 
              key={school.id}
              className={`group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${selectedSchool?.id === school.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedSchool(school)}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold">
                    {school.name}
                  </CardTitle>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {school.abbr}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{school.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap size={16} className="mr-2" />
                    <span>{school.programCount} 個研究所學程</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-medium">查看詳細資訊</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 選中學校的詳細資訊 */}
        {selectedSchool && (
          <div className="mt-12">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{selectedSchool.name}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="inline-flex items-center mr-4">
                        <MapPin size={16} className="mr-1" />
                        {selectedSchool.location}
                      </span>
                      <span className="inline-flex items-center">
                        <School size={16} className="mr-1" />
                        全國排名 {selectedSchool.ranking}
                      </span>
                    </CardDescription>
                  </div>
                  <span className="text-3xl font-bold text-blue-600">{selectedSchool.abbr}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">研究所學程</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSchool.programs.map(program => (
                    <Card key={program.id} className="bg-white hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">{program.name}</CardTitle>
                        <CardDescription>
                          <div className="flex flex-col space-y-1">
                            <span className="text-blue-600">{program.faculty}</span>
                            <span>{program.degree}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolsPage;