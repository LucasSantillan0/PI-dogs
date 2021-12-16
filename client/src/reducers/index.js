const initialState= []



export default function rootReducer (state= initialState, action) {
    switch (action.type) {
        case "LOADING":
            return["LOADING"]
        case "INIT_STORE":
        return [...action.payload]
        default:
            return [...state]
    }
}