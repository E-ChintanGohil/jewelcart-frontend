// Authentication Module Test Script
// Tests the actual this.api and business logic used in frontend

import { ApiClient } from './api-client.js';

class AuthTester {
  constructor() {
    this.results = [];
    this.testToken = null;
    this.api = new ApiClient();
  }

  log(message, isSuccess = true) {
    const status = isSuccess ? '✅' : '❌';
    console.log(`${status} ${message}`);
    this.results.push({ message, success: isSuccess });
  }

  async runTests() {
    console.log('🔐 Testing Authentication Module');
    console.log('================================\n');

    await this.testAdminLogin();
    await this.testGetCurrentUser();
    await this.testStaffRegistration();
    await this.testInvalidLogin();
    await this.testLogout();

    this.printSummary();
  }

  async testAdminLogin() {
    console.log('Test 1: Admin Login');
    try {
      const response = await this.api.login('admin@jewelcart.com', 'admin123');

      if (response.token && response.user) {
        this.testToken = response.token;
        this.log('Admin login successful');
        this.log(`User role: ${response.user.role}`);
        this.log(`Token received and stored`);
      } else {
        this.log('Admin login failed - missing token or user data', false);
      }
    } catch (error) {
      this.log(`Admin login failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testGetCurrentUser() {
    console.log('Test 2: Get Current User');
    try {
      if (!this.testToken) {
        this.log('Cannot test getCurrentUser - no token available', false);
        return;
      }

      const user = await this.api.getCurrentUser();

      if (user && user.email === 'admin@jewelcart.com') {
        this.log('Get current user successful');
        this.log(`User: ${user.first_name} ${user.last_name} (${user.role})`);
      } else {
        this.log('Get current user failed - invalid user data', false);
      }
    } catch (error) {
      this.log(`Get current user failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testStaffRegistration() {
    console.log('Test 3: Staff Registration');
    try {
      const userData = {
        email: `test-${Date.now()}@jewelcart.com`,
        password: 'staff123',
        firstName: 'Test',
        lastName: 'Staff',
        role: 'staff'
      };

      const response = await this.api.register(userData);

      if (response.user && response.token) {
        this.log('Staff registration successful');
        this.log(`New user: ${response.user.first_name} ${response.user.last_name}`);
        this.log(`Role: ${response.user.role}`);
      } else {
        this.log('Staff registration failed - missing user or token', false);
      }
    } catch (error) {
      this.log(`Staff registration failed: ${error.message}`, false);
    }
    console.log('');
  }

  async testInvalidLogin() {
    console.log('Test 4: Invalid Login');
    try {
      await this.api.login('invalid@test.com', 'wrongpassword');
      this.log('Invalid login should have failed but succeeded', false);
    } catch (error) {
      if (error.message.includes('Invalid') || error.message.includes('Unauthorized')) {
        this.log('Invalid login properly rejected');
      } else {
        this.log(`Invalid login failed with unexpected error: ${error.message}`, false);
      }
    }
    console.log('');
  }

  async testLogout() {
    console.log('Test 5: Logout');
    try {
      this.api.logout();

      // Check if token is cleared
      const isAuthenticated = this.api.isAuthenticated();
      if (!isAuthenticated) {
        this.log('Logout successful - token cleared');
      } else {
        this.log('Logout failed - token still exists', false);
      }
    } catch (error) {
      this.log(`Logout failed: ${error.message}`, false);
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
      console.log('🎉 All authentication tests passed!');
    } else {
      console.log('⚠️ Some tests failed. Check the output above.');
    }
    console.log('');
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new AuthTester();
  tester.runTests().catch(console.error);
}

export { AuthTester };