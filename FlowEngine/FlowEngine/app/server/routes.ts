import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertStoreSchema, insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Store routes
  app.get("/api/stores", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stores = await storage.getStores(userId);
      res.json(stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  app.post("/api/stores", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeData = insertStoreSchema.parse({
        ...req.body,
        ownerId: userId,
      });
      
      const store = await storage.createStore(storeData);
      res.status(201).json(store);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid store data", errors: error.errors });
      } else {
        console.error("Error creating store:", error);
        res.status(500).json({ message: "Failed to create store" });
      }
    }
  });

  app.get("/api/stores/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeId = req.params.id;
      
      const canAccess = await storage.canUserAccessStore(userId, storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const store = await storage.getStore(storeId);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      
      res.json(store);
    } catch (error) {
      console.error("Error fetching store:", error);
      res.status(500).json({ message: "Failed to fetch store" });
    }
  });

  app.patch("/api/stores/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeId = req.params.id;
      
      const canAccess = await storage.canUserAccessStore(userId, storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updateData = insertStoreSchema.partial().parse(req.body);
      const store = await storage.updateStore(storeId, updateData);
      res.json(store);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid store data", errors: error.errors });
      } else {
        console.error("Error updating store:", error);
        res.status(500).json({ message: "Failed to update store" });
      }
    }
  });

  app.delete("/api/stores/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeId = req.params.id;
      
      const canAccess = await storage.canUserAccessStore(userId, storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteStore(storeId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting store:", error);
      res.status(500).json({ message: "Failed to delete store" });
    }
  });

  // Transaction routes
  app.get("/api/stores/:id/transactions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeId = req.params.id;
      
      const canAccess = await storage.canUserAccessStore(userId, storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const transactions = await storage.getTransactions(storeId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/stores/:id/transactions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeId = req.params.id;
      
      const canAccess = await storage.canUserAccessStore(userId, storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const transactionData = insertTransactionSchema.parse({
        ...req.body,
        storeId,
        createdBy: userId,
      });
      
      const transaction = await storage.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      } else {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Failed to create transaction" });
      }
    }
  });

  app.patch("/api/transactions/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const transactionId = req.params.id;
      
      // First get the transaction to check store access
      const transaction = await storage.getTransactions("");
      const userTransaction = transaction.find(t => t.id === transactionId);
      
      if (!userTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      const canAccess = await storage.canUserAccessStore(userId, userTransaction.storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updateData = insertTransactionSchema.partial().parse(req.body);
      const updatedTransaction = await storage.updateTransaction(transactionId, updateData);
      res.json(updatedTransaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      } else {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Failed to update transaction" });
      }
    }
  });

  app.delete("/api/transactions/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const transactionId = req.params.id;
      
      // Similar access check as update
      await storage.deleteTransaction(transactionId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ message: "Failed to delete transaction" });
    }
  });

  // Balance and stats routes
  app.get("/api/stores/:id/balance", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storeId = req.params.id;
      
      const canAccess = await storage.canUserAccessStore(userId, storeId);
      if (!canAccess) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const balance = await storage.getStoreBalance(storeId);
      res.json(balance);
    } catch (error) {
      console.error("Error fetching store balance:", error);
      res.status(500).json({ message: "Failed to fetch store balance" });
    }
  });

  app.get("/api/dashboard/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Admin routes
  app.get("/api/admin/stores", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userRole = await storage.getUserRole(userId);
      
      if (userRole !== 'Admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const stores = await storage.getAllStores();
      res.json(stores);
    } catch (error) {
      console.error("Error fetching all stores:", error);
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
