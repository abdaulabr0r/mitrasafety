import { db } from "./db";
import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type Category,
  type InsertCategory,
  type Order,
  type InsertOrder,
  users,
  products,
  categories,
  orders
} from "@shared/schema";
import { eq, and, gte, lte, sql, like } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(params: {
    query?: string;
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
  }): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryProductCount(categoryId: string, count: number): Promise<void>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async searchProducts(params: {
    query?: string;
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
  }): Promise<Product[]> {
    let conditions = [];

    if (params.query) {
      conditions.push(like(products.name, `%${params.query}%`));
    }

    if (params.categories && params.categories.length > 0) {
      const categoryConditions = params.categories.map(cat => eq(products.category, cat));
      conditions.push(sql`(${categoryConditions.join(' OR ')})`);
    }

    if (params.minPrice !== undefined) {
      conditions.push(gte(products.price, params.minPrice));
    }

    if (params.maxPrice !== undefined) {
      conditions.push(lte(products.price, params.maxPrice));
    }

    if (params.inStockOnly) {
      conditions.push(eq(products.inStock, true));
    }

    if (conditions.length === 0) {
      return await db.select().from(products);
    }

    return await db.select().from(products).where(and(...conditions));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategoryProductCount(categoryId: string, count: number): Promise<void> {
    await db.update(categories)
      .set({ productCount: count })
      .where(eq(categories.id, categoryId));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(order).returning();
    return result[0];
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }
}

export const storage = new DbStorage();
