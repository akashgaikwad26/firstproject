import React, { useEffect, useState } from 'react'
import ApiConfig from '../ApiConfig'
import axios from 'axios';
import { Link } from "react-router-dom";
import {PulseLoader} from 'react-spinners'
import * as moment from 'moment';
import {FaArrowUp,FaArrowDown} from 'react-icons/fa'
import {IoIosRefresh} from 'react-icons/io'
// import "../../assets/styles/abstracts/_index.scss"
// import "../../assets/styles/_Scss/_index.scss"

function AdminSubscriptions() {

    const [change, setChange] = useState(false)
    const [data, setData] = useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortKey, setSortKey] = useState('userid');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSort = (key) => {
        if (key === sortKey) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortKey(key);
          setSortOrder('asc');
        }
      };

      
    const filters = {
        'All': () => true,
        'Last 30 days': (item) => {
          const last30Days = new Date();
          last30Days.setDate(last30Days.getDate() - 30);
          return new Date(item.pkg_purchasedate) >= last30Days;
        },
        'Last 15 days': (item) => {
          const last15Days = new Date();
          last15Days.setDate(last15Days.getDate() - 15);
          return new Date(item.pkg_purchasedate) >= last15Days;
        },
        '1 week': (item) => {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return new Date(item.pkg_purchasedate) >= oneWeekAgo;
        },
      };

  
    function render3() {
        if (sortOrder=='asc') {
          // console.log("sorted1.reversed ", sorted3.reversed)
          return <FaArrowDown />;
        } else {
          return <FaArrowUp />;
        }
      }


      useEffect(()=>{
        let  sortedData = data.filter((item) => {
        const itemValues = Object.values(item).map((value) =>
          String(value).toLowerCase()
        );
        return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
      });
      setFilteredData(sortedData)
    },[searchQuery])


    useEffect(()=>{
        setFilteredData(data?.filter(filters[selectedFilter]));

   },[selectedFilter])
      
      useEffect(()=>{
        let sortedData = filteredData?.sort((a, b) => {
            if(sortKey !=undefined && a[sortKey]!=undefined && b[sortKey]!=undefined){
            if (sortOrder === 'asc' ) {
              // updatedat,updatedBy,packages,transactionamount,orderstatus,transactionstatus,transactiondate,transactionid,userid,username,orderdate,orderid
      
              if (sortKey === 'pkg_purchasedate') {
                  return new Date(a[sortKey]) - new Date(b[sortKey]);
                }
              else if(sortKey==='enddate'){
                  return new Date(a[sortKey])- new Date(b[sortKey]);
              }
              else if(sortKey=='subid'){
                  return a[sortKey] - b[sortKey];
              }
              else if(sortKey=='transactionamount'){
                  return  a[sortKey] - b[sortKey];
              }
             {
                  return a[sortKey].localeCompare(b[sortKey]);
              }
      
            }
             else {
      
             if (sortKey === 'pkg_purchasedate') {
                  return new Date(b[sortKey]) - new Date(a[sortKey]);
                }
              else if(sortKey==='enddate'){
                  return new Date(b[sortKey])- new Date(a[sortKey]);
              }
              else if(sortKey=='subid'){
                  return b[sortKey] - a[sortKey];
              }
              else if(sortKey=='transactionamount'){
                  return  b[sortKey] - a[sortKey];
              }
              else{
                  return b[sortKey].localeCompare(a[sortKey]);
              }
            }
          }
          });
        setFilteredData(sortedData)
    },[sortOrder,sortKey])
    const uri = new ApiConfig().BaseURI
    let Api = new ApiConfig()
    const override2 = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10rem",
        // borderColor: "olive",
      };

      function getSubscriptions(){
        setIsLoading(true)
        axios.get(Api.addApiKey(`${Api.BaseURI}/subscriptions`)).then(res => {
            
            if (!res.data) {
                alert("bad api response");
                setIsLoading(false)
            } else if (res.data.status !== true) {
                //setSubscriptionData([]);
                console.log('subscriptions data.status !== true');
                setIsLoading(false)
            } else {

                setData(res?.data?.data);
                setFilteredData(res?.data?.data)

                setIsLoading(false)
            }
        })
      }
    useEffect(() => {
        // console.log(`${Api.BaseURI}/getuserlist`)
       
        console.log('isLoading',isLoading)
        getSubscriptions()
                console.log('isloading',isLoading)
    }, [change])

    function renderTopBar() {
        return (
            <>
                <header className="pyui_payment-section-header">
                    <h2 className="pyui_payment-section-header-title">Subscription History</h2>
                    <nav className="pyui_payment-section-subscription-tab">
                        <ul className="pyui_payment-section-subscription-tab-list">
                            <li>
                                <Link
                                    className="pyui_payment-section-subscription-tab-list-item cart"
                                    to="/adminPayments"
                                >
                                    Payments
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <hr className="pyui_hr-dividerLine"></hr>
            </>
        );
    }

    return (
        <section className="pyui_payment-section">
            <button
            onClick={getSubscriptions}
            >
                <IoIosRefresh/>
            </button>
            {/* {renderTopBar()} */}
            {!isLoading?
                <div>

        <div className="filter" style={{display:'flex',gap:'1rem',direction:'inherit'}}>
                    <label>Filter by order date: </label>
        <select value={selectedFilter} onChange={(e) => {
            setSelectedFilter(e.target.value)
        }}>
          <option value="All">All</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 15 days">Last 15 days</option>
          <option value="1 week">1 week</option>
        </select>
       
        <label>Search: </label>
        <input
          type="text"
          value={searchQuery}
          className='input'
          style={{width:'25%'}}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
    
      </div>
      <div className="table-box1" style={{height:'30rem'}}>
                    <table>
                        <thead>
                            <tr>
                            <th onClick={() => handleSort('subid')}>Subscription ID <div className="header">{sortKey=='subid'?render3():null}</div></th>
                            <th onClick={() => handleSort('useremail')}> User Email<div className="header">{sortKey=='useremail'?render3():null}</div></th>
                            <th onClick={() => handleSort('usergroup')}>User Group<div className="header">{sortKey=='usergroup'?render3():null}</div></th>
                            <th onClick={() => handleSort('packagetitle')}>Package Name<div className="header">{sortKey=='packagetitle'?render3():null}</div></th>
                            <th onClick={() => handleSort('pkg_purchasedate')}>Package Purchase Date<div className="header">{sortKey=='pkg_purchasedate'?render3():null}</div></th>
                            <th onClick={() => handleSort('trackname')}>Track Name<div className="header">{sortKey=='trackname'?render3():null}</div></th>

                            <th onClick={() => handleSort('enddate')}>Track End Date<div className="header">{sortKey=='enddate'?render3():null}</div></th>

                            <th onClick={() => handleSort('status')}>Status<div className="header">{sortKey=='status'?render3():null}</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) =>
                                <tr>
                                    <td>{item.subid}</td>
                                    <td>{item.useremail}</td>
                                    <td>{item.usergroup}</td>
                                    <td>{item.packagetitle}</td>
                                    <td>{moment(item.pkg_purchasedate).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(item.pkg_purchasedate).format("DD-MM-YYYY")}</td>
                                    <td>{item.trackname}</td>
                                    <td>{moment(item.enddate).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(item.enddate).format("DD-MM-YYYY")}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
                :
                <>
                <PulseLoader
                 color="#ff9800"
                 loading={isLoading}
                 cssOverride={override2}
                 size={20}
                 className='pulse-loader'
                 aria-label="Loading Spinner"
                 data-testid="loader"
                 speedMultiplier={0.5}
                />
                </>
            }
        </section>
    );
}

export default AdminSubscriptions;