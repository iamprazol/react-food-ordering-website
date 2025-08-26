import { useAuth } from "../../../context/AuthContext";

export const useLogoutUser = (onSuccess) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onSuccess?.();
  };

  return { logout: handleLogout };
};
