// Main Test Runner
// Runs all module tests in sequence

import { AuthTester } from './test-auth.js';
import { ProductTester } from './test-products.js';
import { CustomerTester } from './test-customers.js';

class TestRunner {
  constructor() {
    this.allResults = [];
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🚀 Jewelcart API Testing Suite');
    console.log('==============================');
    console.log(`Started at: ${new Date().toLocaleString()}\n`);

    try {
      // Run Authentication Tests
      console.log('Starting Authentication Tests...');
      const authTester = new AuthTester();
      await authTester.runTests();
      this.allResults.push({
        module: 'Authentication',
        results: authTester.results,
        passed: authTester.results.filter(r => r.success).length,
        total: authTester.results.length
      });

      // Run Product Tests
      console.log('Starting Product Management Tests...');
      const productTester = new ProductTester();
      await productTester.runTests();
      this.allResults.push({
        module: 'Products',
        results: productTester.results,
        passed: productTester.results.filter(r => r.success).length,
        total: productTester.results.length
      });

      // Run Customer Tests
      console.log('Starting Customer Management Tests...');
      const customerTester = new CustomerTester();
      await customerTester.runTests();
      this.allResults.push({
        module: 'Customers',
        results: customerTester.results,
        passed: customerTester.results.filter(r => r.success).length,
        total: customerTester.results.length
      });

      this.printFinalSummary();

    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
      process.exit(1);
    }
  }

  printFinalSummary() {
    const endTime = Date.now();
    const duration = Math.round((endTime - this.startTime) / 1000);

    console.log('🏁 FINAL TEST SUMMARY');
    console.log('=====================');
    console.log(`Total execution time: ${duration}s\n`);

    let totalPassed = 0;
    let totalTests = 0;

    this.allResults.forEach(moduleResult => {
      const percentage = Math.round((moduleResult.passed / moduleResult.total) * 100);
      const status = moduleResult.passed === moduleResult.total ? '✅' : '❌';

      console.log(`${status} ${moduleResult.module}: ${moduleResult.passed}/${moduleResult.total} (${percentage}%)`);

      totalPassed += moduleResult.passed;
      totalTests += moduleResult.total;
    });

    console.log(`\n📊 Overall: ${totalPassed}/${totalTests} tests passed`);

    if (totalPassed === totalTests) {
      console.log('🎉 ALL TESTS PASSED! The Jewelcart API is working correctly.');
    } else {
      console.log('⚠️ Some tests failed. Please review the detailed output above.');
    }

    console.log(`\nCompleted at: ${new Date().toLocaleString()}`);
  }
}

// Run all tests
const runner = new TestRunner();
runner.runAllTests().catch(console.error);