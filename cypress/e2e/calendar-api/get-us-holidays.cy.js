import holidayArray from './USHolidays.json';
import holidaySchema from './USHolidays.spec.json';

describe('Given we make a Holiday API request', () => {
   let api_key = Cypress.env('API_KEY');
   let year = Cypress.env('YEAR');
   let country = Cypress.env('COUNTRY');
   let type = Cypress.env('TYPE');

   beforeEach('Make Holiday API request', () => {
      cy.request({
         method: 'GET',
         url: '/holidays',
         body: {
            country,
            type,
            year,
            api_key,
         },
      }).as('holidays');
   });

   context('When we request data by year, country and type', () => {
      it('Then the API shall return eleven US, National holidays for the year 2024', () => {
         cy.get('@holidays').then($holidays => {
            let holidays = $holidays.body.response.holidays;
            expect(holidays).to.have.lengthOf(11);
         });
      });

      it('Then the API shall return all US, National holidays for the year 2024', () => {
         cy.get('@holidays').then($holidays => {
            let holidays = $holidays.body.response.holidays;
            let holidayLength = holidays.length;

            for (let i = 0; i < holidayLength; i++) {
               expect(holidays[i].name).to.be.equal(holidayArray.USHolidays[i]);
            }
         });
      });

      it.skip('Then the API data nodes shall be verified', () => {
         cy.get('@holidays').then($holidays => {
            expect($holidays.body).to.be.jsonSchema(holidaySchema);
            cy.log('SCHEMA: ' + JSON.stringify(holidaySchema));
         });
      });
   });
});
