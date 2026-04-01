export const userRegistrationPage = {
	url: '/customer/account/create/',
	intercept: {
		createAccount: ({
			method: 'POST',
			url: '**analytics.com/j/collect?**'
		})
	},
	elements: {
		firstName: '#firstname',
		lastName: '#lastname',
		email: '#email_address',
		password: '#password',
		passwordConfirmation: '#password-confirmation',
		createAccountButton: 'button[type="submit"][title="Create an Account"]'
	}
};
