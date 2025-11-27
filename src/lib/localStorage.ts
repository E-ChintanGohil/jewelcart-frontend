import { v4 as uuidv4 } from 'uuid';

export interface Material {
  id: string;
  name: string;
  type: 'GOLD' | 'SILVER';
  karats: Karat[];
  is_active?: boolean;
  isActive?: boolean;
  created_at?: string;
  createdAt?: string;
}

export interface Karat {
  id: string;
  value: string;
  purity: number;
  material_id?: number;
  materialId?: number;
  price_per_gram?: number;
  pricePerGram: number;
  is_active?: boolean;
  isActive?: boolean;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Base price without material calculation
  price: number; // Calculated price based on material and weight
  images: string[];
  category: string;
  subcategory?: string;
  collection?: string;
  tags: string[];
  materialId: string;
  karatId: string;
  gemstone?: string;
  weight: number; // Weight in grams
  dimensions?: string;
  stock: number;
  featured: boolean;
  isActive: boolean;
  sku: string;
  certification?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth?: string;
  preferences: string[];
  totalSpent: number;
  orderCount: number;
  leadSource: string;
  status: 'lead' | 'customer' | 'vip';
  notes: string[];
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerInfo: Customer;
  products: {
    productId: string;
    quantity: number;
  }[];
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  imageUrl?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  sort_order?: number;
  sortOrder?: number;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff';
  lastLogin?: string;
  createdAt: string;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  goldPrice: number;
  silverPrice: number;
  taxRate: number;
  shippingRate: number;
  freeShippingThreshold: number;
  currency: string;
  paymentMethods: string[];
  materials: Material[];
  createdAt: string;
}

class LocalStorageService {
  private static instance: LocalStorageService;
  
  private constructor() {
    this.initializeSettings();
    this.initializeSampleData();
    this.initializeProducts();
  }

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  private initializeSettings(): void {
    const existingSettings = localStorage.getItem('jewelbox_settings');
    if (!existingSettings) {
      const defaultMaterials: Material[] = [
        {
          id: 'gold-1',
          name: 'Gold',
          type: 'gold',
          karats: [
            { id: 'k-24', value: '24K', purity: 99.9, materialType: 'gold', pricePerGram: 5500 },
            { id: 'k-22', value: '22K', purity: 91.7, materialType: 'gold', pricePerGram: 5043 },
            { id: 'k-18', value: '18K', purity: 75, materialType: 'gold', pricePerGram: 4125 },
            { id: 'k-14', value: '14K', purity: 58.3, materialType: 'gold', pricePerGram: 3206 },
            { id: 'k-10', value: '10K', purity: 41.7, materialType: 'gold', pricePerGram: 2293 },
            { id: 'k-9', value: '9K', purity: 37.5, materialType: 'gold', pricePerGram: 2062 }
          ],
          createdAt: new Date().toISOString()
        },
        {
          id: 'silver-1',
          name: 'Silver',
          type: 'silver',
          karats: [
            { id: 's-999', value: '999 Fine', purity: 99.9, materialType: 'silver', pricePerGram: 80 },
            { id: 's-958', value: '958 Britannia', purity: 95.8, materialType: 'silver', pricePerGram: 77 },
            { id: 's-925', value: '925 Sterling', purity: 92.5, materialType: 'silver', pricePerGram: 74 },
            { id: 's-900', value: '900 Coin', purity: 90, materialType: 'silver', pricePerGram: 72 },
            { id: 's-800', value: '800 Standard', purity: 80, materialType: 'silver', pricePerGram: 64 }
          ],
          createdAt: new Date().toISOString()
        }
      ];

      const defaultSettings: Settings = {
        siteName: 'Jewelcart',
        siteDescription: 'Premium Jewelry Collection',
        logo: '',
        contact: {
          email: 'info@jewelcart.com',
          phone: '+91 98765 43210',
          address: '123 Jewelry Street, Mumbai, India'
        },
        goldPrice: 5500,
        silverPrice: 80,
        taxRate: 18,
        shippingRate: 100,
        freeShippingThreshold: 2000,
        currency: 'INR',
        paymentMethods: ['credit-card', 'debit-card', 'upi', 'net-banking'],
        materials: defaultMaterials,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('jewelbox_settings', JSON.stringify(defaultSettings));
    }
  }

  initializeSampleData() {
    const existingCategories = localStorage.getItem('jewelbox_categories');
    if (!existingCategories) {
      const sampleCategories: Category[] = [
        {
          id: uuidv4(),
          name: 'Rings',
          description: 'Engagement rings, wedding bands, and fashion rings',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=300&fit=crop',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Necklaces',
          description: 'Beautiful necklaces for every occasion',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=300&fit=crop',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Earrings',
          description: 'Elegant earrings to complement any look',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=300&fit=crop',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Bracelets',
          description: 'Stylish bracelets and bangles',
          image: 'https://images.unsplash.com/photo-1603561596112-6a132309c6d2?w=500&h=300&fit=crop',
          status: 'active',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('jewelbox_categories', JSON.stringify(sampleCategories));
    }

    // Initialize users if not exist
    const existingUsers = localStorage.getItem('jewelbox_users');
    if (!existingUsers) {
      const sampleUsers: User[] = [
        {
          id: uuidv4(),
          email: 'admin@jewelcart.com',
          password: 'admin123',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('jewelbox_users', JSON.stringify(sampleUsers));
    }

    // Initialize customers if not exist
    const existingCustomers = localStorage.getItem('jewelbox_customers');
    if (!existingCustomers) {
      const sampleCustomers: Customer[] = [
        {
          id: uuidv4(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '+91 98765 43210',
          address: {
            street: '123 Main St',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001',
            country: 'India'
          },
          dateOfBirth: '1985-06-15',
          preferences: ['Rings', 'Necklaces'],
          totalSpent: 250000,
          orderCount: 3,
          leadSource: 'Website',
          status: 'customer',
          notes: ['Preferred customer', 'Likes diamond jewelry'],
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('jewelbox_customers', JSON.stringify(sampleCustomers));
    }
  }

  private initializeProducts() {
    const existingProducts = localStorage.getItem('jewelbox_products');
    if (!existingProducts) {
      const settings = this.getSettings();
      const goldMaterial = settings.materials.find(m => m.type === 'gold');
      const silverMaterial = settings.materials.find(m => m.type === 'silver');
      
      const sampleProducts: Product[] = [
        {
          id: uuidv4(),
          name: "Classic Diamond Solitaire Ring",
          description: "Elegant solitaire ring with brilliant cut diamond, perfect for engagements",
          basePrice: 25000,
          price: this.calculateProductPrice(goldMaterial?.id || '', goldMaterial?.karats.find(k => k.value === '18K')?.id || '', 3.2, 25000),
          images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"
          ],
          category: "Rings",
          tags: ["engagement", "diamond", "luxury"],
          materialId: goldMaterial?.id || '',
          karatId: goldMaterial?.karats.find(k => k.value === '18K')?.id || '',
          gemstone: "Diamond",
          weight: 3.2,
          stock: 5,
          featured: true,
          isActive: true,
          sku: "DR001",
          certification: "GIA Certified",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: "Silver Chain Necklace",
          description: "Beautiful silver chain necklace with elegant design",
          basePrice: 5000,
          price: this.calculateProductPrice(silverMaterial?.id || '', silverMaterial?.karats.find(k => k.value === '925 Sterling')?.id || '', 15.5, 5000),
          images: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop"
          ],
          category: "Necklaces",
          tags: ["chain", "silver", "everyday"],
          materialId: silverMaterial?.id || '',
          karatId: silverMaterial?.karats.find(k => k.value === '925 Sterling')?.id || '',
          weight: 15.5,
          stock: 10,
          featured: false,
          isActive: true,
          sku: "SN002",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('jewelbox_products', JSON.stringify(sampleProducts));
    }
  }

  // Calculate product price based on material, karat, and weight
  calculateProductPrice(materialId: string, karatId: string, weight: number, basePrice: number = 0): number {
    const settings = this.getSettings();
    const material = settings.materials.find(m => m.id === materialId);
    
    if (!material) return basePrice;
    
    const karat = material.karats.find(k => k.id === karatId);
    if (!karat) return basePrice;
    
    // Use karat-specific price per gram
    const materialCost = karat.pricePerGram * weight;
    
    return Math.round(materialCost + basePrice);
  }

  // Product methods
  getProducts(): Product[] {
    const products = localStorage.getItem('jewelbox_products');
    return products ? JSON.parse(products) : [];
  }

  getProduct(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'price'>): Product {
    const products = this.getProducts();
    const calculatedPrice = this.calculateProductPrice(product.materialId, product.karatId, product.weight, product.basePrice);
    const newProduct: Product = { 
      ...product, 
      id: uuidv4(), 
      price: calculatedPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    localStorage.setItem('jewelbox_products', JSON.stringify(products));
    return newProduct;
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'price'>): Product {
    return this.addProduct(product);
  }

  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      return undefined;
    }

    const currentProduct = products[productIndex];
    const updatedProduct = { ...currentProduct, ...updates, updatedAt: new Date().toISOString() };
    
    // Recalculate price if material, karat, or weight changed
    if (updates.materialId || updates.karatId || updates.weight || updates.basePrice) {
      updatedProduct.price = this.calculateProductPrice(
        updatedProduct.materialId, 
        updatedProduct.karatId, 
        updatedProduct.weight, 
        updatedProduct.basePrice
      );
    }
    
    products[productIndex] = updatedProduct;
    localStorage.setItem('jewelbox_products', JSON.stringify(products));
    return updatedProduct;
  }

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem('jewelbox_products', JSON.stringify(updatedProducts));
  }

  // Customer methods
  getCustomers(): Customer[] {
    const customers = localStorage.getItem('jewelbox_customers');
    return customers ? JSON.parse(customers) : [];
  }

  getCustomer(id: string): Customer | undefined {
    const customers = this.getCustomers();
    return customers.find(customer => customer.id === id);
  }

  createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Customer {
    const customers = this.getCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    customers.push(newCustomer);
    localStorage.setItem('jewelbox_customers', JSON.stringify(customers));
    return newCustomer;
  }

  updateCustomer(id: string, updates: Partial<Customer>): Customer | undefined {
    const customers = this.getCustomers();
    const customerIndex = customers.findIndex(c => c.id === id);
    if (customerIndex !== -1) {
      customers[customerIndex] = { ...customers[customerIndex], ...updates };
      localStorage.setItem('jewelbox_customers', JSON.stringify(customers));
      return customers[customerIndex];
    }
    return undefined;
  }

  deleteCustomer(id: string): void {
    const customers = this.getCustomers();
    const updatedCustomers = customers.filter(c => c.id !== id);
    localStorage.setItem('jewelbox_customers', JSON.stringify(updatedCustomers));
  }

  // Category methods
  createCategory(category: Omit<Category, 'id' | 'createdAt'>): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      ...category,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    categories.push(newCategory);
    localStorage.setItem('jewelbox_categories', JSON.stringify(categories));
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | undefined {
    const categories = this.getCategories();
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex !== -1) {
      categories[categoryIndex] = { ...categories[categoryIndex], ...updates };
      localStorage.setItem('jewelbox_categories', JSON.stringify(categories));
      return categories[categoryIndex];
    }
    return undefined;
  }

  deleteCategory(id: string): void {
    const categories = this.getCategories();
    const updatedCategories = categories.filter(c => c.id !== id);
    localStorage.setItem('jewelbox_categories', JSON.stringify(updatedCategories));
  }

  // User methods
  getUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('jewelbox_users', JSON.stringify(users));
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('jewelbox_users', JSON.stringify(users));
      return users[userIndex];
    }
    return undefined;
  }

  // Order methods
  getOrders(): Order[] {
    const orders = localStorage.getItem('jewelbox_orders');
    return orders ? JSON.parse(orders) : [];
  }

  getOrder(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find(order => order.id === id);
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...order,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem('jewelbox_orders', JSON.stringify(orders));
    return newOrder;
  }

  updateOrder(id: string, updates: Partial<Order>): Order | undefined {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updates };
      localStorage.setItem('jewelbox_orders', JSON.stringify(orders));
      return orders[orderIndex];
    }
    return undefined;
  }

  deleteOrder(id: string): void {
    const orders = this.getOrders();
    const updatedOrders = orders.filter(o => o.id !== id);
    localStorage.setItem('jewelbox_orders', JSON.stringify(updatedOrders));
  }

  getCategories(): Category[] {
    const categories = localStorage.getItem('jewelbox_categories');
    return categories ? JSON.parse(categories) : [];
  }

  getUsers(): User[] {
    const users = localStorage.getItem('jewelbox_users');
    return users ? JSON.parse(users) : [];
  }

  // Settings methods
  getSettings(): Settings {
    const settings = localStorage.getItem('jewelbox_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      // Ensure materials array exists
      if (!parsed.materials) {
        parsed.materials = [];
      }
      return parsed;
    }
    
    // Initialize settings if none exist
    this.initializeSettings();
    return this.getSettings();
  }

  updateSettings(settings: Partial<Settings>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem('jewelbox_settings', JSON.stringify(updatedSettings));
    
    // Recalculate all product prices if gold/silver rates changed or materials updated
    if (settings.goldPrice !== undefined || settings.silverPrice !== undefined || settings.materials !== undefined) {
      this.updateAllProductPrices();
    }
  }

  // Material methods
  getMaterials(): Material[] {
    const settings = this.getSettings();
    return settings.materials || [];
  }

  addMaterial(material: Omit<Material, 'id' | 'createdAt'>): Material {
    const newMaterial: Material = {
      ...material,
      id: `material-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    const settings = this.getSettings();
    settings.materials = [...settings.materials, newMaterial];
    this.updateSettings(settings);
    return newMaterial;
  }

  updateMaterial(id: string, updates: Partial<Material>): void {
    const settings = this.getSettings();
    const materialIndex = settings.materials.findIndex(m => m.id === id);
    if (materialIndex !== -1) {
      settings.materials[materialIndex] = { ...settings.materials[materialIndex], ...updates };
      this.updateSettings(settings);
    }
  }

  deleteMaterial(id: string): void {
    const settings = this.getSettings();
    settings.materials = settings.materials.filter(m => m.id !== id);
    this.updateSettings(settings);
  }

  // Update all product prices when rates change
  private updateAllProductPrices(): void {
    const products = this.getProducts();
    const updatedProducts = products.map(product => ({
      ...product,
      price: this.calculateProductPrice(product.materialId, product.karatId, product.weight, product.basePrice),
      updatedAt: new Date().toISOString()
    }));
    localStorage.setItem('jewelbox_products', JSON.stringify(updatedProducts));
  }
}

export const localStorageService = LocalStorageService.getInstance();
