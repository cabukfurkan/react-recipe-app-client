const initialApiKey = {
    apiKey: process.env.REACT_APP_API_KEY,
}

const changeApiKey = (state = initialApiKey, action) => {
    switch (action.type) {
        case "UPDATE_API_KEY":
            return { apiKey: action.payload }
        default:
            return state;
    }
}

export default changeApiKey