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
    <Card className="w-full mb-6 bg-gradient-to-br from-gray-900 to-black border-gold-600/30 shadow-xl hover-gold-glow animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-gold-600/5 to-gold-400/5 border-b border-gold-600/20">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-3 text-gold-200">
              {article.title}
            </CardTitle>
            <p className="text-sm text-gold-300 mb-2 flex items-center">
              👤 Автор:{" "}
              <span className="ml-1 text-gold-200">{article.authorName}</span>
            </p>
            <p className="text-sm text-gold-400 flex items-center">
              📅 {article.createdAt.toLocaleDateString("ru-RU")}
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div>
          <h4 className="font-medium mb-3 text-gold-300 flex items-center">
            📖 Содержание:
          </h4>
          <p className="text-gold-100 bg-gray-800/50 p-4 rounded-lg border border-gold-600/20">
            {article.content}
          </p>
        </div>

        {article.screenshots.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-gold-300 flex items-center">
              🖼️ Скриншоты:
            </h4>
            <ul className="space-y-2">
              {article.screenshots.map((url, index) => (
                <li key={index}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 hover:underline text-sm transition-colors duration-200 flex items-center"
                  >
                    🔗 Скриншот {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.authorComment && (
          <div>
            <h4 className="font-medium mb-3 text-gold-300 flex items-center">
              💭 Комментарий автора:
            </h4>
            <p className="text-gold-200 bg-blue-900/20 p-4 rounded-lg text-sm border border-blue-500/30">
              {article.authorComment}
            </p>
          </div>
        )}

        {article.adminComment && (
          <div>
            <h4 className="font-medium mb-3 text-gold-300 flex items-center">
              ⚠️ Комментарий администратора:
            </h4>
            <p className="text-gold-100 bg-red-900/20 p-4 rounded-lg text-sm border border-red-500/30">
              {article.adminComment}
            </p>
          </div>
        )}

        {userRole === "admin" && article.status === "pending" && (
          <div className="flex flex-col space-y-4 pt-6 border-t border-gold-600/20">
            <div className="flex space-x-3">
              <Button
                onClick={() => onApprove?.(article.id)}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                ✅ Одобрить
              </Button>
            </div>

            <div className="space-y-3">
              <Textarea
                value={rejectionComment}
                onChange={(e) => setRejectionComment(e.target.value)}
                placeholder="Комментарий для отклонения (обязательно)"
                className="min-h-[60px] bg-gray-800/50 border-gold-600/30 text-gold-100 placeholder:text-gold-400/50 focus:border-gold-400 focus:ring-gold-400/30"
              />
              <Button
                onClick={handleReject}
                disabled={!rejectionComment.trim()}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                ❌ Отклонить
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
