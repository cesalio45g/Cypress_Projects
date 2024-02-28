// 1) Configure Client ID and Client Secret Key from GitHub configuration
//    User Profile Settings => Developer Tools => Create OAuth App
//
// 2) Generate a temporary 'code' by requesting:
//    https://github.com/login/oauth/authorize?client_id={CLIENT_ID}
//    the 'code' is temporary - good for a few minutes - just for testing
//
// 3) Generate OAuth Access Token from GitHub using a POST request to the below URL
//    url: https://github.com/login/oauth/access_token
//    params: client_id, client_secret, code
//
// 4) Once the auth_token is generated you can make a GET request to the server for data
//    using the token
//    example: https://api.github.com/user/repos
//             Authorization: bearer {}access_token}
//
// NOTE: uses Cypress ENV variable within: ./cypress.env.json

describe('Given a user makes an OAuth request', () => {
   let access_token = '';

   context('When the user includes all neccessary parameters', () => {
      it('Then an OAuth Token is returned to the user as a string', () => {
         cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs: {
               client_id: Cypress.env('CLIENT_ID'),
               client_secret: Cypress.env('CLIENT_SECRET'),
               code: Cypress.env('TEMP_GIT_CODE'),
            },
         }).then(response => {
            // sample response: 'access_token=9dhjdisosihjr98uy3908u39_898e8e&token_type=bearer
            let params = response.body.split('&'); // will return an array of 2 elements, split by the &
            access_token = params[0].split('=')[1]; // will split the first element in params array and return the second item

            // For Logging purposes
            // cy.log('Access Token: ' + access_token);
         });
      });
   });

   context(
      'When a user makes a GET request to the users repos using the access_token generated above',
      () => {
         it('Then the server will return a list of user repos data', () => {
            cy.request({
               method: 'GET',
               url: 'https://api.github.com/user/repos',
               headers: {
                  Authorization: 'bearer ' + access_token,
               },
            });
         });
      }
   );
});
