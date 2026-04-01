/* eslint-disable cypress/no-unnecessary-waiting */
import { customerAccountPage, verifyUserIsLoggedIn } from '../pages/customer-account';
import { loginPage } from '../pages/login';
import { userRegistrationPage } from '../pages/user-registration';

Cypress.Commands.add('registerUser', (user) => {
	cy.log('I"m go to the user registration page');
	cy.visit(userRegistrationPage);
	cy.findByRole('heading', { name: /create new customer account/i }).should('be.visible');

	cy.log('I"m filling the user registration form');
	cy.get(userRegistrationPage.elements.firstName).clear();
	cy.get(userRegistrationPage.elements.firstName).type(user.firstName);
	cy.get(userRegistrationPage.elements.lastName).clear();
	cy.get(userRegistrationPage.elements.lastName).type(user.lastName);
	cy.get(userRegistrationPage.elements.email).clear();
	cy.get(userRegistrationPage.elements.email).type(user.email);
	cy.get(userRegistrationPage.elements.password).clear();
	cy.get(userRegistrationPage.elements.password).type(user.password);
	cy.get(userRegistrationPage.elements.passwordConfirmation).clear();
	cy.get(userRegistrationPage.elements.passwordConfirmation).type(user.password);

	cy.log('I"m clicking on the create account button');
	cy.get(userRegistrationPage.elements.createAccountButton).click();
	cy.waitForSystemRender();

	cy.log('I confirm that I am logged in to the system');
	cy.contains('Thank you for registering with Main Website Store.').should('be.visible');
	verifyUserIsLoggedIn(user);
});

Cypress.Commands.add('logoutUser', () => {
	cy.get(customerAccountPage.elements.customerMenuButton).children().eq(0).should('be.visible');
	cy.get(customerAccountPage.elements.customerMenuButton).children().eq(0).click();
	cy.contains('Sign Out').should('be.visible').click();
});

Cypress.Commands.add('loginUser', (user) => {
	cy.visit(loginPage.url);
	cy.findByRole('heading', { name: /customer login/i }).should('be.visible');

	cy.get(loginPage.elements.email).clear();
	cy.get(loginPage.elements.email).type(user.email);
	cy.get(loginPage.elements.password).clear();
	cy.get(loginPage.elements.password).type(user.password);
	cy.get(loginPage.elements.loginButton).click();
});

Cypress.Commands.add('waitForSystemRender', () => cy.wait(901));
Cypress.Commands.add('waitLoading', () => {
	cy.get('[alt="Loading..."]', { timeout: 15000 }).should('exist');
	cy.get('[alt="Loading..."]', { timeout: 150000 }).should('not.exist');
});
