import {
  users,
  stores,
  transactions,
  storeUsers,
  type User,
  type UpsertUser,
  type Store,
  type InsertStore,
  type Transaction,
  type InsertTransaction,
  type StoreUser,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sum, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Store operations
  getStores(userId: string): Promise<Store[]>;
  getAllStores(): Promise<Store[]>;
  getStore(id: string): Promise<Store | undefined>;
  createStore(store: InsertStore): Promise<Store>;
  updateStore(id: string, store: Partial<InsertStore>): Promise<Store>;
  deleteStore(id: string): Promise<void>;
  
  // Transaction operations
  getTransactions(storeId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: string, transaction: Partial<InsertTransaction>): Promise<Transaction>;
  deleteTransaction(id: string): Promise<void>;
  
  // Balance operations
  getStoreBalance(storeId: string): Promise<{
    totalSupplied: string;
    totalRemaining: string;
    netBalance: string;
  }>;
  
  getDashboardStats(userId: string): Promise<{
    totalStores: number;
    totalSupplied: string;
    totalRemaining: string;
    netBalance: string;
  }>;
  
  // User access control
  canUserAccessStore(userId: string, storeId: string): Promise<boolean>;
  getUserRole(userId: string): Promise<string>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Store operations
  async getStores(userId: string): Promise<Store[]> {
    const userRole = await this.getUserRole(userId);
    
    if (userRole === 'Admin') {
      return await db.select().from(stores).orderBy(desc(stores.createdAt));
    }
    
    // For StoreOwner and Clerk, get stores they have access to
    const userStores = await db
      .select({ store: stores })
      .from(stores)
      .leftJoin(storeUsers, eq(stores.id, storeUsers.storeId))
      .where(
        and(
          eq(stores.ownerId, userId)
        )
      )
      .orderBy(desc(stores.createdAt));
    
    return userStores.map(row => row.store);
  }

  async getAllStores(): Promise<Store[]> {
    return await db.select().from(stores).orderBy(desc(stores.createdAt));
  }

  async getStore(id: string): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store;
  }

  async createStore(store: InsertStore): Promise<Store> {
    const [newStore] = await db.insert(stores).values(store).returning();
    return newStore;
  }

  async updateStore(id: string, store: Partial<InsertStore>): Promise<Store> {
    const [updatedStore] = await db
      .update(stores)
      .set({ ...store, updatedAt: new Date() })
      .where(eq(stores.id, id))
      .returning();
    return updatedStore;
  }

  async deleteStore(id: string): Promise<void> {
    await db.delete(stores).where(eq(stores.id, id));
  }

  // Transaction operations
  async getTransactions(storeId: string): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.storeId, storeId))
      .orderBy(desc(transactions.date));
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async updateTransaction(id: string, transaction: Partial<InsertTransaction>): Promise<Transaction> {
    const [updatedTransaction] = await db
      .update(transactions)
      .set({ ...transaction, updatedAt: new Date() })
      .where(eq(transactions.id, id))
      .returning();
    return updatedTransaction;
  }

  async deleteTransaction(id: string): Promise<void> {
    await db.delete(transactions).where(eq(transactions.id, id));
  }

  // Balance operations
  async getStoreBalance(storeId: string): Promise<{
    totalSupplied: string;
    totalRemaining: string;
    netBalance: string;
  }> {
    const result = await db
      .select({
        totalSupplied: sum(transactions.amountSupplied),
        totalRemaining: sum(transactions.amountRemaining),
      })
      .from(transactions)
      .where(eq(transactions.storeId, storeId));

    const totalSupplied = result[0]?.totalSupplied || "0.00";
    const totalRemaining = result[0]?.totalRemaining || "0.00";
    const netBalance = (parseFloat(totalSupplied) - parseFloat(totalRemaining)).toFixed(2);

    return {
      totalSupplied,
      totalRemaining,
      netBalance,
    };
  }

  async getDashboardStats(userId: string): Promise<{
    totalStores: number;
    totalSupplied: string;
    totalRemaining: string;
    netBalance: string;
  }> {
    const userStores = await this.getStores(userId);
    const storeIds = userStores.map(store => store.id);

    if (storeIds.length === 0) {
      return {
        totalStores: 0,
        totalSupplied: "0.00",
        totalRemaining: "0.00",
        netBalance: "0.00",
      };
    }

    const result = await db
      .select({
        totalSupplied: sum(transactions.amountSupplied),
        totalRemaining: sum(transactions.amountRemaining),
      })
      .from(transactions)
      .where(sql`${transactions.storeId} = ANY(${storeIds})`);

    const totalSupplied = result[0]?.totalSupplied || "0.00";
    const totalRemaining = result[0]?.totalRemaining || "0.00";
    const netBalance = (parseFloat(totalSupplied) - parseFloat(totalRemaining)).toFixed(2);

    return {
      totalStores: userStores.length,
      totalSupplied,
      totalRemaining,
      netBalance,
    };
  }

  // User access control
  async canUserAccessStore(userId: string, storeId: string): Promise<boolean> {
    const userRole = await this.getUserRole(userId);
    
    if (userRole === 'Admin') {
      return true;
    }
    
    const [store] = await db
      .select()
      .from(stores)
      .where(eq(stores.id, storeId));
    
    if (!store) {
      return false;
    }
    
    // Check if user is owner
    if (store.ownerId === userId) {
      return true;
    }
    
    // Check if user has access through storeUsers table
    const [access] = await db
      .select()
      .from(storeUsers)
      .where(
        and(
          eq(storeUsers.storeId, storeId),
          eq(storeUsers.userId, userId)
        )
      );
    
    return !!access;
  }

  async getUserRole(userId: string): Promise<string> {
    const [user] = await db.select({ role: users.role }).from(users).where(eq(users.id, userId));
    return user?.role || 'StoreOwner';
  }
}

export const storage = new DatabaseStorage();
