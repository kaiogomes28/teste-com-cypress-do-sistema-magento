const productPage = {
	elements: {
		productItemInfo: '.product-item-info'
	}
};

const addProductToCart = (option) => {
	cy.visit('/');
	cy.get(productPage.elements.productItemInfo).eq(option).click();
	cy.findByRole('option', { name: /XS/i }).scrollIntoView();
	cy.findByRole('option', { name: /XS/i }).should('be.visible').click();
	cy.findByRole('option', { name: /Blue/i }).click();
	cy.findByRole('button', { name: /add to cart/i }).click();
	cy.contains('You added Radiant Tee to your shopping cart.').scrollIntoView();
	cy.contains('You added Radiant Tee to your shopping cart.').should('be.visible');
};

export { addProductToCart, productPage };
