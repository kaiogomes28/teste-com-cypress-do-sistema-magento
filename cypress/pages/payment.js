import { checkoutCartPage } from './checkout-cart';

const paymentPage = {
	intercept: {
		postPaymentInformation: ({
			method: 'POST',
			url: '**/rest/default/V1/carts/mine/payment-information'
		})
	},
	elements: {
		orderNumber: '.order-number'
	}
};

const completeCheckoutWithBillingAndPlaceOrder = () => {
	cy.log('I go to the shopping basket checkout page and click on "Proceed to checkout"');
	cy.visit(checkoutCartPage.url);
	cy.waitForSystemRender();
	cy.get(checkoutCartPage.elements.proceedToCheckoutButton).should('be.visible').click();
	cy.waitLoading();

	cy.log('I fill in the shipping fields with my details');
	cy.findByRole('textbox', { name: /Company/i }).type('QA');
	cy.findByRole('textbox', { name: /Street Address: Line 1/i }).type('Rua de teste');
	cy.findByRole('textbox', { name: /Street Address: Line 2/i }).type('Bairro de teste');
	cy.findByRole('textbox', { name: /Street Address: Line 3/i }).type('155');
	cy.findByRole('combobox', { name: /Country/i }).select('Brazil');
	cy.findByRole('combobox', { name: /State*/i }).select('Santa Catarina');
	cy.findByRole('textbox', { name: /City/i }).type('Florianopolis');
	cy.findByRole('textbox', { name: /Zip*/i }).type('07008');
	cy.findByRole('textbox', { name: /Phone Number/i }).type('(99)99999-9999');
	cy.waitLoading();
	cy.findByRole('button', { name: /Next/i }).scrollIntoView();
	cy.findByRole('button', { name: /Next/i }).should('be.visible').click();
	cy.waitForSystemRender();

	cy.log('I complete my purchase and see the confirmation message and my order number');
	cy.findByRole('button', { name: /Place Order/i }).should('be.visible').click();
	cy.waitLoading();
	cy.wait('@postPaymentInformation');
	cy.contains('Thank you for your purchase!').should('be.visible');
	cy.get(paymentPage.elements.orderNumber).invoke('text').then((text) => {
		cy.contains(`${'Your order number is:'} ${text}`).should('be.visible');
	});
	cy.contains(/We'll email you an order confirmation with details and tracking info./).should('be.visible');
};

export { completeCheckoutWithBillingAndPlaceOrder, paymentPage };
