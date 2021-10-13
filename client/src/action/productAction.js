import axios from "axios";
import {PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS} from "../constant/productCons";
const listProduct = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get('https://littledropbackend.herokuapp.com/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
        localStorage.setItem('products', JSON.stringify(data));
    }
    catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const saveProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        // const {userSignin: {userInfo}} = getState();
        if(!product._id){
        const { data } = await axios.post('https://littledropbackend.herokuapp.com/api/products', product);
        // , product, {header: {
        //     'Authorization': 'Bearer' + userInfo.token
        // }});
        dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        } else{
            const {data} = await axios.put('https://littledropbackend.herokuapp.com/api/products/' + product._id, product);
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }
        
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.msg})
    }
}

const deleteProduct = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST});
        const {data} = await axios.delete('https://littledropbackend.herokuapp.com/api/products');
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true});
    }
    catch(error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
    }
}

export { listProduct, saveProduct, deleteProduct }

// https://ibb.co/rkfGPjD
// https://ibb.co/18F3861
// https://ibb.co/TWKk8cp
// https://ibb.co/YtHmTTH
// https://ibb.co/nf3np0k
// https://ibb.co/YTLbwmD