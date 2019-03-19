# holofuel-gui

**Status:** Pre-Alpha. Early development and testing.

## Purpose:
Simple and intuitive interface allowing users to transact with Holofuel.  This app pairs with the Holochain DNA, [holofuel](https://github.com/Holo-Host/holofuel), for data processing and management.

## Design Decisions:
* [HC-Admin UI ADR](https://hackmd.io/t7Y0H5eNQtycrsNyVRe3Ww?both)

---

## How to Test :
- Install dependencies:`cd ui-src && yarn install && cd ..`
  
- Spin up two agents. 
    > *Note: Below, we will walk through the steps for spinning up two agents (i.e. two dnas and two UIs).*

#

#### Steps to run two DNAs:
  1. Pull the https://github.com/Holo-Host/holofuel repo
      - `git pull https://github.com/Holo-Host/holofuel.git`
      - `git checkout develop`
      - `cd test`
      
  2. Open two terminals at @holofuel/test

  3. Update the `start-agent1` script in the `package.json`
      - Find the `start-agent1` script inside the `package.json`
      - Update the HC_N3H_PATH

  4. Run agent1's DNA 
        - `npm run start-agent1`

  5. Update the `start-agent2` script in the `package.json` BEFORE running agent2
        - Find the `start-agent2` script inside the `package.json`
        - Update the HC_N3H_PATH
        - Add the HC_N3H_BOOTSTRAP_NODE
        - Add the HC_N3H_IPC_URI

  6. Run agent2's DNA
        - `npm run start-agent2`

# 

#### Steps to run two UIs:
  1. Pull the https://github.com/Holo-Host/holofuel-gui repo
      - `git pull https://github.com/Holo-Host/holofuel-gui.git`
      - `cd ui-src`

  2. Open two terminals at @holofuel-gui/ui-src

  3. Run Agent1's UI
        - Start agent1 : `npm run start-agent1`
        - View agnet1 : Open @ http://localhost:8800/

  4. Run Agent2's UI
      - Start agent2 : `npm run start-agent2`
      - View agent2 : Open @ http://localhost:9300/ 

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
