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
    <div className="w-full max-w-4xl space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-gray-900 to-black border-gold-600/30 shadow-2xl hover-gold-glow">
        <CardHeader className="bg-gradient-to-r from-gold-600/10 to-gold-400/10 border-b border-gold-600/20">
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
            ⚡ Панель модерации статей
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 rounded-xl border border-yellow-500/30 hover-gold-glow">
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {pendingArticles.length}
              </div>
              <div className="text-sm text-yellow-300">⏳ На модерации</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-xl border border-green-500/30 hover-gold-glow">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {articles.filter((a) => a.status === "approved").length}
              </div>
              <div className="text-sm text-green-300">✅ Одобрено</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-600/20 to-red-500/10 rounded-xl border border-red-500/30 hover-gold-glow">
              <div className="text-3xl font-bold text-red-400 mb-1">
                {articles.filter((a) => a.status === "rejected").length}
              </div>
              <div className="text-sm text-red-300">❌ Отклонено</div>
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
