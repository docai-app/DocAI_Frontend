/// <reference types="cypress" />

describe('template spec', () => {
    it('Login', () => {
        cy.visit('http://localhost:8080')
        // cy.visit('https://chyb-dev.docai.net')
        cy.get(':nth-child(1) > .mt-1').type('admin@chyb.com') // input username
        cy.get(':nth-child(2) > .mt-1').focus().type('chyb123123') // input password
        cy.get('.bg-indigo-600').click()
    })
});
