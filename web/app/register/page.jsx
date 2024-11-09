'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// 將 InputField 移到組件外部定義
const InputField = ({ 
  label, 
  name, 
  type, 
  placeholder, 
  required = true, 
  pattern, 
  title,
  value,
  onChange 
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium" htmlFor={name}>
      {label}
    </label>
    <Input
      id={name}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern={pattern}
      title={title}
      className="bg-white/50 backdrop-blur-sm transition-colors hover:border-blue-400 focus:border-blue-500"
    />
  </div>
);

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('密碼與確認密碼不相符');
      return false;
    }
    if (formData.password.length < 8) {
      setError('密碼長度必須至少8個字元');
      return false;
    }
    if (!/^\d{8}$/.test(formData.studentId)) {
      setError('請輸入正確的9位數學號');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('註冊資訊:', formData);
      // TODO: 實作實際的註冊邏輯
    } catch (err) {
      setError('註冊失敗，請稍後再試');
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              GradCompass
            </span>
          </h1>
          <p className="text-gray-500">
            開始你的研究所申請之旅
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">
              建立新帳號
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <InputField
                label="學號"
                name="studentId"
                type="text"
                placeholder="請輸入8位數學號"
                pattern="\d{8}"
                title="請輸入8位數學號"
                value={formData.studentId}
                onChange={handleChange}
              />

              <InputField
                label="使用者名稱"
                name="username"
                type="text"
                placeholder="請設定使用者名稱"
                value={formData.username}
                onChange={handleChange}
              />

              <InputField
                label="電子信箱"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="密碼"
                name="password"
                type="password"
                placeholder="請設定至少8位數密碼"
                value={formData.password}
                onChange={handleChange}
              />

              <InputField
                label="確認密碼"
                name="confirmPassword"
                type="password"
                placeholder="請再次輸入密碼"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? '註冊中...' : '立即註冊'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center w-full text-sm text-gray-600">
              已經有帳號了？
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 ml-1 transition-colors"
              >
                立即登入
              </a>
            </p>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-gray-500">
          註冊即表示您同意我們的
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 mx-1 transition-colors"
          >
            服務條款
          </a>
          與
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 mx-1 transition-colors"
          >
            隱私政策
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;