describe('Uses Sessions To Login', () => {
   beforeEach('', () => {
      cy.sessionLogin('test', 'test');
   });

   it('should login using Authtentication', () => {
      cy.visit('/');
      cy.get('#nameofuser').should('contain.text', 'Welcome test');
   });

   it('should login using Session', () => {
      cy.visit('/');
      cy.get('#nameofuser').should('contain.text', 'Welcome test');
   });
});
