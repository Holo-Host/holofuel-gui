export const FETCH_STATE = 'FETCH_STATE';
export const GET_INFO_INSTANCES = 'GET_INFO_INSTANCES';

////////////////////////////////////////////////////////
    /* Reporting Container DNAs/DNA-instances */
////////////////////////////////////////////////////////
// call for LIST_OF_DNA ()
export function list_of_dna() {
  console.log(">> LIST_OF_DNA : payload <<");
  return {
    type: 'LIST_OF_DNA',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: `admin/dna/list`
    }
  }
}

// call LIST_OF_INSTANCES ()
export function list_of_installed_instances() {
  console.log(">> LIST_OF_INSTANCES : payload <<");
  return {
    type: 'LIST_OF_INSTANCES',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: `admin/instance/list`
    }
  }
}

// LIST_OF_RUNNING_INSTANCES ()
export function list_of_running_instances() {
  console.log(">> LIST_OF_RUNNING_INSTANCES : payload <<");
  return {
    type: 'LIST_OF_RUNNING_INSTANCES',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: `admin/instance/running`
    }
  }
}

// call for GET_INFO_INSTANCES ()
export function get_info_instances() {
  return {
    type: 'GET_INFO_INSTANCES',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: 'info/instances'
    }
  }
}

// call LIST_OF_INTERFACES ()
export function list_of_interfaces() {
  console.log(">> LIST_OF_INTERFACES : payload <<");
  return {
    type: 'LIST_OF_INTERFACES',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: `admin/interface/list`
    }
  }
}

////////////////////////////////////////////////////////
    /* Updating Container DNAs/DNA-instances */
////////////////////////////////////////////////////////
// call for INSTALL_DNA_FROM_FILE ({id, path })
export function install_dna_from_file(payload) {
  console.log(">> INSTALL_DNA_FROM_FILE : payload <<", payload)
  return {
    type: 'INSTALL_DNA_FROM_FILE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/dna/install_from_file`
    }
  }
}

// call for UNINSTALL_DNA_BY_ID ({ id })
export function uninstall_dna_by_id(payload) {
  console.log(">> UNINSTALL_DNA_BY_ID : payload <<", payload)
  return {
    type: 'UNINSTALL_DNA_BY_ID',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/dna/uninstall`
    }
  }
}

// call for ADD_AGENT_DNA_INSTANCE ({id, dna_id, agent_id})
export function add_agent_dna_instance(payload) {
  console.log(">> ADD_AGENT_DNA_INSTANCE : payload <<");
  return {
    type: 'ADD_AGENT_DNA_INSTANCE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/instance/add`
    }
  }
}

// call for REMOVE_AGENT_DNA_INSTANCE ({id, dna_id, agent_id})
export function remove_agent_dna_instance(payload) {
  console.log(">> REMOVE_AGENT_DNA_INSTANCE : payload <<");
  return {
    type: 'REMOVE_AGENT_DNA_INSTANCE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/instance/remove`
    }
  }
}

// call START_AGENT_DNA_INSTANCE ({ id })
export function start_agent_dna_instance(payload) {
  console.log(">> START_AGENT_DNA_INSTANCE : payload <<");
  return {
    type: 'START_AGENT_DNA_INSTANCE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/instance/start`
    }
  }
}

// call STOP_AGENT_DNA_INSTANCE ({ id })
export function stop_agent_dna_instance(payload) {
  console.log(">> STOP_AGENT_DNA_INSTANCE : payload <<");
  return {
    type: 'STOP_AGENT_DNA_INSTANCE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/instance/stop`
    }
  }
}

////////////////////////////////////////////////////////////////////////
                // INTERFACE API calls
////////////////////////////////////////////////////////////////////////
// call START_INTERFACE ()
// NB: This call starts the INTERFACE by adding a new interface
export function start_interface() {
  console.log(">> START_INTERFACE <<");
  return {
    type: 'START_INTERFACE',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: `admin/interface/add`
    }
  }
}

// call STOP_INTERFACE ()
// NB: This call stops the INTERFACE by removal of interface entirely
export function stop_interface() {
  console.log(">> ST0P_INTERFACE <<");
  return {
    type: 'ST0P_INTERFACE',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: `admin/interface/remove`
    }
  }
}

// call ADD_INSTANCE_TO_INTERFACE ({ interface_id, instance_id })
// NB: This call restarts the interface to get change in effect
export function add_instance_to_interface(payload) {
  console.log(">> ADD_INSTANCE_TO_INTERFACE : payload <<");
  return {
    type: 'ADD_INSTANCE_TO_INTERFACE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/interface/add_instance`
    }
  }
}

// call REMOVE_INSTANCE_FROM_INTERFACE({ PUT PAYLOAD REQS HERE })
// NB: This call restarts the interface to get change in effect
export function remove_instance_from_interface(payload) {
  console.log(">> REMOVE_INSTANCE_FROM_INTERFACE : payload <<");
  return {
    type: 'REMOVE_INSTANCE_FROM_INTERFACE',
    payload,
    meta: {
    	holochainAction: true,
    	callString: `admin/interface/remove_instance `
    }
  }
}
////////////////////////////////////////////////////////////////////////
                // AGENT API calls
////////////////////////////////////////////////////////////////////////
// admin/agent/list
export function get_agent_list() {
  console.log(">> GET_AGENT_LIST <<");
  return {
    type: 'GET_AGENT_LIST',
    payload:[],
    meta: {
    	holochainAction: true,
    	callString: `admin/agent/list`
    }
  }
}

/////////////////////////////////////////////////////////////////////////

// state check
export function fetch_state() {
  return {
    type: FETCH_STATE
  };
}

/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////
      /* Working Container APIs*/
///////////////////////////////////////////
// [x]  admin/dna/list()
// [x]  ~ !! admin/instance/list()
// [x]  ~ !! admin/instance/running()
// [x]  info/instances()

// [x]  admin/instance/add({id, dna_id, agent_id})
// [x]  admin/instance/remove({id})
// [x]  admin/dna/install_from_file({id, path})
// [x]  admin/dna/uninstall({id})
// [x]  ~ !! admin/instance/start({id})
// [x]  ~ !! admin/instance/stop({id})

// [ ] admin/interface/add (starts the interface)
// [ ] admin/interface/remove (stops the interface)
// [ ] admin/interface/add_instance (restarts the interface to get change in effect)
// [ ] admin/interface/remove_instance (restarts the interface to get change in effect)
// [ ] admin/interface/list

// NB: Be sure to set `admin = true` in container basic.toml config
/////////////////////////////////////////////////////////////////////////
