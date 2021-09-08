import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import api from "../services/api";

interface Props {}

const SearchDic = (props: any) => {
  const [DataFiltered, setDataFiltered] = useState("");

  const handleFilter = () => {
    api.fetchSearchAPI(props.page, DataFiltered).then((res) => {
      props.handleData(res.data.hits);
    });
  };

  return (
    <>
      <TextField onChange={(e) => setDataFiltered(e.target.value)} />
      <br />
      <Button
        variant="contained"
        color="primary"
        disabled={DataFiltered === "" ? true : false}
        onClick={() => handleFilter()}
      >
        Search
      </Button>
    </>
  );
};

export default SearchDic;
