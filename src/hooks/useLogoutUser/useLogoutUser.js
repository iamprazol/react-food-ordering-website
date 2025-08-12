import { useApp } from "../../context/AppContext";

export const useLogoutUser = (onSuccess) => {
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    onSuccess?.();
  };

  return { logout: handleLogout };
};
