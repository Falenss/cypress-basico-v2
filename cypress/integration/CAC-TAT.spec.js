/// <reference types="Cypress" />

const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste.'

    describe('Central de Atendimento ao Cliente TAT', function () {
        beforeEach(function () {
            cy.visit('./src/index.html')
        })

        it('verifica o t�tulo da aplica��o', function () {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigat�rios e envia o formul�rio', function () {
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste@hotmail.com')
            cy.get('#open-text-area').type(longText, {delay: 0})
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formul�rio com um email com formata��o inv�lida', function () {
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste.com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })
        
        it('campo telefone deve permanecer vazio se preenchido com campos n�o num�ricos', function () {          
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste@hotmail.com')
            cy.get('#phone').type('teste').should('be.empty')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigat�rio mas n�o � preenchido antes do envio do formul�rio', function () {
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste@hotmail.com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('#phone-checkbox').click()
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
            cy.get('#firstName').type('Felipe').should('have.value', 'Felipe').clear().should('be.empty')
            cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('be.empty')
            cy.get('#email').type('teste.teste@hotmail.com').should('have.value', 'teste.teste@hotmail.com').clear().should('be.empty')
            cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('be.empty')
            cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value', longText).clear().should('be.empty')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formul�rio sem preencher os campos obrigat�rios', function () {
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('preenche os campos obrigat�rios e envia o formul�rio utilizando atalho', function () {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible')
        })

        it('contains', function () {
            cy.contains('Nome').type('Felipe')
            cy.contains('Sobrenome').type('Silva')
            cy.contains('mail').type('teste.teste@hotmail.com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.contains('button', 'Enviar').click()
            cy.contains('Mensagem enviada com sucesso').should('be.visible')
        })
        
    })