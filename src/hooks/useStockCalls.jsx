import React from "react";
import { useDispatch } from "react-redux";
import { getSuccess, fetchFail, fetchStart } from "../features/stockSlice";
import { axiosWithToken } from "../service/axiosInstance";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const getStockData = async (arg) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${arg}/`);
      dispatch(getSuccess({ data, arg }));
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
