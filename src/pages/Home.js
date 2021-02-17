import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import Axios from "../api-client/axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      padding: 20,
    },
  })
);

function Home() {
  const [sections, setSections] = useState([]);
  const [activeSession, setactiveSession] = useState(null);
  const [news, setNews] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    // if (!isLoggedIn) history.push("/login");

    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const result = await Axios.get("all/all.json?");
      setNews(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <SideMenu
        onSelect={(e) => setactiveSession(e)}
        sections={sections}
        setSections={setSections}
      />
      <div>
        {news
            // .filter((x) => x.section == activeSession)
          .map((item, index) => (
            <div className={classes.content}>
              <img src={item.thumbnail_standard} />
              <h5>{item.title}</h5>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
