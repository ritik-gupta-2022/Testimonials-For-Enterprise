import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from './constant';

const initialState = { 
    product: {}, 
    pLoading: false,
    pIsUpdated: false, 
    perror: null,
    products: [],
};
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductRequest: (state) => {
            state.pLoading = true;
        },
        addProductSuccess: (state, action) => {
            state.pLoading = false;
            state.product = action.payload;
        },
        addProductFail: (state, action) => {
            state.pLoading = false;
            state.perror = action.payload;
        },
        getProductsRequest: (state) => {
            state.pLoading = true;
        },
        getProductsSuccess: (state, action) => {
            state.pLoading = false;
            state.products = action.payload;
        },
        getProductsFail: (state, action) => {
            state.pLoading = false;
            state.perror = action.payload;
        },
        getProductDetailsRequest: (state) => {
            state.pLoading = true;
        },
        getProductDetailsSuccess: (state, action) => {
            state.pLoading = false;
            state.product = action.payload;
        },
        getProductDetailsFail: (state, action) => {
            state.pLoading = false;
            state.perror = action.payload;
        },
        clearProduct: (state) => {
            state.product = {};
            state.pLoading = false;
            state.perror = null;
        },
        clearperrors: (state) => {
            state.perror = null;
        }
    }
});
export const { 
    addProductRequest,
    addProductSuccess,
    addProductFail,
    getProductsRequest,
    getProductsSuccess,
    getProductsFail,
    getProductDetailsRequest,
    getProductDetailsSuccess,
    getProductDetailsFail,
    clearProduct,
    clearperrors
} = productSlice.actions;

export const addProduct = (product,businessid) => async (dispatch) => {
    try {
        dispatch(addProductRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${API_URL}/api/product/${businessid.businessid}/createproduct`, product, config);
        dispatch(addProductSuccess(data));
    } catch (error) {
        dispatch(addProductFail(error.response.data.message));
    }
};
export const getProducts = (businessid) => async (dispatch) => {
    try {
        dispatch(getProductsRequest());
        const config = {
            withCredentials: true, // Include cookies in the request
        };
        const { data } = await axios.get(`${API_URL}/api/product/${businessid}/getproducts`, config);
        dispatch(getProductsSuccess(data));
    }
    catch (error) {
        // console.log(error);
        dispatch(getProductsFail(error.response.data.message));
    }
}

export const productDetails=(productid)=>async(dispatch)=>{
    try{
        dispatch(getProductDetailsRequest());
        const config = {
            withCredentials: true, // Include cookies in the request
        };
        const { data } = await axios.get(`${API_URL}/api/product/${productid}`, config);
        dispatch(getProductDetailsSuccess(data));
    }
    catch(error){
        dispatch(getProductDetailsFail(error.response.data.message));
    }
}

export default productSlice.reducer;