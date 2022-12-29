// import axios from "axios";
import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";
// import { useDispatch, useSelector } from "react-redux";

const Firms = () => {
  const { getFirms } = useStockCalls();

  //! Instead of writing the functions here we can use custom hooks, that way it is easier to read.
  //! If I wrote the logic here, then I would need to repeat myself for other pages as well.

  // const { token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const getFirms = async () => {
  //   const url = "firms";
  //   const BASE_URL = "https://14191.fullstack.clarusway.com/";
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     dispatch(getSuccess({ data, url }));
  //     console.log(data);
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error.message);
  //   }
  // };
  useEffect(() => {
    getFirms();
  }, []);
  return <div>Firms</div>;
};

export default Firms;
