// API Service for Jewelcart Backend
import {
  Product, Customer, Order, Category, User, Settings, Material
} from './localStorage';

const API_BASE_URL = 'http://localhost:5001/api';

// Auth token management
let authToken: string | null = localStorage.getItem('jewelbox_auth_token');

const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('jewelbox_auth_token', token);
  } else {
    localStorage.removeItem('jewelbox_auth_token');
  }
};

// API request helper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

class ApiService {
  // Authentication methods
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setAuthToken(response.token);
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: User; token: string }> {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    setAuthToken(response.token);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    // Determine which endpoint to use based on current route
    // Admin panel is under /console, customer areas are under other routes
    const isAdminRoute = window.location.pathname.startsWith('/console');
    const endpoint = isAdminRoute ? '/auth/me' : '/customer-auth/me';

    const response = await apiRequest(endpoint);
    return response.user;
  }

  logout(): void {
    setAuthToken(null);
    localStorage.removeItem('jewelbox_current_user');
  }

  // Customer Authentication methods
  async customerLogin(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await apiRequest('/customer-auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setAuthToken(response.token);
    return response;
  }

  async customerRegister(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: User; token: string }> {
    const response = await apiRequest('/customer-auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    setAuthToken(response.token);
    return response;
  }

  // Customer Order methods
  async getCustomerOrders(filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<Order[]> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/customer-orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.orders;
  }

  async getCustomerOrder(id: string): Promise<Order> {
    const response = await apiRequest(`/customer-orders/${id}`);
    return response.order;
  }

  async createCustomerOrder(orderData: any): Promise<Order> {
    const response = await apiRequest('/customer-orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return response.order;
  }

  // Customer Address methods
  async getCustomerAddresses(): Promise<any[]> {
    const response = await apiRequest('/customer-auth/addresses');
    return response.addresses;
  }

  async addCustomerAddress(addressData: any): Promise<any> {
    const response = await apiRequest('/customer-auth/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
    return response.address;
  }

  // Product methods
  async getProducts(filters?: {
    category?: string;
    collection?: string;
    material_type?: string;
    featured?: boolean;
    search?: string;
    min_price?: number;
    max_price?: number;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; pagination: any }> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiRequest(endpoint);
  }

  async getProduct(id: string): Promise<Product> {
    const response = await apiRequest(`/products/${id}`);
    return response.product;
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'price'>): Promise<Product> {
    const response = await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    return response.product;
  }

  async createProductWithImages(productData: any, imageFiles: File[]): Promise<Product> {
    const formData = new FormData();

    // Append product data
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('basePrice', productData.basePrice.toString());
    formData.append('categoryId', productData.categoryId.toString());
    formData.append('materialId', productData.materialId.toString());
    formData.append('karatId', productData.karatId.toString());
    formData.append('weight', productData.weight.toString());
    formData.append('stock', productData.stock.toString());
    formData.append('featured', productData.featured.toString());
    formData.append('isActive', productData.isActive.toString());

    if (productData.gemstone) formData.append('gemstone', productData.gemstone);
    if (productData.certification) formData.append('certification', productData.certification);
    if (productData.tags && productData.tags.length > 0) {
      formData.append('tags', JSON.stringify(productData.tags));
    }

    // Append image files
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_BASE_URL}/products/with-images`, {
      method: 'POST',
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      const error: any = new Error(data.error || `HTTP error! status: ${response.status}`);
      error.response = { data, status: response.status };
      throw error;
    }

    return data.product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const response = await apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.product;
  }

  async updateProductWithImages(id: string, productData: any, imageFiles: File[], keepExisting: boolean = true, primaryImageUrl?: string | null, imagesToDelete: string[] = []): Promise<Product> {
    const formData = new FormData();

    // Append product data
    if (productData.name) formData.append('name', productData.name);
    if (productData.description) formData.append('description', productData.description);
    if (productData.basePrice) formData.append('basePrice', productData.basePrice.toString());
    if (productData.categoryId) formData.append('categoryId', productData.categoryId.toString());
    if (productData.materialId) formData.append('materialId', productData.materialId.toString());
    if (productData.karatId) formData.append('karatId', productData.karatId.toString());
    if (productData.weight) formData.append('weight', productData.weight.toString());
    if (productData.stock !== undefined) formData.append('stock', productData.stock.toString());
    formData.append('featured', productData.featured.toString());
    formData.append('isActive', (productData.isActive !== false).toString());
    formData.append('keepExistingImages', keepExisting.toString());

    // Append primary image URL if specified
    if (primaryImageUrl) {
      formData.append('primaryImageUrl', primaryImageUrl);
    }

    // Append images to delete if specified
    if (imagesToDelete.length > 0) {
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
    }

    if (productData.gemstone) formData.append('gemstone', productData.gemstone);
    if (productData.certification) formData.append('certification', productData.certification);
    if (productData.tags && productData.tags.length > 0) {
      formData.append('tags', JSON.stringify(productData.tags));
    }

    // Append image files
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      const error: any = new Error(data.error || `HTTP error! status: ${response.status}`);
      error.response = { data, status: response.status };
      throw error;
    }

    return data.product;
  }

  async deleteProduct(id: string): Promise<void> {
    await apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    const response = await apiRequest('/categories');
    return response || [];
  }

  async getCategory(id: string): Promise<Category> {
    const response = await apiRequest(`/categories/${id}`);
    return response.category;
  }

  async createCategory(categoryData: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
    const response = await apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
    return response.category;
  }

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const response = await apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.category;
  }

  async deleteCategory(id: string): Promise<void> {
    await apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Customer methods
  async getCustomers(filters?: {
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Customer[]> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.customers;
  }

  async getCustomer(id: string): Promise<Customer> {
    const response = await apiRequest(`/customers/${id}`);
    return response.customer;
  }

  async createCustomer(customerData: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    const response = await apiRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
    return response.customer;
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const response = await apiRequest(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.customer;
  }

  // Order methods
  async getOrders(filters?: {
    status?: string;
    payment_status?: string;
    customer_id?: string;
    limit?: number;
    offset?: number;
  }): Promise<Order[]> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.orders;
  }

  async getOrder(id: string): Promise<Order> {
    const response = await apiRequest(`/orders/${id}`);
    return response.order;
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const response = await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return response.order;
  }

  async updateOrderStatus(id: string, status: string, paymentStatus?: string): Promise<Order> {
    const response = await apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, paymentStatus }),
    });
    return response.order;
  }

  // Material methods
  async getMaterials(): Promise<Material[]> {
    const response = await apiRequest('/materials');
    return response || [];
  }

  async getMaterial(id: string): Promise<Material> {
    const response = await apiRequest(`/materials/${id}`);
    return response.material;
  }

  async updateKaratPrice(materialId: string, karatId: string, pricePerGram: number): Promise<any> {
    const response = await apiRequest(`/materials/${materialId}/karats/${karatId}`, {
      method: 'PUT',
      body: JSON.stringify({ pricePerGram }),
    });
    return response.karat;
  }

  // Material CRUD operations
  async createMaterial(materialData: { name: string; type: 'GOLD' | 'SILVER'; isActive?: boolean }): Promise<any> {
    const response = await apiRequest('/materials', {
      method: 'POST',
      body: JSON.stringify(materialData),
    });
    return response.material;
  }

  async updateMaterial(id: string, updates: { name?: string; type?: 'GOLD' | 'SILVER'; isActive?: boolean }): Promise<any> {
    const response = await apiRequest(`/materials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.material;
  }

  async deleteMaterial(id: string): Promise<void> {
    await apiRequest(`/materials/${id}`, {
      method: 'DELETE',
    });
  }

  // Karat CRUD operations
  async createKarat(materialId: string, karatData: { value: string; purity: number; pricePerGram: number; isActive?: boolean }): Promise<any> {
    const response = await apiRequest(`/materials/${materialId}/karats`, {
      method: 'POST',
      body: JSON.stringify(karatData),
    });
    return response.karat;
  }

  async updateKarat(karatId: string, updates: { value?: string; purity?: number; pricePerGram?: number; isActive?: boolean }): Promise<any> {
    const response = await apiRequest(`/materials/karats/${karatId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.karat;
  }

  async deleteKarat(karatId: string): Promise<void> {
    await apiRequest(`/materials/karats/${karatId}`, {
      method: 'DELETE',
    });
  }

  // Update all karat prices based on base prices
  async updateAllKaratPrices(goldPrice: number, silverPrice: number): Promise<any> {
    const response = await apiRequest('/materials/update-prices', {
      method: 'POST',
      body: JSON.stringify({ goldPrice, silverPrice }),
    });
    return response;
  }

  // Settings methods
  async getSettings(): Promise<Settings> {
    const response = await apiRequest('/settings');
    return response.settings;
  }

  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    const response = await apiRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    return response.settings;
  }

  // User Preferences methods
  async getUserPreferences(): Promise<any> {
    const response = await apiRequest('/user-preferences');
    return response.preferences;
  }

  async updateUserPreferences(preferences: {
    notifications?: {
      email?: boolean;
      sms?: boolean;
      orderUpdates?: boolean;
      promotions?: boolean;
    };
    security?: {
      twoFactor?: boolean;
      sessionTimeout?: string;
    };
    preferences?: {
      theme?: string;
      language?: string;
    };
  }): Promise<any> {
    const response = await apiRequest('/user-preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
    return response.preferences;
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!authToken;
  }

  getAuthToken(): string | null {
    return authToken;
  }

  // Admin-specific product methods
  async getAdminProducts(filters?: any): Promise<{ products: Product[]; pagination: any }> {
    const queryParams = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/products/admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiRequest(endpoint);
  }

  async getProductStats(): Promise<any> {
    const response = await apiRequest('/products/stats');
    return response.stats;
  }

  async getOrderStats(): Promise<any> {
    const response = await apiRequest('/orders/stats');
    return response.stats;
  }

  async updateProductStock(id: string, quantity: number, operation: 'increase' | 'decrease'): Promise<number> {
    const response = await apiRequest(`/products/${id}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ quantity, operation }),
    });
    return response.newStock;
  }

  // Image upload methods
  async uploadProductImage(productId: string | number, imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/upload/product/${productId}`, {
      method: 'POST',
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  async uploadProductImages(productId: string | number, imageFiles: File[]): Promise<any> {
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_BASE_URL}/upload/product/${productId}/multiple`, {
      method: 'POST',
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  async deleteProductImage(productId: string | number, imageUrl: string): Promise<any> {
    const response = await apiRequest(`/upload/product/${productId}/image`, {
      method: 'DELETE',
      body: JSON.stringify({ imageUrl }),
    });
    return response;
  }

  async setPrimaryProductImage(productId: string | number, imageUrl: string): Promise<any> {
    const response = await apiRequest(`/upload/product/${productId}/image/primary`, {
      method: 'PUT',
      body: JSON.stringify({ imageUrl }),
    });
    return response;
  }

  // Initialize from localStorage token if exists
  static init(): ApiService {
    const token = localStorage.getItem('jewelbox_auth_token');
    if (token) {
      setAuthToken(token);
    }
    return new ApiService();
  }
}

export const apiService = ApiService.init();
export default apiService;