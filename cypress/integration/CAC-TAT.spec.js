// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach( function() {
        cy.visit('./src/index.html')
    });

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('preencher os campos obrigatórios e enviar o formulário', function() {
        const longText = ' texto texto texto texto texto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto textotexto texto texto texto'
        cy.get('#firstName').type('Yan')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('fulano@gmail.com')
        cy.get('#phone').type('997028678')
        cy.get('#open-text-area').type(longText, {delay : 0})
        cy.get('button[type="Submit"]').click()

        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Yan')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('fulano@gmail;com')
        cy.get('#open-text-area').type('Texto')
        cy.get('button[type="Submit"]').click()

        cy.get('.error').should('be.visible', 'error')
    })

    it('campo número de telefone só aceita valores numéricos', function() {
        cy.get('#phone')
        .type('abcdefgh')
        .should('have.value', '')
    })

    it('não preenche número do telefone quando ele é obrigatório', function() {
        cy.get('#firstName').type('Yan')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('fulano@gmail.com')
        cy.get('#open-text-area').type('Texto')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="Submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('#firstName')
            .type('Yan')
            .should('have.value','Yan')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Tavares')
            .should('have.value', 'Tavares')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('yan@gmail.com')
            .should('have.value', 'yan@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')

        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        const nome = "Yan"
        const sobrenome = "Tavares"
        cy.fillMandatoryFieldsAndSubmit(nome, sobrenome)

        cy.get('.success').should('be.visible')
    })

    it('usa contains para enviar formulário', () => {
        cy.fillMandatoryFieldsAndSubmitUsingContains()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.selecionaProdutoYoutube()
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it.only('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
})
  