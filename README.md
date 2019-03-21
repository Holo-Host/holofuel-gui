# holofuel-gui

**Status:** Pre-Alpha. Early development and testing.

## Purpose:
Simple and intuitive interface allowing users to transact with Holofuel.  This app pairs with the Holochain DNA, [holofuel](https://github.com/Holo-Host/holofuel), for data processing and management.

## Design Decisions:
* [HC-Admin UI ADR](https://hackmd.io/t7Y0H5eNQtycrsNyVRe3Ww?both)

---

## How to Run :
- Pull the https://github.com/Holo-Host/holofuel-gui repo
    - `git pull https://github.com/Holo-Host/holofuel-gui.git`
      
- Install dependencies:
    - `cd ui-src && npm install && cd ..`
  
- Spin up two agents. 
    > *Note: Below, we will walk through the steps for spinning up two agents (i.e. two dnas and two UIs).*

#

### Steps to run two DNAs:
  1. Open two terminals at @holofuel-gui

  2. Update the `start-dna-agent1` script in the `package.json`
      - Find the `start-dna-agent1` script inside the `package.json`
      - Update the **HC_N3H_PATH** to path of the n3h repo on your local device.(eg: HC_N3H_PATH=/home/lisa/n3h)

  3. In the first terminal, run agent1's DNA 
        - `npm run start-dna-agent1`

  4. Update the `start-dna-agent2` script in the `package.json` BEFORE running agent2
        - Find the `start-dna-agent2` script inside the `package.json`
        - Update the **HC_N3H_PATH** to path of the n3h repo on your local device.
        - Add the **HC_N3H_BOOTSTRAP_NODE** as provided in the networking details within the terminal when running agent1's DNA. (As shown on line #9 in the terminal snippet below.)
        - Add the **HC_N3H_IPC_URI** as provided in the networking details within the terminal when running agent1's DNA. (As shown on line #3 in the terminal snippet below.)
        
```terminal=
(wss-connection) [i] listening at wss://127.0.0.1:41249/
Network spawned with bindings:
	 - ipc: wss://127.0.0.1:41249/
	 - p2p: []
Reading DNA from /home/lisa/Documents/gitrepos/holochain/holo/HoloFuel/holoFuelUI/holofuel-gui/holofuel/dist/holofuel.dna.json
(p2p-hackmode) [i] node-id hkaQGtTemslrK79wHSwqQONetfVxUenB-ElgD1-RnnmxguJO_VCPdK2ZPKADdIjpu0xvI1yF6HTjD132jLA3rOMWTZKVR605
(wss-server-utils) [i] loaded rsa fingerprint faqnfO4LeJSOWCvVLLjXSN+7TPQ=
(wss-connection) [i] listening at wss://192.168.0.7:42179/
(@hackmode@) [i] p2p bound wss://192.168.0.7:42179/?a=hkaQGtTemslrK79wHSwqQONetfVxUenB-ElgD1-RnnmxguJO_VCPdK2ZPKADdIjpu0xvI1yF6HTjD132jLA3rOMWTZKVR605

```

  5. In the second terminal, run agent2's DNA
        - `npm run start-dna-agent2`

# 
### Steps to run two UIs:

  1. Open two more terminals at @holofuel-gui

  3. In the second terminal, run Agent1's UI
        - Start agent1 : `npm run start-ui-agent1`
        - View agnet1 : Open at http://localhost:8800/

  4. In the second terminal, run Agent2's UI
      - Start agent2 : `npm run start-ui-agent2`
      - View agent2 : Open at http://localhost:9300/ 

#
> Tip: If you notice that the UI is not able to successfully connect to the websocket, then stop your DNA instances in the termainal and redo the 'Steps to run two DNAs.'

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
