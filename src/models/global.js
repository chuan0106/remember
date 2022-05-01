
export default {
    namespace: 'global',

    state: {
        // 有否有权限
        secret: false,
    },

    subscriptions: {
        setup ({ dispatch, history })
        {

        },
    },

    effects: {},
    reducers: {
        secretRes (state, action)
        {
            state.secret = action.payload;
            return { ...state };
        }
    },
};
