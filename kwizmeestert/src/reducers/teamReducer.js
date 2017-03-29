const initialState = {
    teams: [{
        name: 'team 1',
        allowed: false
    }, {
        name: 'team 2',
        allowed: false
    }, {
        name: 'team 3',
        allowed: false
    }]
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default teamReducer;
