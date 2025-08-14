import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/sidebar";
import KpiCard from "@/components/kpi-card";
import AddStoreModal from "@/components/add-store-modal";
import LanguageSwitcher from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Store, Eye, Edit } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAddStore, setShowAddStore] = useState(false);
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

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    retry: false,
  });

  const { data: stores, isLoading: storesLoading } = useQuery({
    queryKey: ["/api/stores"],
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-light-bg">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-dark-color mb-2">{t('dashboard')}</h1>
              <p className="text-secondary-color">{t('welcomeBack')}</p>
            </div>
            <div className="flex gap-3">
              <LanguageSwitcher />
              <Button 
                onClick={() => setShowAddStore(true)}
                data-testid="button-add-store"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('addStore')}
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <KpiCard
              title={t('totalStores')}
              value={stats?.totalStores?.toString() || "0"}
              icon={Store}
              color="primary"
            />
            <KpiCard
              title={t('totalSuppliedDashboard')}
              value={`$${stats?.totalSupplied || "0.00"}`}
              icon={Plus}
              color="success"
            />
            <KpiCard
              title={t('outstanding')}
              value={`$${stats?.totalRemaining || "0.00"}`}
              icon={Plus}
              color="warning"
            />
            <KpiCard
              title={t('netBalance')}
              value={`$${stats?.netBalance || "0.00"}`}
              icon={Plus}
              color="info"
            />
          </div>

          {/* Stores Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="table-card">
                <CardHeader className="border-b">
                  <CardTitle>{t('yourStores')}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('storeName')}</TableHead>
                        <TableHead>{t('status')}</TableHead>
                        <TableHead>{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stores?.map((store: any) => (
                        <TableRow key={store.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                                <Store className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium" data-testid={`text-store-name-${store.id}`}>{store.name}</div>
                                <div className="text-sm text-muted-foreground">ID: #{store.id.slice(0, 8)}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{t('active')}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Link href={`/stores/${store.id}`}>
                                <Button variant="outline" size="sm" data-testid={`button-view-store-${store.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button variant="outline" size="sm" data-testid={`button-edit-store-${store.id}`}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!stores || stores.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                            {t('noStoresFound')}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="kpi-card">
                <CardHeader className="border-b">
                  <CardTitle>{t('recentActivity')}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center py-8 text-muted-foreground">
                      {t('noRecentActivity')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AddStoreModal 
        open={showAddStore} 
        onOpenChange={setShowAddStore}
      />
    </div>
  );
}
