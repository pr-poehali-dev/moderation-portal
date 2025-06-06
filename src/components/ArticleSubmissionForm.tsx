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
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">
          Отправить статью на модерацию
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Имя автора</label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Заголовок статьи
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок статьи"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Содержание</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите содержание статьи..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Ссылки на скриншоты (по одной на строку)
            </label>
            <Textarea
              value={screenshots}
              onChange={(e) => setScreenshots(e.target.value)}
              placeholder="https://example.com/screenshot1.png&#10;https://example.com/screenshot2.png"
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Комментарий для модератора (опционально)
            </label>
            <Textarea
              value={authorComment}
              onChange={(e) => setAuthorComment(e.target.value)}
              placeholder="Дополнительная информация для модератора..."
              className="min-h-[60px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Отправить на модерацию
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleSubmissionForm;
