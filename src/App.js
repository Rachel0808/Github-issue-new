import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PublicNavbar from "./components/PublicNavbar";
import { ClipLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import IssueList from "./components/IssueList";
import PaginationBar from "./components/PaginationBar";

function App() {
  const [loading, setLoading] = useState();
  const [dataFetch, setDataFetch] = useState([]);
  const [owner, setOwner] = useState("Facebook");
  const [repo, setRepo] = useState("React");
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataIssues, setDataIssues] = useState([]);
  useEffect(() => {
    const fetchIssueData = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;

        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
          const link = res.headers.get("link");

          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            ); // regular expression
            if (getTotalPage) {
              setTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setDataIssues(data);
          setErrorMsg(null);
          console.log(data);
        } else {
          setErrorMsg(`FETCH ISSUES ERROR: ${data.message}`);
        }
      } catch (error) {
        setErrorMsg("FETCH ISSUES ERROR:", error.message);
        alert(errorMsg);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, errorMsg, pageNum]);
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
          const res = await fetch(url);
          const data = await res.json();

          setDataFetch(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    },
    owner,
    repo
  );
  return (
    <>
      <PublicNavbar />
      <Container>
        <h1 className="text-center">Github Issue</h1>
        <SearchForm />
        <PaginationBar>
          <div>
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPageNum={totalPageNum}
            />
          </div>
        </PaginationBar>
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        ) : (
          <IssueList itemList={dataFetch} />
        )}
      </Container>
    </>
  );
}

export default App;
