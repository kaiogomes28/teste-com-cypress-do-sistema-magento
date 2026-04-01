const customerAccountPage = {
	url: '/customer/account/',
	elements: {
		customerMenuButton: '[class="customer-name"]'
	}
};

const verifyUserIsLoggedIn = (user) => {
	cy.url().should('contain', customerAccountPage.url);
	cy.findByRole('heading', { name: /my account/i }).should('be.visible');
	cy.contains(`${user.firstName} ${user.lastName}`).should('be.visible');
	cy.contains(user.email).should('be.visible');
};

export { customerAccountPage, verifyUserIsLoggedIn };
