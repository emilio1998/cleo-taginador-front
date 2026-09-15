import {combineReducers} from 'redux';
import busquedaTags from './busquedaTagsReducer';
import auth from './authReducer';

const reducer = combineReducers({
    busquedaTags,
    auth
});

export default reducer;