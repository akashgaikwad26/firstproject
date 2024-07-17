import React, { useRef, useState } from "react";
import JourneyTabs from "./JourneyTabs";
import Explore from "../Explore/Explore";
import Tabs1 from "../Tabs/Tabs1";
import { useEffect } from "react";
import ApiConfig from "../../ApiConfig";
import axios from "axios";
import SelectLang from "../Modules/SelectLang";
import LoaderUtility from "../Session/LoaderUtility";

import { getValueFromSession } from "../UtilityFunctions/getSetValueSession";

import "./MyJourneyui.scss";

const MyJourney = () => {
  const [selected, setSelected] = useState([]);
  const [selecttrack, setselecttrack] = useState("");
  const [isActive, setIsActive] = useState(false);
  // const [loading, setloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false)
  const [userLabels, setUserLabels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // let username = sessionStorage.getItem("username");
  let username = getValueFromSession("username");
  let group = sessionStorage.getItem("usergroup");
  let track = sessionStorage.getItem("language");
  let Api = new ApiConfig();


  useEffect(() => {
    tracksForJourney();
  }, [selecttrack]);

  useEffect(() => {
    handleUserlabels();
  }, [])

  const handleUserlabels = async () => {
    setIsLoading(true);
    const response = await axios.get(Api.addApiKey(`${Api.BaseURI}/getusercategory?userid=${username}`))
    // console.log("handleUserlabels", response.data.data)
    setUserLabels(response?.data.data)
    setSelectedCategory(response.data.data[0].label)
    setIsLoading(false)
  }

  async function tracksForJourney() {
    setIsLoading(true);
    await axios
      .get(Api.addApiKey(`${Api.BaseURI}/tracksforjourney?userid=${username}`))
      .then((resp) => {
        // console.log("tracksforjourney", resp.data);
        setSelected(resp.data);
        setResponse(true);
        // console.log("trackdata",resp.data)
        if (resp.data.length > 0) {
          // let array=(res.data.result.map((item)=>item.track));
          setSelected(resp.data);
          if (selecttrack.length == 0) {
            setselecttrack(resp.data[0].track);
          }
        } else {
          setSelected([]);
        }
      });
    if (selecttrack == '') {
      setIsLoading(false)
    }
    // setIsLoading(false);
    // console.log("selected", selected)
    // console.log("selecttrack", selecttrack)
  }



  let trackRef = useRef(null);
  // console.log("isActive", isActive)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (trackRef.current && !trackRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trackRef]);

  function selecttrackcomp() {
    if (selected.length === 0) {
      return (
        <div className="pyui_dropdown-wrapper">
          <div className="pyui_dropdown-wrapper-label zerostate">
            No track history available!
          </div>
        </div>
      );
    } else {
      return (
        <div className="pyui_dropdown-wrapper">
          <div className="pyui_dropdown-wrapper-label">Select a track :</div>
          <div ref={trackRef}>
            <SelectLang
              isActive={isActive}
              setIsActive={setIsActive}
              selected={selected}
              setSelected={setSelected}
              setselecttrack={setselecttrack}
              selecttrack={selecttrack}
            />
          </div>
        </div>
      );
    }
  }


  return (
    <section className="pyui_main-container page-journey">
      <Explore />
      <section className="pyui_main-container-section">
        <div className="pyui_main-container-section-topbar">
          <div className="pyui_main-container-section-topbar-tabs">
            <Tabs1 />
          </div>
          {/* <div className="pyui_main-container-section-topbar-option">Quiz</div> */}
        </div>
        <section className="pyui_main-container-section-content pyui_journey-section">
          {!response ? (
            <LoaderUtility isLoading={!response} />
          ) : (
            <section>
              <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {selecttrackcomp()}

              </section>
              <JourneyTabs
                selecttrack={selecttrack}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                userLabels={userLabels}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default MyJourney;
