Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome, sobrenome) {
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type('yan@gmail.com')
    cy.get('#open-text-area').type('Teste')

    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitUsingContains', function() {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('yan@gmail.com')
    cy.get('#open-text-area').type('Teste')

    // cy.contains('Enviar').click()
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('selecionaProdutoYoutube', () => {
    cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
})
