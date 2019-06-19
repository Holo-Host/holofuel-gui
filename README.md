# holofuel-gui

**Use Case:** This version of holofuel-gui is intended for use in the Holo infrastructure as a Holo-enabled app.  It is fully connected with hClient and the envoy.

**Status:** Pre-Alpha. Early development and testing.

## Purpose:
Simple and intuitive interface allowing users to transact with Holofuel.  This app pairs with the Holochain DNA, [holofuel](https://github.com/Holo-Host/holofuel), for data processing and management.

## Design Decisions:
* [HoloFuel UI ADR](https://hackmd.io/t7Y0H5eNQtycrsNyVRe3Ww?both)

---

## How to Run in Holo Dev Mode:
> ##### Pre-requisite: You will first need to have a Holo Host environment running on your local device. Look [here](https://hackmd.io/TlzylZCqR_GJ3Tjs5ZPvqQ) for more information or to get started.

- Register the holofuel-gui/holofuel apps together as one hApp Entry within the hApp Store.  (Be sure to reference the holofuel-gui hash and link to `ui.zip` located in the release assets as well as the holfuel hash and link to the `dna.json` found at the holofuel release tab [here](https://github.com/Holo-Host/holofuel/releases).

- Register as a hApp Provider in the HHA
- Register the hAppStoreID of this newly created hApp in the Holo Hosting Application.
- Register as a Host in the HHA.
- Enable the the newly created holofuel hApp (take note of the newly minted HoloHostingID for this hApp).

- Set up your proxies and index.html file to mock Holo's Loader and Resolver service.  Visit ['How to set up a hosted hApp'](https://hackmd.io/TlzylZCqR_GJ3Tjs5ZPvqQ#3-Setup-a-hosted-hApp).

- Start your envoy conductor and server. Visit ['How to set up a hosted hApp'](https://hackmd.io/TlzylZCqR_GJ3Tjs5ZPvqQ#3-Setup-a-hosted-hApp).

- Proceed to http://holohostingId.yourHostpubkey.holohost.net (..or http://localhost:48080) to visit your hosted instance of the holofuel-gui/holofuel hApp!

---
## Built With
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Material UI](https://material-ui.com/)
* [Webpack](https://webpack.js.org/)

---
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
