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

  return { getFirms, getSales, getBrands };
};

export default useStockCalls;
