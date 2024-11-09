'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Save, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MarkdownEditor from 'react-markdown-editor-lite';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Badge } from '@/components/ui/badge';
import { marked } from 'marked';

// Markdown 編輯器設定
interface MarkdownParser {
    render: (text: string) => string;
}

const mdParser: MarkdownParser = {
    render: (text: string): any => {
        // 這裡可以使用任何 Markdown 解析器，例如 marked 或 remarkable
        return marked.parse(text);
    }
};

const ExperienceForm = () => {
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState(() => {
    // 試圖從 localStorage 讀取草稿
    const savedDraft = localStorage.getItem('experienceFormDraft');
    return savedDraft ? JSON.parse(savedDraft) : {
      title: '',
      currentSchool: '',
      currentDepartment: '',
      year: new Date().getFullYear(),
      tags: [],
      content: ''
    };
  });
  
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 自動儲存草稿
interface FormData {
    title: string;
    currentSchool: string;
    currentDepartment: string;
    year: number;
    tags: string[];
    content: string;
}

interface EditorChange {
    text: string;
}

const saveDraft = (newData: FormData): void => {
    localStorage.setItem('experienceFormDraft', JSON.stringify(newData));
};

interface ChangeEvent {
    target: {
        name: string;
        value: string;
    };
}

const handleChange = (e: ChangeEvent): void => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    saveDraft(newData);
};

  const handleEditorChange = ({ text }: { text: string }) => {
    const newData = { ...formData, content: text };
    setFormData(newData);
    saveDraft(newData);
  };

interface KeyboardEvent {
    key: string;
    preventDefault: () => void;
}

const handleTagInputKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && tagInput) {
        e.preventDefault();
        if (!formData.tags.includes(tagInput)) {
            const newTags = [...formData.tags, tagInput];
            const newData = { ...formData, tags: newTags };
            setFormData(newData);
            saveDraft(newData);
        }
        setTagInput('');
    }
};

interface RemoveTag {
    (tagToRemove: string): void;
}

const removeTag: RemoveTag = (tagToRemove) => {
    const newTags: string[] = formData.tags.filter((tag: string) => tag !== tagToRemove);
    const newData = { ...formData, tags: newTags };
    setFormData(newData);
    saveDraft(newData);
};

interface SubmitEvent {
    preventDefault: () => void;
}

const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    setError('');

    // 驗證必填欄位
    if (!formData.title || !formData.currentSchool || !formData.currentDepartment || !formData.content) {
        setError('請填寫所有必填欄位');
        return;
    }

    try {
        setIsSaving(true);
        // 這裡模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 成功後清除草稿
        localStorage.removeItem('experienceFormDraft');
        
        // 在實際應用中，這裡會是 API 呼叫
        console.log('Form submitted:', formData);
        
        // 重置表單或導向其他頁面
    } catch (err) {
        setError('儲存失敗，請稍後再試');
    } finally {
        setIsSaving(false);
    }
};

  const suggestedTags = ['資工', '資管', '電機', '推甄', '台大', '清大', '交大', '研究所'];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">填寫申請經驗</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">標題 *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="例：台大資工所推甄經驗分享"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentSchool">目前就讀學校 *</Label>
                <Input
                  id="currentSchool"
                  name="currentSchool"
                  value={formData.currentSchool}
                  onChange={handleChange}
                  placeholder="例：國立清華大學"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentDepartment">目前就讀系所 *</Label>
                <Input
                  id="currentDepartment"
                  name="currentDepartment"
                  value={formData.currentDepartment}
                  onChange={handleChange}
                  placeholder="例：資訊工程學系"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">申請年份</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  min="2000"
                  max="2100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">標籤</Label>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="輸入標籤後按 Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">建議標籤：</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          if (!formData.tags.includes(tag)) {
                            const newTags = [...formData.tags, tag];
                            const newData = { ...formData, tags: newTags };
                            setFormData(newData);
                            saveDraft(newData);
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>內文 *</Label>
              <MarkdownEditor
                ref={editorRef}
                value={formData.content}
                onChange={handleEditorChange}
                renderHTML={mdParser.render}
                className="h-[500px]"
                placeholder="在這裡分享你的申請經驗..."
              />
              <p className="text-sm text-muted-foreground">
                支援 Markdown 格式。使用工具列可以快速插入格式化文字。
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  if (window.confirm('確定要清除所有內容嗎？')) {
                    localStorage.removeItem('experienceFormDraft');
                    setFormData({
                      title: '',
                      currentSchool: '',
                      currentDepartment: '',
                      year: new Date().getFullYear(),
                      tags: [],
                      content: ''
                    });
                  }
                }}
              >
                清除
              </Button>
              <Button type="submit" disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? '儲存中...' : '儲存經驗'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceForm;