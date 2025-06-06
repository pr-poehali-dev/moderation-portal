import React, { useState } from "react";
import { Article, UserRole } from "@/types/article";
import ArticleSubmissionForm from "@/components/ArticleSubmissionForm";
import ModerationPanel from "@/components/ModerationPanel";
import ArticleCard from "@/components/ArticleCard";
import RoleSwitch from "@/components/RoleSwitch";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [userRole, setUserRole] = useState<UserRole>("user");

  const handleSubmitArticle = (
    articleData: Omit<Article, "id" | "status" | "createdAt">,
  ) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date(),
    };

    setArticles((prev) => [newArticle, ...prev]);
  };

  const handleApproveArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, status: "approved" as const }
          : article,
      ),
    );
  };

  const handleRejectArticle = (id: string, comment: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, status: "rejected" as const, adminComment: comment }
          : article,
      ),
    );
  };

  const userArticles = articles.filter((article) =>
    userRole === "user" ? true : false,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Система модерации статей
          </h1>
          <p className="text-gray-600">
            Отправляйте статьи на модерацию и управляйте процессом проверки
          </p>
        </header>

        <RoleSwitch currentRole={userRole} onRoleChange={setUserRole} />

        <div className="flex flex-col items-center space-y-8">
          {userRole === "user" ? (
            <>
              <ArticleSubmissionForm onSubmit={handleSubmitArticle} />

              {articles.length > 0 && (
                <div className="w-full max-w-2xl">
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Ваши статьи
                  </h3>
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      userRole="user"
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <ModerationPanel
              articles={articles}
              onApprove={handleApproveArticle}
              onReject={handleRejectArticle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
