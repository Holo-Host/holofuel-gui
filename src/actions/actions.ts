
// import { createHolochainAsyncAction } from '../utils/holochainAxiosActions';
import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';

export const ExampleHolochainAction = createHolochainAsyncAction<string, number>('App', 'Zome', 'Capability', 'FuncName');
