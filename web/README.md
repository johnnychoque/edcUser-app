# edcUser frontend

The frontend implemented in the "web" directory manages user authentication and state using Zustand. It handles asset creation and selection, product creation, offering creation and selection, and order creation. Additionally, it manages the EDC setup, negotiation, and data transfer processes. The frontend interacts with the backend through various API endpoints to perform these operations, ensuring seamless integration with the EDC connector and the FIWARE BAE Marketplace.

## Main Features

1. Authentication:
    - Manages user authentication and state using Zustand.
    - Components:
        * Start: Initiates the login process.
        * User: Displays authenticated user information.

2. Asset Management:
    - Manages asset creation and selection.
    - Components:
        * AssetTypes: Displays and selects asset types.
        * CreateAsset: Creates an asset.

3. Product Management:
    - Manages product creation.
    - Components:
        * CreateProduct: Creates a product.

4. Offering Management:
    - Manages offering creation and selection.
    - Components:
        * CreateOffering: Creates an offering.
        * OfferList: Displays and selects offerings.

5. Order Management:
    - Manages order creation.
    - Components:
        * CreateOrder: Creates an order.
        * OrderCreated: Displays created order details.

6. EDC Process:
    - Manages the EDC setup, negotiation, and data transfer processes.
    - Components:
        * EdcSetup: Sets up EDC assets, policies, and contracts.
        * EdcCatNeg: Manages EDC catalog and negotiation.
        * EdcNegotiation: Handles EDC negotiation.
        * EdcTransferConsumer: Manages EDC data transfer as a consumer.
        * EdcTransferProvider: Manages EDC data transfer as a provider.
        * EdcGetData: Retrieves data from the EDC.

## Used Packages
- React app with Vite
- Material UI
- Zustand for state management
- Axios
