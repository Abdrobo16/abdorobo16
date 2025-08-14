import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Store, 
  BarChart3, 
  User, 
  Users, 
  LogOut 
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();

  const navigation = [
    { name: t("dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("stores"), href: "/stores", icon: Store },
    { name: t("reports"), href: "/reports", icon: BarChart3 },
    { name: t("profile"), href: "/profile", icon: User },
  ];

  const adminNavigation = [
    { name: t("adminPanel"), href: "/admin", icon: Users },
  ];

  return (
    <div className="bg-gradient-to-b from-primary to-blue-700 w-64 min-h-screen text-white shadow-2xl">
      <div className="p-6">
        {/* Logo Area */}
        <div className="flex items-center mb-8">
          <Store className="h-8 w-8 mr-3" />
          <div>
            <h2 className="text-xl font-bold">Store Manager</h2>
            <p className="text-blue-100 text-sm">Account System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-white bg-opacity-20 text-white transform translate-x-1"
                      : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white hover:transform hover:translate-x-1"
                  )}
                  data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}

          {/* Admin Section */}
          {user?.role === 'Admin' && (
            <>
              <div className="border-t border-white border-opacity-20 my-4"></div>
              {adminNavigation.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                        isActive
                          ? "bg-white bg-opacity-20 text-white transform translate-x-1"
                          : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white hover:transform hover:translate-x-1"
                      )}
                      data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </>
          )}

          {/* Logout */}
          <div className="border-t border-white border-opacity-20 my-4"></div>
          <div
            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white hover:transform hover:translate-x-1"
            onClick={() => window.location.href = "/api/logout"}
            data-testid="nav-link-logout"
          >
            <LogOut className="h-5 w-5 mr-3" />
            {t('logout')}
          </div>
        </nav>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center">
              {user.profileImageUrl && (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  data-testid="img-sidebar-profile"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate" data-testid="text-sidebar-user-name">
                  {user.firstName || user.lastName 
                    ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                    : 'User'
                  }
                </p>
                <p className="text-blue-100 text-sm truncate" data-testid="text-sidebar-user-role">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
