import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios';


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {   


    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);



    const addToCart = (itemId) => {
        if(!cartItems[itemId])  setCartItems((prev) => ({...prev, [itemId]:1}));
        else  setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}));        
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
    }
    

    const getTotalCartAmount = () => {
        let totalAmt = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = food_list.find((product) => product._id===item);
                totalAmt += (itemInfo.price) * cartItems[item];
            }
        }
        return totalAmt;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }

        async function loadData(){
            await fetchFoodList();
        }

        loadData();
    }, [])


    const contextValue = { 
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        setFoodList
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;