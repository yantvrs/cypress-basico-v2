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
        cy.get('#firstName').type('Yan').click()
        cy.get('#lastName').type('Tavares').click()
        cy.get('#email').type('fulano@gmail.com').click()
        cy.get('#phone').type('997028678').click()
        cy.get('#open-text-area').type(longText, {delay : 0}).click()
        cy.get('button[type="Submit"]').click()

        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Yan').click()
        cy.get('#lastName').type('Tavares').click()
        cy.get('#email').type('fulano@gmail;com').click()
        cy.get('#phone').type('997028678').click()
        cy.get('#open-text-area').type('Texto').click()
        cy.get('button[type="Submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo número de telefone só aceita valores numéricos', function() {
        cy.get('#phone')
        .type('abcdefgh')
        .should('have.value', '')
    })

    it.only('não preenche número do telefone quando ele é obrigatório', function() {
        cy.get('#firstName').type('Yan').click()
        cy.get('#lastName').type('Tavares').click()
        cy.get('#email').type('fulano@gmail;com').click()
        cy.get('#open-text-area').type('Texto').click()
        cy.get('#phone-checkbox').click()
        cy.get('button[type="Submit"]').click()

        cy.get('.error').should('be.visible')
    })
})
  