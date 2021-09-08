import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  Container,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Select,
} from "@material-ui/core";
import PaginationDiv from "./PaginationDiv";
import useInterval from "../Hooks/useInterval";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../services/api";
var sortJsonArray = require("sort-json-array");

interface Props {}
interface IState {
  title: string;
  url: string;
  created_at: string;
  author: string;
}

const Home = (props: Props) => {
  const [data, setdata] = useState<any>([]);
  const [page, setpage] = useState(1);
  const [pageCount, setpageCount] = useState(1);
  const [hasMore, sethasMore] = useState<boolean>(true);
  const [sortMy, setsortMy] = useState("");

  useEffect(() => {
    api.fetchDataAPI(page).then((res) => {
      setdata(res.data.hits);
    });
  }, []);

  useInterval(() => {
    setpage(page + 1);
    api.fetchDataAPI(page).then((res) => {
      const dataM = res.data.hits;
      setdata([...data, ...dataM]);
    });
  }, 5000);

  const handleData = (items: any) => {
    setdata(items);
  };

  const fetchMore = () => {
    const arrLen = data.length;
    setpageCount(arrLen / 20);
  };

  const handleSelect = (e: any) => {
    setsortMy(e.target.value);
    if (e.target.value === "asc") {
      console.log("asc");
      const dataSorted = sortJsonArray(data, "title", "asc");
      setdata(dataSorted);
    }
    if (e.target.value === "desc") {
      console.log("des");
      const dataSorted = sortJsonArray(data, "title", "des");
      setdata(dataSorted);
    }
    if (e.target.value === "default") {
     
      return
    }
  };

  return (
    <>
      <Container>
        
        <PaginationDiv handleData={handleData} pageCount={pageCount} handleSelect={handleSelect}/>
        
        
        <TableContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Table style={{ marginTop: "130px" }}>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>TITLE</TableCell>
                  <TableCell>AUTHOR</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>CREATED_AT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((elem: any, index: any) => (
                    <>
                      <TableRow>
                        {/* <TableCell>{index + 1}</TableCell> */}
                        <TableCell>{elem.title}</TableCell>
                        <TableCell>{elem.author}</TableCell>
                        <TableCell>{elem.url}</TableCell>
                        <TableCell>{elem.created_at}</TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Container>
    </>
  );
};

export default Home;
