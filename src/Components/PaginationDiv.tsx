import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import SearchDic from "./SearchDic";
import { Select } from "@material-ui/core";

interface Props {}

const PaginationDiv = (props: any) => {
  const [page, setpage] = useState(0);
  const [pageCount, setpageCount] = useState(1);

  // useEffect(() => {
  //   getData();
  // }, [page]);

  // useInterval(() => {
  //   // props.handleData([])
  //   // setpage(page+1)
  //   setpageCount(pageCount + 1);
  // }, 5000);

  // const getData = () => {
  //   axios
  //     .get(
  //       `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
  //     )
  //     .then((res) => {
  //       props.handleData(res.data.hits);
  //     });
  // };

  return (
    <>
      <div
        style={{ position: "fixed", backgroundColor: "white", width: "100%" }}
      >
        <SearchDic page={page} handleData={props.handleData} />
        <Pagination
          color="primary"
          count={props.pageCount}
          page={page}
          defaultPage={1}
          onChange={(e, value) => {
            setpage(value);
          }}
        />
        <Select
          style={{ float: "left" }}
          native
          // value={sortMy}
          onChange={props.handleSelect}
          inputProps={{
            name: "age",
            id: "age-native-simple",
          }}
        >
          <option value="default">Sort</option>
          <option value="asc">Asc</option>
          <option value="desc">Dsc</option>
        </Select>
      </div>
    </>
  );
};

export default PaginationDiv;
