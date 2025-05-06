context('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login a ADMIN user with a valid email and password', () => {
    cy.get('input#email').type('lucasbarque@gmail.com');
    cy.get('input#password').type('123123123123');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.get('[data-testid="welcome-message"]').contains('Seja bem-vindo(a)');

    cy.url().should('include', '/');
  });

  it('should shows an error message when the user try to login with a nonexistent account', () => {
    cy.get('input#email').type('invalid-credentials@gmail.com');
    cy.get('input#password').type('123123123123');
    cy.get('button[type="submit"]').click();

    cy.get('[data-sonner-toaster="true"] > li > div:nth-child(2)').should(
      'have.text',
      'E-mail ou senha inválidos. Tente novamente!'
    );
  });

  it('should redirects a logged user to dashboard', () => {
    cy.get('input#email').type('lucasbarque@gmail.com');
    cy.get('input#password').type('123123123123');
    cy.get('button[type="submit"]').click();

    cy.wait(1000);
    cy.visit('/login');
    cy.wait(1000);
    cy.url().should('include', '/');
  });

  it('should show an error message when the user does not type your e-mail', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input#email').should(
      'have.class',
      'group-data-[is-error=true]:border-red-500'
    );
    cy.get('[data-testid="error-input-email"]').should(
      'have.text',
      'E-mail é obrigatório.'
    );
  });

  it('should show an error message when the user type an incomplete e-mail', () => {
    cy.get('input#email').as('inputEmail');
    cy.get('@inputEmail').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('input#email').should(
      'have.class',
      'group-data-[is-error=true]:border-red-500'
    );
    cy.get('[data-testid="error-input-email"]').should(
      'have.text',
      'E-mail com formato inválido.'
    );
  });

  it('should show an error message when the user do not type your password', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input#password').should(
      'have.class',
      'group-data-[is-error=true]:border-red-500'
    );
    cy.get('[data-testid="error-input-password"]').should(
      'have.text',
      'A senha deve ter no mínimo 8 caracteres'
    );
  });

  it('should be visible the password when the user click on eye on password input', () => {
    cy.get('input#password').type('123');
    cy.get('[data-testid="reveal-password"]').click();
    cy.get('input#password').should('have.attr', 'type', 'text');
  });
});
