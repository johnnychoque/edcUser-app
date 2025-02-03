# edcUser backend

The backend implemented in the "api" directory handles user authentication using OAuth2 with Passport.js, managing login, callback, profile retrieval, and logout processes. It integrates with the EDC connector to manage assets, policies, contracts, and data transfers. Additionally, it integrates with the FIWARE BAE Marketplace to manage assets, products, offerings, and orders. The backend also manages the status of various events in the application, providing endpoints to check, update, and reset event statuses.

## Main Features

1. Authentication:
    - Implemented using OAuth2 with Passport.js.
    - Routes:
        * /auth/login: Initiates the OAuth2 login process.
        * /auth/callback: Handles the OAuth2 callback and processes the user profile.
        * /auth/profile: Retrieves the authenticated user's profile.
        * /auth/logout: Logs out the user.

2. EDC Integration:
    - Manages assets, policies, contracts, and data transfers with the EDC connector.
    - Routes:
        * /edc/createasset: Creates an asset in the EDC.
        * /edc/createpolicy: Creates a policy in the EDC.
        * /edc/createcontract: Creates a contract in the EDC.
        * /edc/fetchcatalog: Fetches the catalog from the EDC.
        * /edc/startnegotiation: Starts a contract negotiation.
        * /edc/getagreementid: Retrieves the agreement ID for a negotiation.
        * /edc/starttransfer: Initiates a data transfer.
        * /edc/pulldata: Pulls data from the EDC.

3. FIWARE Integration:
    - Manages assets, products, offerings, and orders with the FIWARE BAE Marketplace.
    - Routes:
        * /fiware/assettypes: Retrieves asset types from FIWARE.
        * /fiware/createasset: Creates an asset in FIWARE.
        * /fiware/createproduct: Creates a product in FIWARE.
        * /fiware/createoffering: Creates an offering in FIWARE.
        * /fiware/offerlist: Retrieves the list of offerings from FIWARE.
        * /fiware/createorder: Creates an order in FIWARE.

4. Event Handling:
    - Manages the status of various events in the application.
    - Routes:
        * /event/checkstatus: Checks the status of an event.
        * /event/updatestatus: Updates the status of an event.
        * /event/resetstatus: Resets the status of an event.

## Used Packages
- Node.js
- Express.js
- Axios
- Cors
- Passport