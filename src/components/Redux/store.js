import {createStore} from 'redux';

const reducer = (state, action)=>{
    switch (action.type) {
        case "change":

            return {
                JsonPosts: action.JsonPosts,
                JsonImages: action.JsonImages,
                filter: action.filter,
                currentPage: action.currentPage
            };
            break;
    
        default:
            return state;
            break;
    }
}
export default createStore(reducer, {

    JsonPosts: [],
    JsonImages: [],
    filter: "",
    currentPage: 1

});

