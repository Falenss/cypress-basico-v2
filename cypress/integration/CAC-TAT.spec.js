/// <reference types="Cypress" />

const longText = Cypress._.repeat ('Teste ', 20)
const SECONDS_IN_MS = 3000

    describe('Central de Atendimento ao Cliente TAT', function () {
        beforeEach(function () {
            cy.visit('./src/index.html')
        })

    Cypress._.times(5, () => {
        it('verifica o t�tulo da aplica��o', function () {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigat�rios e envia o formul�rio', function () {
            cy.clock()
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste@hotmail.com')
            cy.get('#open-text-area').type(longText, {delay: 0})
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })
    })

        it('exibe mensagem de erro ao submeter o formul�rio com um email com formata��o inv�lida', function () {
            cy.clock()
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste.com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })
        
        it('campo telefone deve permanecer vazio se preenchido com campos n�o num�ricos', function () {          
            cy.clock()
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste@hotmail.com')
            cy.get('#phone').type('teste').should('be.empty')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigat�rio mas n�o � preenchido antes do envio do formul�rio', function () {
            cy.clock()
            cy.get('#firstName').type('Felipe')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('teste.teste@hotmail.com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('#phone-checkbox').click()
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
            cy.clock()
            cy.get('#firstName').type('Felipe').should('have.value', 'Felipe').clear().should('be.empty')
            cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('be.empty')
            cy.get('#email').type('teste.teste@hotmail.com').should('have.value', 'teste.teste@hotmail.com').clear().should('be.empty')
            cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('be.empty')
            cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value', longText).clear().should('be.empty')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })

        it('exibe mensagem de erro ao submeter o formul�rio sem preencher os campos obrigat�rios', function () {
            cy.clock()
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('preenche os campos obrigat�rios e envia o formul�rio utilizando atalho', function () {
            cy.clock()
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })

        it('contains', function () {
            cy.clock()
            cy.contains('Nome').type('Felipe')
            cy.contains('Sobrenome').type('Silva')
            cy.contains('mail').type('teste.teste@hotmail.com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.contains('button', 'Enviar').click()
            cy.contains('Mensagem enviada com sucesso').should('be.visible')
            cy.tick(SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })
        
        it('selecionar um produto (YouTube) por seu texto', function () {
            cy.get('#product')
                .select('YouTube')
                .should('have.value', 'youtube')
        })
        
        it('selecionar um produto (Mentoria) por seu valor', function () {
            cy.get('#product')
                .select('mentoria')
                .should('have.value', 'mentoria')
        })

        it('selecionar um produto (Blog) por seu índice', function () {
            cy.get('#product')
                .select(1)
                .should('have.value', 'blog')
        })

        it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        })

        it('marca cada tipo de atendimento', function () {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(function($radio) {
                    cy.wrap($radio)
                        .check()
                    cy.wrap($radio)
                        .should('be.checked')
            })

        })

        it('marca ambos checkboxes, depois desmarca o último', function () {
            cy.get('input[type="checkbox"]')
                .check()
                .should('be.checked')
                .last()
                .uncheck()
                .should('not.be.checked')
        })

        it('seleciona um arquivo da pasta fixtures', function () {
            cy.get('input[type="file"]#file-upload')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json')
                .should(function($input) {
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('seleciona um arquivo simulando um drag-and-drop', function (){
            cy.get('input[type="file"]#file-upload')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
                .should(function($input) {
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
                .selectFile('@sampleFile')
                .should(function($input) {
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
            cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            cy.get('#privacy a').invoke('removeAttr', 'target').click()
            cy.contains('Talking About Testing').should('be.visible')
        })

        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
            cy.get('.success')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')
              .invoke('hide')
              .should('not.be.visible')
            cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
          })

        it('preenche a area de texto usando o comando invoke', function() {
            cy.get('#open-text-area')
                .invoke('val', longText)
                .should('have.value', longText)
        })

        it('faz uma requisição http', function() {
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should(function(response){
                    const{ status, statusText, body } = response
                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK') 
                    expect(body).to.include('CAC TAT')
                })
        })

        it('encontra o gato request', function() {
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should(function(response){
                    const{ status, statusText, body } = response
                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK') 
                    expect(body).to.include('cat')
                })
        })

        it('encontra o gato pelo id', function() {
            cy.get('#cat').invoke('show').should('be.visible')
        })

        it.only('altera o title e subtitle', function() {
            cy.get('#title')
                .invoke('text','CAT TAT')
            cy.get('#subtitle')
                .invoke('text', 'Eu ❤️ gatos')
        })
    })