/// <reference types="Cypress" />

    describe('Central de Atendimento ao Cliente TAT', function () {
        beforeEach(function () {
            cy.visit('./src/privacy.html')
        })
    it.only('testa a página da política de privacidade de forma independente', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing')
            .should('be.visible')
    
    })
})