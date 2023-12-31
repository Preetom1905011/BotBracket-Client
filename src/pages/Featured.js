import React, { useEffect } from "react";
import "../styles/featured.css";
import { CSSTransition } from "react-transition-group";
import FeaturedCard from "../components/FeaturedCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { RiseLoader} from "react-spinners";
import loadScrappy from "../media/Scrappy2_loading.png";
import { useFeatureFetch } from "../hooks/useFeatureFetch";


export default function Featured() {

  const {fetchFeaturedTMs, allPubTMs, allUsers, isFetching} = useFeatureFetch();

  useEffect(() => {
    console.log("start in feature")
    const fetchData = async () => {
      await fetchFeaturedTMs();
    }
    fetchData();
    console.log("end in feature")

  }, [])


  return (
    <div className="featured-page">
      <div className="featured background-style-all">
        <CSSTransition
          appear
          in
          classNames="featureLeft-transition"
          timeout={350}
        >
          <div className="featured-left">
            <div className="featured-text">
              {/* <img src={logo} /> */}
              <h4>Check out some of the awesome tournaments managed using</h4>
              <h2>BotBracket</h2>
              {/* <img src={logo} /> */}
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          appear
          in
          classNames="featureScene-transition"
          timeout={350}
        >
          <div className="featured-scene">
            {allPubTMs.map((TM) => (
              <FeaturedCard TM={TM} allUsers={allUsers} key={TM?._id}/>
            ))}

            {isFetching && <div className="feature-loader">
                            <img src={loadScrappy} alt='Loading'/>
                            <RiseLoader
                              color={"#00375e"}
                              loading={isFetching}
                              className="loader"
                              size={30}/></div>}
          </div>
        </CSSTransition>
      </div>
      

      <a href="#navbar">
        <ArrowUpwardIcon className="arrow" />
      </a>
    </div>
  );
}
