# holofuel-gui

**Status:** Pre-Alpha. Early development and testing.

## Purpose:
Simple and intuitive interface allowing users to transact with Holofuel.  This app pairs with the Holochain DNA, [holofuel](https://github.com/Holo-Host/holofuel), for data processing and management.

## Design Decisions:
* [HC-Admin UI ADR](https://hackmd.io/t7Y0H5eNQtycrsNyVRe3Ww?both)

---

## How to Test :
- Need to install
  `cd ui-src && yarn install && cd ..`
- Build agent 1
  `yarn build:agent1`
- Build agent 2
  `yarn build:agent2`

- Now to run Agent 1
  `holochain -c agent1-conductor-config.toml`

- Open it on http://localhost:8800

- Now to run Agent 2
  `holochain -c agent2-conductor-config.toml`

- Open it on http://localhost:9300

## Built With
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Material UI](https://material-ui.com/)
* [Webpack](https://webpack.js.org/)

---
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
