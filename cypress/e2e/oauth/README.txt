# Created: 02-28-2024
#
# Does not use baseUrl - uses API URLs within script
#
# script directory: ./cypress/e2e/oauth
#
# uses: oauth.cy.js
# uses GitHub's own OAuth app within the user's settings so that we can do a OAuth cypress exmaple script
# needs CLIENT_ID, CLIENT_SECRET and CODE from the cypress.env.json file
# A new temporary "code" is generated by requesting: https://github.com/login/oauth/authorize?client_id={CLIENT_ID}
#
# see: https://www.youtube.com/watch?v=1D-0osk4K9w - for more details
#
# Last tested on: 02/28/2024 4:55 PM EST