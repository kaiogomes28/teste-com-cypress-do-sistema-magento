
import { nanoid } from 'nanoid';

import { checkoutCartPage } from '../pages/checkout-cart';
import { verifyUserIsLoggedIn } from '../pages/customer-account';
import { completeCheckoutWithBillingAndPlaceOrder, paymentPage } from '../pages/payment';
import { addProductToCart } from '../pages/product';

describe('Flows E2E Magento', () => {
	beforeEach(() => {
		cy.intercept(paymentPage.intercept.postPaymentInformation).as('postPaymentInformation');
	});

	it('Scenario 1: User registration', () => {
		cy.log(`
			GIVEN 
				that I fill in the registration form with valid informations
			WHEN 
				I have completed the registration
			THEN 
				I should see a success message
				AND my details should be displayed on the page
				AND I log out of the system I should see a message confirming that I have logged out
		`);
		const user = {
			firstName: 'QA',
			lastName: 'Automation',
			email: nanoid(6).concat('@scenario1.com'),
			password: 'Qa@12345678'
		};
		cy.registerUser(user);
		cy.logoutUser();

		cy.log('I view a message saying I had been logged out of the system and I"m being redirected to the home page');
		cy.findByRole('heading', { name: /you are signed out/i }).should('be.visible');
		cy.contains('Thank you for registering with Main Website Store.').should('be.visible');
		cy.contains('You have signed out and will go to our homepage in 5 seconds.').should('be.visible');
		cy.url().should('contain', '/');
	});

	it('Scenario 2: Login', () => {
		cy.log(`
			GIVEN 
				I register a user
			WHEN 
				I try to login in with that account
			THEN 
				I should be able to access the system 
				AND see the logged user details
		`);
		const user = {
			firstName: 'QA',
			lastName: 'Automation',
			email: nanoid(6).concat('@scenario2.com'),
			password: 'Qa@12345678'
		};
		cy.registerUser(user);
		cy.logoutUser();
		cy.loginUser(user);
		verifyUserIsLoggedIn(user);
	});

	it('Scenario 3: Add product to basket', () => {
		cy.log(`
			GIVEN 
				I’m on the system’s home page
			WHEN 
				I add an item to the checkout cart
			THEN 
				I should then see the item on the checkout cart
		`);
		const user = {
			firstName: 'QA',
			lastName: 'Automation',
			email: nanoid(6).concat('@scenario3.com'),
			password: 'Qa@12345678'
		};
		cy.registerUser(user);
		addProductToCart(0);

		cy.log('I go to my checkout cart and view my item');
		cy.visit(checkoutCartPage.url);
		cy.contains('Shopping Cart').should('be.visible');
		cy.get(checkoutCartPage.elements.productCard)
			.should('contain', 'Radiant Tee')
			.should('contain', 'XS')
			.should('contain', 'Blue')
			.should('contain', '1')
			.should('contain', '$22.00')
			.should('be.visible');
	});

	it('Scenario 4: Checkout', () => {
		cy.log(`
			GIVEN 
				I add a product to my shopping basket
			WHEN 
				I go to the checkout cart page
				AND fill in the details and complete my checkout  
			THEN 
				I should then see a success message 
				AND my order number
		`);
		const user = {
			firstName: 'QA',
			lastName: 'Automation',
			email: nanoid(6).concat('@scenario4.com'),
			password: 'Qa@12345678'
		};
		cy.registerUser(user);
		addProductToCart(0);
		completeCheckoutWithBillingAndPlaceOrder();
	});
});
