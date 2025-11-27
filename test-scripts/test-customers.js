// Customer Management Module Test Script
// Tests the actual this.api and business logic used in frontend

import { ApiClient } from './api-client.js';

class CustomerTester {
  constructor() {
    this.results = [];
    this.testCustomerId = null;
    this.api = new ApiClient();
  }

  log(message, isSuccess = true) {
    const status = isSuccess ? '✅' : '❌';
    console.log(`${status} ${message}`);
    this.results.push({ message, success: isSuccess });
  }

  async runTests() {
    console.log('👥 Testing Customer Management Module');
    console.log('====================================\n');

    // Ensure we're authenticated first
    await this.setupAuth();

    await this.testGetEmptyCustomers();
    await this.testCreateCustomer();
    await this.testGetCustomers();
    await this.testGetSingleCustomer();
    await this.testUpdateCustomer();
    await this.testAddCustomerNote();

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

  async testGetEmptyCustomers() {
    console.log('Test 1: Get Customers (Empty)');
    try {
      const response = await this.api.getCustomers();

      if (response && response.customers) {
        this.log('Get customers API successful');
        this.log(`Found ${response.customers.length} existing customers`);
      } else {
        this.log('Get customers failed - invalid response structure', false);
      }
    } catch (error) {
      this.log(`Get customers failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testCreateCustomer() {
    console.log('Test 2: Create Customer');
    try {
      const timestamp = Date.now();
      const customerData = {
        firstName: 'Test',
        lastName: 'Customer',
        email: `test.customer.${timestamp}@example.com`,
        phone: `+91-9876543${String(timestamp).slice(-3)}`,
        address: {
          street: '123 Test Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India'
        },
        dateOfBirth: '1990-01-15',
        preferences: ['rings', 'necklaces'],
        totalSpent: 0,
        orderCount: 0,
        leadSource: 'website',
        status: 'lead',
        notes: []
      };

      const createdCustomer = await this.api.createCustomer(customerData);

      if (createdCustomer && createdCustomer.id) {
        this.testCustomerId = createdCustomer.id;
        this.log('Create customer successful');
        this.log(`Customer ID: ${createdCustomer.id}`);
        this.log(`Customer name: ${createdCustomer.firstName} ${createdCustomer.lastName}`);
        this.log(`Email: ${createdCustomer.email}`);
        this.log(`Status: ${createdCustomer.status}`);
      } else {
        this.log('Create customer failed - no customer ID returned', false);
      }
    } catch (error) {
      this.log(`Create customer failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetCustomers() {
    console.log('Test 3: Get Customers (With Data)');
    try {
      const response = await this.api.getCustomers();

      if (response && response.customers && response.customers.length > 0) {
        this.log('Get customers with data successful');
        this.log(`Found ${response.customers.length} customer(s)`);

        const testCustomer = response.customers.find(c => c.id === this.testCustomerId);
        if (testCustomer) {
          this.log('Test customer found in customers list');
          this.log(`Customer: ${testCustomer.firstName} ${testCustomer.lastName}`);
        } else {
          this.log('Test customer not found in customers list', false);
        }
      } else {
        this.log('Get customers failed - no customers returned', false);
      }
    } catch (error) {
      this.log(`Get customers failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetSingleCustomer() {
    console.log('Test 4: Get Single Customer');
    try {
      if (!this.testCustomerId) {
        this.log('Cannot test get single customer - no customer ID', false);
        return;
      }

      const customer = await this.api.getCustomer(this.testCustomerId);

      if (customer && customer.id === this.testCustomerId) {
        this.log('Get single customer successful');
        this.log(`Customer: ${customer.firstName} ${customer.lastName}`);
        this.log(`Email: ${customer.email}`);
        this.log(`Phone: ${customer.phone}`);
        this.log(`Address: ${customer.address.city}, ${customer.address.state}`);
        this.log(`Status: ${customer.status}`);
      } else {
        this.log('Get single customer failed - invalid customer data', false);
      }
    } catch (error) {
      this.log(`Get single customer failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testUpdateCustomer() {
    console.log('Test 5: Update Customer');
    try {
      if (!this.testCustomerId) {
        this.log('Cannot test update customer - no customer ID', false);
        return;
      }

      const updateData = {
        firstName: 'Updated Test',
        lastName: 'Customer',
        phone: '+91-9876543999',
        status: 'customer',
        totalSpent: 5000,
        orderCount: 2,
        address: {
          street: '456 Updated Street',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India'
        }
      };

      const updatedCustomer = await this.api.updateCustomer(this.testCustomerId, updateData);

      if (updatedCustomer) {
        this.log('Update customer successful');
        this.log(`Updated name: ${updatedCustomer.firstName} ${updatedCustomer.lastName}`);
        this.log(`Updated phone: ${updatedCustomer.phone}`);
        this.log(`Updated status: ${updatedCustomer.status}`);
        this.log(`Updated city: ${updatedCustomer.address?.city}`);
      } else {
        this.log('Update customer failed - no response', false);
      }
    } catch (error) {
      this.log(`Update customer failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testAddCustomerNote() {
    console.log('Test 6: Add Customer Note');
    try {
      if (!this.testCustomerId) {
        this.log('Cannot test add customer note - no customer ID', false);
        return;
      }

      // Get current customer to see existing notes
      const customer = await this.api.getCustomer(this.testCustomerId);
      const currentNotes = customer.notes || [];

      const newNote = `Test note added on ${new Date().toLocaleDateString()}: Customer showed interest in diamond rings.`;
      const updatedNotes = [...currentNotes, newNote];

      const updatedCustomer = await this.api.updateCustomer(this.testCustomerId, {
        notes: updatedNotes
      });

      if (updatedCustomer && updatedCustomer.notes && updatedCustomer.notes.length > currentNotes.length) {
        this.log('Add customer note successful');
        this.log(`Notes count: ${updatedCustomer.notes.length}`);
        this.log(`Latest note: ${updatedCustomer.notes[updatedCustomer.notes.length - 1]}`);
      } else {
        this.log('Add customer note failed', false);
      }
    } catch (error) {
      this.log(`Add customer note failed: ${error.message}`, false);
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
      console.log('🎉 All customer management tests passed!');
    } else {
      console.log('⚠️ Some tests failed. Check the output above.');
    }
    console.log('');
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new CustomerTester();
  tester.runTests().catch(console.error);
}

export { CustomerTester };