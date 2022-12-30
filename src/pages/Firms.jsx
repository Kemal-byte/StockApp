// import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/models/FirmModel";
import useStockCalls from "../hooks/useStockCalls";
// import { useDispatch, useSelector } from "react-redux";

const Firms = () => {
  const { getFirms } = useStockCalls();
  const { firms } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

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
  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Firmalar
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Firm
      </Button>
      <FirmModal open={open} setOpen={setOpen} setInfo={setInfo} info={info} />
      {firms?.length > 0 && (
        <Grid container justifyContent="center" gap={3}>
          {firms?.map((firm) => (
            <Grid item key={firm?.id}>
              <FirmCard
                key={firm?.id}
                firm={firm}
                setOpen={setOpen}
                setInfo={setInfo}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
