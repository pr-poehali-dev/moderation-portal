import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

interface ModerationPanelProps {
  articles: Article[];
  onApprove: (id: string) => void;
  onReject: (id: string, comment: string) => void;
}

const ModerationPanel: React.FC<ModerationPanelProps> = ({
  articles,
  onApprove,
  onReject,
}) => {
  const pendingArticles = articles.filter(
    (article) => article.status === "pending",
  );
  const reviewedArticles = articles.filter(
    (article) => article.status !== "pending",
  );

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">
            Панель модерации статей
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {pendingArticles.length}
              </div>
              <div className="text-sm text-yellow-700">На модерации</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {articles.filter((a) => a.status === "approved").length}
              </div>
              <div className="text-sm text-green-700">Одобрено</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {articles.filter((a) => a.status === "rejected").length}
              </div>
              <div className="text-sm text-red-700">Отклонено</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {pendingArticles.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            Требуют модерации
            <Badge variant="secondary" className="ml-2">
              {pendingArticles.length}
            </Badge>
          </h3>

          {pendingArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              userRole="admin"
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </div>
      )}

      {reviewedArticles.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Обработанные статьи</h3>

          {reviewedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} userRole="admin" />
          ))}
        </div>
      )}

      {articles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Пока нет статей для модерации
        </div>
      )}
    </div>
  );
};

export default ModerationPanel;
