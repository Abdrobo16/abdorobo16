import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/sidebar";
import KpiCard from "@/components/kpi-card";
import LanguageSwitcher from "@/components/language-switcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Store, Activity, DollarSign, Plus, Edit, Ban, Eye, Trash } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function AdminPanel() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useTranslation();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'Admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  const { data: adminStores } = useQuery({
    queryKey: ["/api/admin/stores"],
    retry: false,
    enabled: user?.role === 'Admin',
  });

  if (isLoading || !isAuthenticated) {
    return null;
  }

  if (user?.role !== 'Admin') {
    return (
      <div className="flex h-screen bg-light-bg">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access the admin panel.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-light-bg">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-color mb-2">Admin Panel</h1>
            <p className="text-secondary-color">Manage users, stores, and system settings.</p>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <KpiCard
              title="Total Users"
              value="0"
              icon={Users}
              color="primary"
            />
            <KpiCard
              title="Total Stores"
              value={adminStores?.length?.toString() || "0"}
              icon={Store}
              color="success"
            />
            <KpiCard
              title="Transactions Today"
              value="0"
              icon={Activity}
              color="warning"
            />
            <KpiCard
              title="Total Value"
              value="$0.00"
              icon={DollarSign}
              color="info"
            />
          </div>

          {/* Admin Tabs */}
          <Card className="table-card">
            <Tabs defaultValue="users" className="w-full">
              <CardHeader className="border-b">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users" data-testid="tab-users">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="stores" data-testid="tab-stores">
                    <Store className="h-4 w-4 mr-2" />
                    All Stores
                  </TabsTrigger>
                  <TabsTrigger value="settings" data-testid="tab-settings">
                    Settings
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="users" className="p-0">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <Button size="sm" data-testid="button-add-user">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No users found in the system.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="stores" className="p-0">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">All Stores Overview</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminStores?.map((store: any) => (
                      <TableRow key={store.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                              <Store className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium" data-testid={`text-admin-store-name-${store.id}`}>{store.name}</div>
                              <div className="text-sm text-muted-foreground">ID: #{store.id.slice(0, 8)}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Store Owner</TableCell>
                        <TableCell>{new Date(store.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" data-testid={`button-admin-view-store-${store.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" data-testid={`button-admin-delete-store-${store.id}`}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!adminStores || adminStores.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No stores found in the system.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                  <div className="text-center py-8 text-muted-foreground">
                    System settings panel coming soon.
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
