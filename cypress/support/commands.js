Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste.teste@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})