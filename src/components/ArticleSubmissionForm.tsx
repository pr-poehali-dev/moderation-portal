import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Article } from "@/types/article";

interface ArticleSubmissionFormProps {
  onSubmit: (article: Omit<Article, "id" | "status" | "createdAt">) => void;
}

const ArticleSubmissionForm: React.FC<ArticleSubmissionFormProps> = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [screenshots, setScreenshots] = useState("");
  const [authorComment, setAuthorComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !authorName.trim()) {
      return;
    }

    const screenshotUrls = screenshots
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      screenshots: screenshotUrls,
      authorComment: authorComment.trim(),
      authorName: authorName.trim(),
    });

    // Очистка формы
    setTitle("");
    setContent("");
    setScreenshots("");
    setAuthorComment("");
    setAuthorName("");
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border-gold-600/30 shadow-2xl hover-gold-glow animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-gold-600/10 to-gold-400/10 border-b border-gold-600/20">
        <CardTitle className="text-3xl text-center bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
          📝 Отправить статью на модерацию
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in">
            <label className="block text-sm font-medium mb-2 text-gold-300">
              💫 Имя автора
            </label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Введите ваше имя"
              className="bg-gray-800/50 border-gold-600/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-400 focus:ring-gold-400/30"
              required
            />
          </div>

          <div className="animate-fade-in">
            <label className="block text-sm font-medium mb-2 text-gold-300">
              📰 Заголовок статьи
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок статьи"
              className="bg-gray-800/50 border-gold-600/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-400 focus:ring-gold-400/30"
              required
            />
          </div>

          <div className="animate-fade-in">
            <label className="block text-sm font-medium mb-2 text-gold-300">
              📄 Содержание
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите содержание статьи..."
              className="min-h-[120px] bg-gray-800/50 border-gold-600/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-400 focus:ring-gold-400/30"
              required
            />
          </div>

          <div className="animate-fade-in">
            <label className="block text-sm font-medium mb-2 text-gold-300">
              🖼️ Ссылки на скриншоты
            </label>
            <Textarea
              value={screenshots}
              onChange={(e) => setScreenshots(e.target.value)}
              placeholder="https://example.com/screenshot1.png&#10;https://example.com/screenshot2.png"
              className="min-h-[80px] bg-gray-800/50 border-gold-600/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-400 focus:ring-gold-400/30"
            />
          </div>

          <div className="animate-fade-in">
            <label className="block text-sm font-medium mb-2 text-gold-300">
              💬 Комментарий для модератора
            </label>
            <Textarea
              value={authorComment}
              onChange={(e) => setAuthorComment(e.target.value)}
              placeholder="Дополнительная информация для модератора..."
              className="min-h-[60px] bg-gray-800/50 border-gold-600/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-400 focus:ring-gold-400/30"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-semibold py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            🚀 Отправить на модерацию
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleSubmissionForm;
