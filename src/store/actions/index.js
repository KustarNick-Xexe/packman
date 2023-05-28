import ACTION_TYPE from '../constants'

export const addVehicle = (id, routes, plan, vehicle) => ({
    type: ACTION_TYPE.ADD_VEHICLE,
    payload: { id, routes, plan, vehicle }
});