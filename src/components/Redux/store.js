import {createStore} from 'redux';

const reducer = (state, action)=>{
    switch (action.type) {
        case "cambio":

            return {
                name: action.name
            };
            break;
    
        default:
            return state;
            break;
    }
}
export default createStore(reducer, {

    name: "cristian"

});

