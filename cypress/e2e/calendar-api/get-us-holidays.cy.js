/// <reference-types="@bahmutov/cy-api" />

import holidayArray from './USHolidayData.json';
import holidaySchema from './USHolidays.spec.json';

describe('Given we make a Holiday API request', () => {
   beforeEach('Make Holiday API request', () => {
      // This uses the new cy-api plugin which outputs the request and response right into the browser window
      // without having to open the "console"
      cy.api({
         method: 'GET',
         url: '/holidays',
         body: {
            country: 'US',
            type: 'national',
            year: '2024',
            api_key: Cypress.env('API_KEY'),
         },
      }).as('holidays');
   });

   context('When we request data by year, country and type', () => {
      it('Then the API shall return eleven US, National holidays for the year 2024', () => {
         cy.get('@holidays').then($holidays => {
            expect($holidays.body.meta.code).to.equal(200);
            expect($holidays.body.response.holidays).to.have.lengthOf(11);
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

      it('Then the API data nodes shall be verified', () => {
         cy.get('@holidays').then($holidays => {
            expect($holidays.body).to.be.jsonSchema(holidaySchema);
            cy.log('SCHEMA: ' + JSON.stringify(holidaySchema));
         });
      });
   });
});
