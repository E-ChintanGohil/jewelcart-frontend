// Simple API Client for Testing
// Replicates the logic from apiService.ts for testing purposes

class ApiClient {
  constructor() {
    this.baseURL = 'http://localhost:5001/api';
    this.authToken = null;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.authToken = response.token;
    }

    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.authToken = response.token;
    }

    return response;
  }

  async getCurrentUser() {
    const response = await this.request('/auth/me');
    return response.user;
  }

  logout() {
    this.authToken = null;
  }

  isAuthenticated() {
    return !!this.authToken;
  }

  // Product methods
  async getProducts(params = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    await this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Category methods
  async getCategories() {
    const response = await this.request('/categories');
    return response.categories;
  }

  // Material methods
  async getMaterials() {
    const response = await this.request('/materials');
    return response.materials;
  }

  // Customer methods
  async getCustomers(params = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const endpoint = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getCustomer(id) {
    return this.request(`/customers/${id}`);
  }

  async createCustomer(customerData) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }

  async updateCustomer(id, customerData) {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });
  }
}

export { ApiClient };