import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Article, UserRole } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  userRole: UserRole;
  onApprove?: (id: string) => void;
  onReject?: (id: string, comment: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  userRole,
  onApprove,
  onReject,
}) => {
  const [rejectionComment, setRejectionComment] = React.useState("");

  const getStatusBadge = () => {
    const statusConfig = {
      pending: {
        variant: "secondary" as const,
        text: "На модерации",
        color: "bg-yellow-100 text-yellow-800",
      },
      approved: {
        variant: "default" as const,
        text: "Одобрено",
        color: "bg-green-100 text-green-800",
      },
      rejected: {
        variant: "destructive" as const,
        text: "Отклонено",
        color: "bg-red-100 text-red-800",
      },
    };

    const config = statusConfig[article.status];
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const handleReject = () => {
    if (onReject && rejectionComment.trim()) {
      onReject(article.id, rejectionComment.trim());
      setRejectionComment("");
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
            <p className="text-sm text-gray-600 mb-2">
              Автор: {article.authorName}
            </p>
            <p className="text-sm text-gray-500">
              {article.createdAt.toLocaleDateString("ru-RU")}
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Содержание:</h4>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
            {article.content}
          </p>
        </div>

        {article.screenshots.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Скриншоты:</h4>
            <ul className="space-y-1">
              {article.screenshots.map((url, index) => (
                <li key={index}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Скриншот {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.authorComment && (
          <div>
            <h4 className="font-medium mb-2">Комментарий автора:</h4>
            <p className="text-gray-600 bg-blue-50 p-3 rounded-md text-sm">
              {article.authorComment}
            </p>
          </div>
        )}

        {article.adminComment && (
          <div>
            <h4 className="font-medium mb-2">Комментарий администратора:</h4>
            <p className="text-gray-700 bg-red-50 p-3 rounded-md text-sm">
              {article.adminComment}
            </p>
          </div>
        )}

        {userRole === "admin" && article.status === "pending" && (
          <div className="flex flex-col space-y-3 pt-4 border-t">
            <div className="flex space-x-2">
              <Button
                onClick={() => onApprove?.(article.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                Одобрить
              </Button>
            </div>

            <div className="space-y-2">
              <Textarea
                value={rejectionComment}
                onChange={(e) => setRejectionComment(e.target.value)}
                placeholder="Комментарий для отклонения (обязательно)"
                className="min-h-[60px]"
              />
              <Button
                onClick={handleReject}
                disabled={!rejectionComment.trim()}
                variant="destructive"
              >
                Отклонить
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
