
import { useSelector } from "react-redux";

export const ROLE_PERMISSIONS = {
  viewer: {
    canCreateUser: false,
    canUpdateUser: false,
    canDeleteUser: false,
    canViewUser: true,
    canCreateGroups: false,
    canUpdateGroups: false,
    canDeleteGroups: false,
    canViewGroups: false,
  },
  manager: {
    canCreateUser: false,
    canUpdateUser: true,
    canDeleteUser: false,
    canViewUser: true,
    canCreateGroups: true,
    canUpdateGroups: true,
    canDeleteGroups: false,
    canViewGroups: true,
  },
};
export const usePermission = () => {
  const user = useSelector((state) => state.userDetails);
  return ROLE_PERMISSIONS[user?.role] || {};
};
