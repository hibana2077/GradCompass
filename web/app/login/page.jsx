'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MotionCard = motion(Card);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('登入資訊:', formData);
    } catch (err) {
      setError('登入失敗，請檢查您的帳號密碼是否正確');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.7
      }
    },
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    loading: {
      opacity: 0.8,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-md space-y-4">
        <motion.div
          className="text-center space-y-2"
          variants={titleVariants}
        >
          <motion.h1
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              GradCompass
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-500"
            variants={itemVariants}
          >
            專為台灣研究所推甄打造的導航平台
          </motion.p>
        </motion.div>

        <MotionCard
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -2 }}
          className="backdrop-blur-sm bg-white/90"
        >
          <CardHeader>
            <motion.h2
              className="text-xl font-semibold text-center"
              variants={itemVariants}
            >
              登入帳號
            </motion.h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium">使用者名稱</label>
                <MotionInput
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                  name="username"
                  type="text"
                  required
                  placeholder="請輸入使用者名稱"
                  value={formData.username}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium">密碼</label>
                <MotionInput
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                  name="password"
                  type="password"
                  required
                  placeholder="請輸入密碼"
                  value={formData.password}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <label className="flex items-center space-x-2">
                  <motion.input
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">記住我</span>
                </label>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  忘記密碼？
                </motion.a>
              </motion.div>

              <MotionButton
                type="submit"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                animate={isLoading ? "loading" : "idle"}
                className="w-full bg-blue-600 text-white rounded-full hover:text-black"
                disabled={isLoading}
              >
                {isLoading ? '登入中...' : 'Log In'}
              </MotionButton>
            </form>
          </CardContent>
          <CardFooter>
            <motion.p
              variants={itemVariants}
              className="text-center w-full text-sm text-gray-600"
            >
              還沒有帳號？
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                <a href="/register">註冊新帳號</a>
              </motion.a>
            </motion.p>
          </CardFooter>
        </MotionCard>

        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-gray-500"
        >
          登入即表示您同意我們的
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="text-blue-600 hover:text-blue-800 mx-1"
          >
            服務條款
          </motion.a>
          與
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="text-blue-600 hover:text-blue-800 mx-1"
          >
            隱私政策
          </motion.a>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoginPage;