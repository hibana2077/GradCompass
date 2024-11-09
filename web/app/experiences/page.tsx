import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, ArrowUpDown, School, Tag, Eye, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const ExperienceBrowsePage = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const experiences = [
    {
      id: 1,
      author: "王小明",
      school: "台灣大學",
      department: "資訊工程學系",
      year: "2024",
      title: "台大資工推甄心得分享",
      tags: ["資工", "推甄", "準備技巧"],
      isFeatured: true,
      views: 1250,
      createdAt: "2024-03-15",
      excerpt: "從準備考試到面試技巧，分享我的完整準備歷程與心得..."
    },
    {
      id: 2,
      author: "李小華",
      school: "清華大學",
      department: "電機工程學系",
      year: "2024",
      title: "從台科大到清大電機的準備歷程",
      tags: ["電機", "跨校推甄", "讀書計畫"],
      isFeatured: false,
      views: 980,
      createdAt: "2024-03-10",
      excerpt: "跨校推甄的心路歷程，分享如何提升競爭力..."
    }
  ];

  // 動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 頁面頭部背景 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">經驗分享</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            探索學長姐的申請歷程，找到屬於你的璀璨未來
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* 搜尋和篩選卡片 */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="搜尋經驗分享..."
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">最新發布</SelectItem>
                    <SelectItem value="popular">熱門程度</SelectItem>
                    <SelectItem value="featured">精選推薦</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="h-12 px-6">
                  <Filter className="h-5 w-5 mr-2" />
                  進階篩選
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 精選經驗區 */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              精選經驗
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {experiences
              .filter(exp => exp.isFeatured)
              .map(exp => (
                <motion.div key={exp.id} variants={itemVariants}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                            {exp.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            <div className="flex items-center text-gray-600 mb-2">
                              <School className="h-4 w-4 mr-2" />
                              {exp.school} {exp.department} | {exp.year} 入學
                            </div>
                            <p className="line-clamp-2 text-gray-600">{exp.excerpt}</p>
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                          精選
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline"
                            className="px-3 py-1 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <img
                            src="/api/placeholder/32/32"
                            alt={exp.author}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span>{exp.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {exp.views}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exp.createdAt}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* 所有經驗列表 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center mb-6">
            <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              所有經驗分享
            </h2>
          </div>
          <div className="grid gap-6">
            {experiences.map(exp => (
              <motion.div key={exp.id} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                          {exp.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          <div className="flex items-center text-gray-600 mb-2">
                            <School className="h-4 w-4 mr-2" />
                            {exp.school} {exp.department} | {exp.year} 入學
                          </div>
                          <p className="line-clamp-2 text-gray-600">{exp.excerpt}</p>
                        </CardDescription>
                      </div>
                      {exp.isFeatured && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                          精選
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline"
                          className="px-3 py-1 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <img
                          src="/api/placeholder/32/32"
                          alt={exp.author}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{exp.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {exp.views}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.createdAt}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceBrowsePage;