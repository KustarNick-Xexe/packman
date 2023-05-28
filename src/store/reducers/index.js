import ACTION_TYPE from '../constants'

const initialState = {
    items: [],
};

const addVehicle = (state, action) => {
    const newItem = {
        idV: action.payload.id,
        routes: action.payload.routes,
        plan: action.payload.plan,
        vehicle: action.payload.vehicle,
    };
    return {
        ...state,
        items: [...state.items, newItem],
    };
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_VEHICLE:
            return addVehicle(state, action);
        default:
            return state;
    }
};
  
export default rootReducer;