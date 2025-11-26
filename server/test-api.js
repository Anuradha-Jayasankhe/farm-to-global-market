const http = require('http');

async function testEndpoint(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function runTests() {
  console.log('\n=== Testing Farm2Global API ===\n');

  // Test health endpoint
  console.log('1. Testing Health Endpoint...');
  try {
    const health = await testEndpoint('GET', '/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response:`, JSON.stringify(health.data, null, 2));
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  // Test products endpoint (should fail without auth)
  console.log('\n2. Testing Products Endpoint (no auth)...');
  try {
    const products = await testEndpoint('GET', '/api/v1/products');
    console.log(`   Status: ${products.status}`);
    console.log(`   Response:`, JSON.stringify(products.data, null, 2).substring(0, 200));
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  // Test AI endpoint (should fail without auth)
  console.log('\n3. Testing AI Endpoint (no auth)...');
  try {
    const ai = await testEndpoint('GET', '/api/v1/ai/consultations');
    console.log(`   Status: ${ai.status}`);
    console.log(`   Response:`, JSON.stringify(ai.data, null, 2));
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  console.log('\n=== Tests Complete ===\n');
  process.exit(0);
}

// Wait a bit for server to start
setTimeout(() => {
  runTests();
}, 2000);
