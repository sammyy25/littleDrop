import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS } from "../constant/productCons";


function productListReducer(state = { products: [] }, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products:[]};
        case PRODUCT_LIST_SUCCESS:
            return{ loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;

    }
}

function productSaveReducer(state = { product: {} }, action) {

    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return { loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return{ loading: false, success: true, product: action.payload };
        case PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;

    }
}

function productDeleteReducer(state = { product: {} }, action) {

    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return{ loading: false, success: true, product: action.payload };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;

    }
}
export { productListReducer, productSaveReducer, productDeleteReducer }