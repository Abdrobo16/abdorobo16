import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useRoute } from "wouter";
import Sidebar from "@/components/sidebar";
import KpiCard from "@/components/kpi-card";
import AddTransactionModal from "@/components/add-transaction-modal";
import LanguageSwitcher from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Plus, DollarSign, Clock, TrendingUp, Edit, Trash } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from 'react-i18next';

export default function StoreDetails() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [, params] = useRoute("/stores/:id");
  const storeId = params?.id;
  const [showAddTransaction, setShowAddTransaction] = useState(false);
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

  const { data: store } = useQuery({
    queryKey: ["/api/stores", storeId],
    retry: false,
  });

  const { data: transactions } = useQuery({
    queryKey: ["/api/stores", storeId, "transactions"],
    retry: false,
  });

  const { data: balance } = useQuery({
    queryKey: ["/api/stores", storeId, "balance"],
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return null;
  }

  if (!store) {
    return (
      <div className="flex h-screen bg-light-bg">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Store not found</h2>
            <p className="text-muted-foreground mb-4">The store you're looking for doesn't exist or you don't have access to it.</p>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
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
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Store Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-dark-color mb-2" data-testid="text-store-name">{store.name}</h1>
              <p className="text-secondary-color">Store ID: #{store.id.slice(0, 8)}</p>
            </div>
            <Button 
              onClick={() => setShowAddTransaction(true)}
              data-testid="button-add-transaction"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>

          {/* Store Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KpiCard
              title="Total Supplied"
              value={`$${balance?.totalSupplied || "0.00"}`}
              icon={Plus}
              color="success"
            />
            <KpiCard
              title="Outstanding Amount"
              value={`$${balance?.totalRemaining || "0.00"}`}
              icon={Clock}
              color="warning"
            />
            <KpiCard
              title="Net Balance"
              value={`$${balance?.netBalance || "0.00"}`}
              icon={TrendingUp}
              color="info"
            />
          </div>

          {/* Transaction History */}
          <Card className="table-card">
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex gap-2">
                {/* Search could be added here later */}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount Supplied</TableHead>
                    <TableHead>Amount Remaining</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.map((transaction: any) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium" data-testid={`text-transaction-date-${transaction.id}`}>
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </div>
                      </TableCell>
                      <TableCell className="text-success font-medium" data-testid={`text-amount-supplied-${transaction.id}`}>
                        ${transaction.amountSupplied}
                      </TableCell>
                      <TableCell className="text-warning font-medium" data-testid={`text-amount-remaining-${transaction.id}`}>
                        ${transaction.amountRemaining}
                      </TableCell>
                      <TableCell className="text-muted-foreground" data-testid={`text-notes-${transaction.id}`}>
                        {transaction.notes || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" data-testid={`button-edit-transaction-${transaction.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`button-delete-transaction-${transaction.id}`}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!transactions || transactions.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No transactions found. Add your first transaction to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddTransactionModal 
        open={showAddTransaction} 
        onOpenChange={setShowAddTransaction}
        storeId={storeId || ""}
      />
    </div>
  );
}
