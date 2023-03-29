
/* eslint-disable no-unused-vars */
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";



// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const [productData, updateProduct] = useState([]);
  const [isFetching, updateFetched] = useState(false);
  const [productNotFound, updateProductNotFound] = useState(false);
  const [timerId, updateTimerId] = useState("");
  const [userLoggedIn, updateUserLoggedIn] = useState(false);
  const [cartData, updateCartData] = useState([]);
  const [userCartItems, updateUserCartItems] = useState([]);
  const [userToken, updateUserToken] = useState("");

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    try{
      updateFetched(true)
      let url = config.endpoint;
      let product = await axios.get(`${url}/products`);
      updateProduct(product.data);
      updateFetched(false);
      return product.data;
    }catch(e){
      console.log(e.message)
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try{
      let url = config.endpoint;
      let product = await axios.get(`${url}/products/search?value=${text}`).catch((e) => {updateProductNotFound(true)})

      if(product.data){
        updateProductNotFound(false);
        updateProduct(product.data);
      }
    }catch(e){
      console.log(e.message)
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    // wait for 500 ms and make a call
    // 1sr request
    let timerId = setTimeout(() => performSearch(event), 500);
    updateTimerId(timerId);
  };

  useEffect( ()=>{
    async function onLoad(){
       const product=await performAPICall();
      let user=localStorage.getItem('username');
      // eslint-disable-next-line no-lone-blocks
      {user && updateUserLoggedIn(true)} 
      let token=localStorage.getItem('token');
      // if(token){
      //   updateUserToken(token);
      //   const cartItems=await fetchCart(token);
      //   //console.log()
      //   updateUserCartItems(cartItems);// Array of objects with productId and quantity of products in cart
      //   const cartData=await generateCartItemsFrom(cartItems,product)
      //   updateCartData(cartData);
      // }
    }
    onLoad();
  },[])

  const addToCart = async(token, items, products, productId, qty, options = {preventDuplicate: false}) => {
    
  }

  const onButtonClick = (id, handle) => {
    console.log("Button CLick")
    console.log(id, handle)
    addToCart(userToken, userCartItems, productData, id, null, {preventDuplicate: handle})
  };



  return (
    <div>
      <Header hasHiddenAuthButtons={false}>
      {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
      
      <TextField
        className = "search-desktop"
        size = "small"
        onChange = {(e) => {debounceSearch(e.target.value,timerId)}}
        InputProps = {{
          endAdornment: (
            <InputAdornment position = "end">
              <Search color = "primary" />
            </InputAdornment>
          ),
        }}
        placeholder = "Search for items/categories"
        name = "search"
      />
        
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        onChange={(e) => {debounceSearch(e.target.value,timerId)}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
       {
       isFetching?<div className={"Loading products..."}>
                      <CircularProgress />
                      <h3>Loading Products</h3>
                    </div>
                  : !productNotFound?
                  <>
                  {
                    !userLoggedIn?
                    <Grid container >
                    <Grid container spacing={{ xs: 2, md: 3 ,lg:1 }} >
                      {productData.map((x)=>
                         (<Grid item lg={3} md={6} sm={6} xs={6} mt={2} mb={2} key={x['_id']}  >
                          <ProductCard product={x}/>
                        </Grid>
                        )
                        )}
                    </Grid>
                  </Grid>:
                <Grid container  >
                    <Grid container spacing={{ xs: 2, md: 3 ,lg:1 }} md={9} >
                      {productData.map((x)=>
                          (<Grid item lg={4} md={4} sm={6} xs={6} mt={2} mb={2} key={x['_id']}  >
                          <ProductCard product={x} /> 
                        </Grid>
                        )
                        )}
                    </Grid>
                    
                  </Grid>
                  }
                  </>
                    :<div className={"Loading products..."}>
                    <SentimentDissatisfied/>
                    <h3>No products found</h3>
                  </div>          
      }
      <Footer />
    </div>
  );
};

export default Products;
