const { defineConfig } = require('cypress');

module.exports = defineConfig({
	allowCypressEnv: false,
	defaultCommandTimeout: 10000,
	e2e: {
		baseUrl: 'https://magento2-demo.magebit.com/'
	}
});
