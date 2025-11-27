// Product Management Module Test Script
// Tests the actual this.api and business logic used in frontend

import { ApiClient } from './api-client.js';

class ProductTester {
  constructor() {
    this.results = [];
    this.testProductId = null;
    this.materials = [];
    this.categories = [];
    this.api = new ApiClient();
  }

  log(message, isSuccess = true) {
    const status = isSuccess ? '✅' : '❌';
    console.log(`${status} ${message}`);
    this.results.push({ message, success: isSuccess });
  }

  async runTests() {
    console.log('🛍️ Testing Product Management Module');
    console.log('====================================\n');

    // Ensure we're authenticated first
    await this.setupAuth();

    await this.testGetMaterials();
    await this.testGetCategories();
    await this.testGetEmptyProducts();
    await this.testCreateProduct();
    await this.testGetProducts();
    await this.testGetSingleProduct();
    await this.testUpdateProduct();
    await this.testDeleteProduct();

    this.printSummary();
  }

  async setupAuth() {
    console.log('Setup: Authentication');
    try {
      await this.api.login('admin@jewelcart.com', 'admin123');
      this.log('Authentication setup successful');
    } catch (error) {
      this.log(`Authentication setup failed: ${error.message}`, false);
      throw new Error('Cannot proceed without authentication');
    }
    console.log('');
  }

  async testGetMaterials() {
    console.log('Test 1: Get Materials');
    try {
      this.materials = await this.api.getMaterials();

      if (this.materials && this.materials.length > 0) {
        this.log('Get materials successful');
        this.log(`Found ${this.materials.length} materials`);

        // Check if materials have karats
        const goldMaterial = this.materials.find(m => m.name === 'Gold');
        if (goldMaterial && goldMaterial.karats && goldMaterial.karats.length > 0) {
          this.log(`Gold material has ${goldMaterial.karats.length} karat options`);
        } else {
          this.log('Gold material missing karat information', false);
        }
      } else {
        this.log('Get materials failed - no materials found', false);
      }
    } catch (error) {
      this.log(`Get materials failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetCategories() {
    console.log('Test 2: Get Categories');
    try {
      this.categories = await this.api.getCategories();

      if (this.categories && this.categories.length > 0) {
        this.log('Get categories successful');
        this.log(`Found ${this.categories.length} categories`);

        const categoryNames = this.categories.map(c => c.name);
        this.log(`Categories: ${categoryNames.join(', ')}`);
      } else {
        this.log('Get categories failed - no categories found', false);
      }
    } catch (error) {
      this.log(`Get categories failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetEmptyProducts() {
    console.log('Test 3: Get Products (Empty)');
    try {
      const response = await this.api.getProducts();

      if (response && response.products) {
        this.log('Get products API successful');
        if (response.products.length === 0) {
          this.log('Products list is empty as expected');
        } else {
          this.log(`Found ${response.products.length} existing products`);
        }
      } else {
        this.log('Get products failed - invalid response structure', false);
      }
    } catch (error) {
      this.log(`Get products failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testCreateProduct() {
    console.log('Test 4: Create Product');
    try {
      if (this.materials.length === 0 || this.categories.length === 0) {
        this.log('Cannot create product - missing materials or categories', false);
        return;
      }

      const goldMaterial = this.materials.find(m => m.name === 'Gold');
      const ringsCategory = this.categories.find(c => c.name === 'Rings');
      const karatOption = goldMaterial?.karats?.[0]; // Get first karat option (24K)

      if (!goldMaterial || !ringsCategory || !karatOption) {
        this.log('Cannot create product - missing required data', false);
        return;
      }

      const productData = {
        name: 'Test Diamond Gold Ring',
        description: 'Beautiful 18K gold ring with diamond for testing',
        categoryId: ringsCategory.id,
        subcategory: null,
        collection: null,
        stock: 5,
        sku: `TEST-${Date.now()}`,
        weight: 3.5,
        dimensions: null,
        materialId: goldMaterial.id,
        karatId: karatOption.id,
        gemstone: 'Diamond',
        certification: 'GIA',
        featured: true,
        basePrice: 2000.00,
        isActive: true,
        images: [],
        tags: ['diamond', 'engagement', 'luxury', 'test']
      };

      const createdProduct = await this.api.createProduct(productData);

      if (createdProduct && createdProduct.id) {
        this.testProductId = createdProduct.id;
        this.log('Create product successful');
        this.log(`Product ID: ${createdProduct.id}`);
        this.log(`Product name: ${createdProduct.name}`);
        this.log(`SKU: ${createdProduct.sku}`);

        // Check if price was calculated correctly
        if (createdProduct.price) {
          this.log(`Calculated price: ₹${createdProduct.price}`);
        }
      } else {
        this.log('Create product failed - no product ID returned', false);
      }
    } catch (error) {
      this.log(`Create product failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetProducts() {
    console.log('Test 5: Get Products (With Data)');
    try {
      const response = await this.api.getProducts();

      if (response && response.products && response.products.length > 0) {
        this.log('Get products with data successful');
        this.log(`Found ${response.products.length} product(s)`);

        const testProduct = response.products.find(p => p.id === this.testProductId);
        if (testProduct) {
          this.log('Test product found in products list');
        } else {
          this.log('Test product not found in products list', false);
        }
      } else {
        this.log('Get products failed - no products returned', false);
      }
    } catch (error) {
      this.log(`Get products failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetSingleProduct() {
    console.log('Test 6: Get Single Product');
    try {
      if (!this.testProductId) {
        this.log('Cannot test get single product - no product ID', false);
        return;
      }

      const product = await this.api.getProduct(this.testProductId);

      if (product && product.id === this.testProductId) {
        this.log('Get single product successful');
        this.log(`Product: ${product.name}`);
        this.log(`Category: ${product.category}`);
        this.log(`Price: ₹${product.price}`);
      } else {
        this.log('Get single product failed - invalid product data', false);
      }
    } catch (error) {
      this.log(`Get single product failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testUpdateProduct() {
    console.log('Test 7: Update Product');
    try {
      if (!this.testProductId) {
        this.log('Cannot test update product - no product ID', false);
        return;
      }

      const updateData = {
        name: 'Updated Test Diamond Gold Ring',
        description: 'Updated beautiful 18K gold ring with diamond',
        stock: 10,
        basePrice: 2500.00,
        featured: false
      };

      const updatedProduct = await this.api.updateProduct(this.testProductId, updateData);

      if (updatedProduct) {
        this.log('Update product successful');
        this.log(`Updated name: ${updatedProduct.name}`);
        this.log(`Updated stock: ${updatedProduct.stock}`);
        this.log(`Updated featured: ${updatedProduct.featured}`);
      } else {
        this.log('Update product failed - no response', false);
      }
    } catch (error) {
      this.log(`Update product failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testDeleteProduct() {
    console.log('Test 8: Delete Product');
    try {
      if (!this.testProductId) {
        this.log('Cannot test delete product - no product ID', false);
        return;
      }

      await this.api.deleteProduct(this.testProductId);
      this.log('Delete product successful');

      // Verify product is deleted
      try {
        await this.api.getProduct(this.testProductId);
        this.log('Product still exists after delete', false);
      } catch (error) {
        if (error.message.includes('404') || error.message.includes('not found')) {
          this.log('Product properly deleted - not found when requested');
        } else {
          this.log(`Unexpected error checking deleted product: ${error.message}`, false);
        }
      }
    } catch (error) {
      this.log(`Delete product failed: ${error.message}`, false);
    }
    console.log('');
  }

  printSummary() {
    const passed = this.results.filter(r => r.success).length;
    const total = this.results.length;

    console.log('📊 Test Summary');
    console.log('===============');
    console.log(`Passed: ${passed}/${total}`);

    if (passed === total) {
      console.log('🎉 All product management tests passed!');
    } else {
      console.log('⚠️ Some tests failed. Check the output above.');
    }
    console.log('');
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new ProductTester();
  tester.runTests().catch(console.error);
}

export { ProductTester };