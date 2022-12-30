// import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductModule from "../components/models/ProductModule";
import useStockCalls from "../hooks/useStockCalls";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { arrowStyle, btnHoverStyle } from "../styles/globalStyle";
// import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const { getCategories, getBrands, getProducts } = useStockCalls();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState({
    brand: false,
    name: false,
    stock: 1,
  });
  const [info, setInfo] = useState({});

  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);

  function handleSortNumber(arg) {
    setToggle({ ...toggle, [arg]: toggle[arg] * -1 });
  }
  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>
      <ProductModule
        open={open}
        setOpen={setOpen}
        setInfo={setInfo}
        info={info}
      />
      {true && (
        <TableContainer
          component={Paper}
          sx={{ marginTop: "1rem" }}
          elevation={10}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Categoty</TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSortNumber("stock")}
                  >
                    <Typography variant="body" noWrap>
                      Brand
                    </Typography>
                    {toggle.stock === 1 && <UpgradeIcon />}
                    {toggle.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle}>
                    <Typography variant="body" noWrap>
                      Name
                    </Typography>
                    {true && <UpgradeIcon />}
                    {false && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle}>
                    <Typography variant="body" noWrap>
                      Stock
                    </Typography>
                    {true && <UpgradeIcon />}
                    {false && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle}>
                    <Typography variant="body" noWrap>
                      Operation
                    </Typography>
                    {true && <UpgradeIcon />}
                    {false && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <DeleteForeverIcon sx={btnHoverStyle} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
