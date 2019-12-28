describe('List Page', function() {
  it('lets you create/delete list elements', function() {
    cy.visit('/')

    cy.get('li').should('not.exist')

    cy.get('input').type('test list item')
    cy.get('button').contains('create').click()
    cy.get('li').contains('test list item').should('exist')

    cy.get('button').contains('delete').click()
    cy.get('li').should('not.exist')
  })
})
