const inquirer = require("inquirer");
const cmd = require('node-cmd');
const Promise = require('bluebird');
const fs = require('fs');
const toml = require('toml');
const tomlify = require('tomlify-j0.4');


const conductor_config = toml.parse(fs.readFileSync('./agent1-conductor-config.toml', 'utf-8'));
const agent_1 = conductor_config.agents;
console.log("agent_1 Info :\n\n", agent_1);


// create globals for use when setting agent keys in conductor config.

/*********************************** TOML AGENT KEY SETTING ***********************************/
let KEY_FILE;
let PUBLIC_ADDRESS;
const agentObject = {
  id: agent_1.id,
  name: agent_1.name,
  public_address: PUBLIC_ADDRESS,
  key_file: KEY_FILE
}

// const keyInfo = JSON.stringify{key_file: KEY_FILE, public_address: PUBLIC_ADDRESS};
const keyInfo = () => {
  try {
   const content = tomlify.toToml(agentObject, {space: 2})
  }
  catch (err) {
    console.log("==============================================");
    console.log("");
    console.log('YOU encountered an error.');
    console.log('Agent_Key Conversion Tomilfy ERROR\n\n: ', err)
    console.log("");
    console.log("==============================================");
  }
}
// NEXT: add the keys to the toml file.
// const addKeyInfo = filehandle.appendFile(keyInfo, encoding:'utf8');
const addKeyInfo = fs.appendFile("agent1-conductor-config.toml", keyInfo, function(err) {
  if (err) {
    return console.log(err);
  }
});

/************************************ TOML NETWORK SETTING ***********************************/
let BOOTSTRAP_NODES;
let N3H_IPC_URI;
const networkObject = {
  n3h_path: agent_1.id,
  n3h_persistence_path: agent_1.name,
  bootstrap_nodes: [BOOTSTRAP_NODES],
  n3h_ipc_uri: N3H_IPC_URI
}

const networkInfo = () => {
  try {
   const content = tomlify.toToml(agentObject, {space: 2})
  }
  catch (err) {
    console.log("==============================================");
    console.log("");
    console.log('YOU encountered an error.');
    console.log('Network Conversion Tomilfy ERROR :\n\n', err)
    console.log("");
    console.log("==============================================");
  }
}
// NEXT: add the keys to the toml file.
// const addNetworkInfo = filehandle.appendFile(networkInfo, encoding:'utf8');
const addNetworkInfo = fs.appendFile("agent1-conductor-config.toml", networkInfo, function(err) {
  if (err) {
    return console.log(err);
  }
});


/************************************ CLI PROMPT ***********************************/
// Prompt and create agent keys :
console.log("BEFORE prompt");
inquirer
  .prompt([
    {
      type: "password",
      name: "agent_key_pw",
      message: "Please type in a password for your agent keys."
    },
  ]).then(function(user) {
    console.log("AFTER prompt")
    if (user.agent_key_pw) {
      cmd.get(
          `hc keygen`,
          function(err, data, stderr){
            if (!err) {
              // KEY_FILE = data./**/
              // PUBLIC_ADDRESS = data./**/
              console.log("==============================================");
              console.log("");
              console.log('Here are is your public key and keyfile info:\n\n', data)
              console.log("");
              console.log("==============================================");

              // start_scenario();
            }
            else {
              console.log("==============================================");
              console.log("");
              console.log('YOU encountered a ** hc keygen** error.');
              console.log('ERROR :\n\n', err)
              console.log("");
              console.log("==============================================");
            }
          }
      );
    }
    else {
      console.log("==============================================");
      console.log("");
      console.log("Sorry, a password was not generated.  Please try again");
      console.log("");
      console.log("==============================================");
    }
});

/********************************* CLI CONDUCTOR SCENARIO SEQUENCE ********************************/
const start_scenario = getAsync('holochain -c ./agent1-conductor-config.toml')
.then(data => {
  console.log('cmd data from running AGENT_1 CONTAINER\n\n', data)
})
.then(res => {
  console.log("result from #1 .then in AGENT_1 CONFIG RUN");
  // KEY_FILE = /**/ ;
  // PUBLIC_ADDRESS = /**/ ;
  // addNetworkInfo();
})
.then(res => {
  console.log("result from #2 .then IN AGENT_1 CONFIG RUN");
  // BOOTSTRAP_NODES = /**/ ;
  // N3H_IPC_URI = /**/ ;
  // addNetworkInfo();
})
.then(res => {
  console.log("result from #3 .then IN AGENT_1 CONFIG RUN");
  // cmd.run(`holochain -c ./agent2-conductor-config.toml`);
})
.catch(err => {
  console.log("==============================================");
  console.log("");
  console.log('YOU encountered an error.');
  console.log('CMD ERROR :\n\n', err)
  console.log("");
  console.log("==============================================");
})
