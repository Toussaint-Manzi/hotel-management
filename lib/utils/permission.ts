import { PERMISSIONS } from "../constants/permissions";

export const hasPermission = (
  module: keyof typeof PERMISSIONS,
  action: keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS],
  userRoles?: string[]
) => {
  const allowedRoles = PERMISSIONS[module]?.[action] ?? [];
  if (!userRoles) return false;
  return allowedRoles.some((role) => userRoles.includes(role));
};
