import React from "react";

const useStockCalls = () => {
  const getFirms = async () => {
    const url = "firms";
    const BASE_URL = "https://14191.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
        headers: { Authorization: `Token ${token}` },
      });
      dispatch(getSuccess({ data, url }));
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error.message);
    }
  };
  return <div>useStockCalls</div>;
};

export default useStockCalls;
