import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuccess, fetchFail, fetchStart } from "../features/stockSlice";

const Firms = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  useEffect(() => {
    getFirms();
  }, []);
  return <div>Firms</div>;
};

export default Firms;
