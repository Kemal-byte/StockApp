import React from "react";
import { useDispatch } from "react-redux";
import { getSuccess, fetchFail, fetchStart } from "../features/stockSlice";
import { axiosWithToken } from "../service/axiosInstance";

const useStockCalls = () => {
  const dispatch = useDispatch();

  //!------------- GET CALLS ----------------
  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error.message);
    }
  };
  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");
  const getBrands = () => getStockData("brands");
  const getCategories = () => getStockData("categories");
  const getProducts = () => getStockData("products");

  //!------------- Delete CALLS ----------------
  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      //? After deleting the stock we are sending a request to receive the updated stock data
      getStockData(url);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteFirm = (id) => deleteStockData("firms", id);

  //!------------- POST CALLS ----------------
  const PostStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      //? With axios post you need to specify the url and the information you want to send. it takes 2 parameters
      //? axios.post(url, info)
      getStockData(url);
    } catch (error) {
      console.log(error.message);
    }
  };
  const PostFirm = (info) => PostStockData(info, "firms");

  //!------------- PUT CALLS ----------------
  const PutStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      getStockData(url);
    } catch (error) {
      console.log(error.message);
    }
  };
  const PutFirm = (info) => PutStockData(info, "firms");

  return {
    getFirms,
    getSales,
    getBrands,
    deleteFirm,
    PostFirm,
    PutFirm,
    getCategories,
    getProducts,
  };
};

export default useStockCalls;
