import ACTION_TYPE from '../constants'

export const addW = (id, routes, plan, vehicle) => ({
    type: ACTION_TYPE.ADD_W,
    payload: { id, routes, plan, vehicle }
});


export const addS = (id, routes, plan, vehicle) => ({
    type: ACTION_TYPE.ADD_S,
    payload: { id, routes, plan, vehicle }
});

export const addP = ( wprice, sprice ) => ({
    type: ACTION_TYPE.ADD_P,
    payload: {  wprice, sprice }
});
