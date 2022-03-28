let timeFix = 0

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const createNotification = (notification, time) => {
    return async (dispatch) => {
        clearTimeout(timeFix)
        timeFix = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: null,
            })
        }
        , time * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            notification,
        })
    }
}

export default notificationReducer