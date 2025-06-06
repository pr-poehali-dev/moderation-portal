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
    <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
      <span className="text-sm font-medium">Текущая роль:</span>
      <Badge variant={currentRole === "admin" ? "default" : "secondary"}>
        {currentRole === "admin" ? "Администратор" : "Пользователь"}
      </Badge>

      <div className="flex space-x-2">
        <Button
          size="sm"
          variant={currentRole === "user" ? "default" : "outline"}
          onClick={() => onRoleChange("user")}
        >
          Пользователь
        </Button>
        <Button
          size="sm"
          variant={currentRole === "admin" ? "default" : "outline"}
          onClick={() => onRoleChange("admin")}
        >
          Администратор
        </Button>
      </div>
    </div>
  );
};

export default RoleSwitch;
