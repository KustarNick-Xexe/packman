import ACTION_TYPE from '../constants'

const initialState = {
    witems: [],
    sitems: [],
    prices: null,
};

const addW = (state, action) => {
    const newItem = {
        idV: action.payload.id,
        routes: action.payload.routes,
        plan: action.payload.plan,
        vehicle: action.payload.vehicle,
    };
    return {
        ...state,
        witems: [...state.witems, newItem],
    };
};

const addS = (state, action) => {
    const newItem = {
        idV: action.payload.id,
        routes: action.payload.routes,
        plan: action.payload.plan,
        vehicle: action.payload.vehicle,
    };
    return {
        ...state,
        sitems: [...state.sitems, newItem],
    };
};

const addP = (state, action) => {
    return {
        ...state,
        prices: { wp: +action.payload.wprice, sp: +action.payload.sprice },
    };
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_W:
            return addW(state, action);
        case ACTION_TYPE.ADD_S:
            return addS(state, action);
        case ACTION_TYPE.ADD_P:
            return addP(state, action);
        default:
            return state;
    }
};

export default rootReducer;