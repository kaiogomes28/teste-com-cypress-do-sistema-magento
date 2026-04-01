import js from '@eslint/js';
import cypress from 'eslint-plugin-cypress';
import importPlugin from 'eslint-plugin-import';
import mocha from 'eslint-plugin-mocha';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = [
	js.configs.recommended,
	cypress.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		plugins: {
			mocha,
			import: importPlugin,
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-pending-tests': 'warn',
			'cypress/no-unnecessary-waiting': 'error',
			'cypress/no-force': 'error',
			'cypress/unsafe-to-chain-command': 'error',
			'eol-last': 'error',
			'no-undef': 0,
			'linebreak-style': 0,
			'no-multi-spaces': 'error',
			'no-trailing-spaces': 'error',
			'array-bracket-spacing': 'error',
			'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
			'template-curly-spacing': 'error',
			'no-console': ['error', { 'allow': ['warn', 'error'] }],
			'no-alert': 'error',
			'semi': 'error',
			'comma-spacing': 'error',
			'comma-dangle': 'error',
			'space-before-blocks': 'error',
			'brace-style': 'error',
			'object-curly-spacing': ['error', 'always'],
			'space-infix-ops': 'error',
			'indent': ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['ArrayExpression'] }],
			'key-spacing': 'error',
			'keyword-spacing': 'error',
			'quotes': ['error', 'single'],
			'no-unused-vars': 'error',

			//Simple-import-sort plugin
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// External dependencies (npm)
						['^@?\\w'],
						// Relative imports (../)
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Relative imports (./)
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
					]
				}
			],
			'simple-import-sort/exports': 'error',
			'import/no-duplicates': 'error',
			'import/newline-after-import': 'error',
			'import/no-named-default': 'error',
			'import/no-namespace': 'error',
			'import/group-exports': 'error',
			'import/no-named-as-default': 'error',
			'import/no-anonymous-default-export': 'error',
			'import/no-useless-path-segments': 'error',
			'import/no-empty-named-blocks': 'error',
			'import/no-cycle': [2, { 'maxDepth': 1 }]
		}
	}
];

export default eslintConfig;
