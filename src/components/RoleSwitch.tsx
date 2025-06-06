import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/article";

interface RoleSwitchProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSwitch: React.FC<RoleSwitchProps> = ({
  currentRole,
  onRoleChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 p-6 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-xl mb-8 border border-gold-600/30 backdrop-blur-sm hover-gold-glow animate-fade-in">
      <span className="text-sm font-medium text-gold-300">
        🎭 Текущая роль:
      </span>
      <Badge
        variant={currentRole === "admin" ? "default" : "secondary"}
        className={
          currentRole === "admin"
            ? "bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold"
            : "bg-gray-700 text-gold-300 border border-gold-600/30"
        }
      >
        {currentRole === "admin" ? "👑 Администратор" : "👤 Пользователь"}
      </Badge>

      <div className="flex space-x-3">
        <Button
          size="sm"
          variant={currentRole === "user" ? "default" : "outline"}
          onClick={() => onRoleChange("user")}
          className={
            currentRole === "user"
              ? "bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold hover:from-gold-500 hover:to-gold-400"
              : "border-gold-600/50 text-gold-300 hover:bg-gold-600/10 hover:text-gold-200"
          }
        >
          👤 Пользователь
        </Button>
        <Button
          size="sm"
          variant={currentRole === "admin" ? "default" : "outline"}
          onClick={() => onRoleChange("admin")}
          className={
            currentRole === "admin"
              ? "bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold hover:from-gold-500 hover:to-gold-400"
              : "border-gold-600/50 text-gold-300 hover:bg-gold-600/10 hover:text-gold-200"
          }
        >
          👑 Администратор
        </Button>
      </div>
    </div>
  );
};

export default RoleSwitch;
