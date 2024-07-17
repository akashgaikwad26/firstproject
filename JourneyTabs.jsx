import { useState } from 'react';

import MyJourney from './JourneyStatusTabs/ProgressBoard';
import Certificates from './JourneyStatusTabs/Certificates';
import IntershipCertificates from './JourneyStatusTabs/IntershipCertificates';
import QuizHistory from './JourneyStatusTabs/QuizHistory';
import './journeytabs.scss'
import Timeline from './JourneyStatusTabs/Timeline';
import DailyReport from './DailyReport/DailyReport';

const JourneyTabs = ({ selecttrack, isLoading, setIsLoading, selectedCategory, setSelectedCategory, userLabels }) => {
  const [activeTab, setActive] = useState(() => {
    let curr = sessionStorage.getItem('jactivetab');
    return curr || "progress";
  });
  // console.log(activeTab)

  function setActiveTab(active) {
    switch (active) {
      case "progress":
        return (
          <MyJourney selecttrack={selecttrack} setIsLoading={setIsLoading}
            isLoading={isLoading} />
        );

      case "certificate":
        return (
          <Certificates selecttrack={selecttrack} />
        );

      case "internshipcertificate":
        return (
          <IntershipCertificates selecttrack={selecttrack} />
        );

      case "qhistory":
        return (
          <QuizHistory selecttrack={selecttrack} />
        );

      case "timeline":
        return (
          <Timeline selecttrack={selecttrack} />
        );
      case "report":
        return (
          <DailyReport userLabels={userLabels}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            setIsLoading={setIsLoading}
            isLoading={isLoading} selecttrack={selecttrack} />
        );

      default:
        return (
          <MyJourney selecttrack={selecttrack} setIsLoading={setIsLoading}
            isLoading={isLoading} />
        )
    }
  }

  const handleTab1 = (active) => {
    // update the state to tab1
    setActive(active);
    sessionStorage.setItem("jactivetab", active)
  };




  return (
    <section className="pyui_journeytabs-container">
      <nav className="pyui_journeytabs-status-tabs">
        <ul className="pyui_journeytabs-status-tabs-jtlist">
          <li
            className={activeTab === "progress" ? "active" : ""}
            onClick={() => handleTab1("progress")}
          >
            <i id="available" class="fa-sharp fa-solid fa-circle"></i>
            Progress Board
            {/* <div className="count">{available.length}</div> */}
          </li>
          <li
            className={activeTab === "certificate" ? "active" : ""}
            onClick={() => handleTab1("certificate")}
          >
            <i id="available" class="fa-sharp fa-solid fa-circle"></i>
            Certificates
            {/* <div className="count">{complete.length}</div> */}
          </li>
          <li
            className={activeTab === "internshipcertificate" ? "active" : ""}
            onClick={() => handleTab1("internshipcertificate")}
          >
            <i id="available" class="fa-sharp fa-solid fa-circle"></i>
            Internship Certificates
            {/* <div className="count">{complete.length}</div> */}
          </li>
          <li
            className={activeTab === "qhistory" ? "active" : ""}
            onClick={() => handleTab1("qhistory")}
          >
            <i id="available" class="fa-sharp fa-solid fa-circle"></i>
            Quiz History
            {/* <div className="count">{complete.length}</div> */}
          </li>
          {process.env.REACT_APP_TIMELINE_CHART == 'true' ? <li
            className={activeTab === "timeline" ? "active" : ""}
            onClick={() => handleTab1("timeline")}
          >
            <i id="available" class="fa-sharp fa-solid fa-circle"></i>
            Timeline
            {/* <div className="count">{complete.length}</div> */}
          </li> : ''}
          {process.env.REACT_APP_SHOW_USER_CATEGORY === 'true' && (
            <>
              {userLabels.length > 0 && (
                <li className={activeTab === "report" ? "active" : ""}
                  onClick={() => handleTab1("report")}>
                  <i id="available" class="fa-sharp fa-solid fa-circle"></i>
                  Leaderboard
                  {/* <div className="count">{complete.length}</div> */}
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
      <article className="pyui_journeytabs-status-tab-content">
        {setActiveTab(activeTab)}
      </article>
    </section>
  );
}

export default JourneyTabs