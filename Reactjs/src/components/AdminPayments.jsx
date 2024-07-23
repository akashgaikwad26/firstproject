// import "./AdminLandingPage.scss";
import React, { useEffect, useState } from 'react'
import ApiConfig from '../ApiConfig'
import axios from 'axios';
import { Link } from "react-router-dom";
import * as moment from 'moment';
import {FaArrowUp,FaArrowDown} from 'react-icons/fa'
// import "../../assets/styles/abstracts/_index.scss"
// import "../../assets/styles/_Scss/_index.scss"
import "./Payments.scss";
import "./AdminPayments.scss"
import Modal from 'react-modal';
import { PulseLoader } from 'react-spinners';
import {IoIosRefresh} from 'react-icons/io'

function AdminPayments() {

    const [change, setChange] = useState(false)
    const [data, setData] = useState([])
    const [dialogVisible, setDialogVisible] = useState(false);
    const [orderDialogData, setOrderDialogData] = useState({});
    const [originalOrderStatus, setOriginalOrderStatus] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [isLoading,setIsLoading]=useState(true)
    const [sortKey, setSortKey] = useState('userid');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
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
          return new Date(item.orderdate) >= last30Days;
        },
        'Last 15 days': (item) => {
          const last15Days = new Date();
          last15Days.setDate(last15Days.getDate() - 15);
          return new Date(item.orderdate) >= last15Days;
        },
        '1 week': (item) => {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return new Date(item.orderdate) >= oneWeekAgo;
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
      console.log("incdope",filteredData,data);
    useEffect(()=>{
        let sortedData = filteredData?.sort((a, b) => {
            if(sortKey !=undefined && a[sortKey]!=undefined && b[sortKey]!=undefined){
            if (sortOrder === 'asc' ) {
              // updatedat,updatedBy,packages,transactionamount,orderstatus,transactionstatus,transactiondate,transactionid,userid,username,orderdate,orderid
      
              if (sortKey === 'orderdate') {
                  return new Date(a[sortKey]) - new Date(b[sortKey]);
                }
              else if(sortKey==='transactiondate'){
                  return new Date(a[sortKey])- new Date(b[sortKey]);
              }
              else if(sortKey=='orderid'){
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
      
             if (sortKey === 'orderdate') {
                  return new Date(b[sortKey]) - new Date(a[sortKey]);
                }
              else if(sortKey==='transactiondate'){
                  return new Date(b[sortKey])- new Date(a[sortKey]);
              }
              else if(sortKey=='orderid'){
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

    useEffect(()=>{
         setFilteredData(data?.filter(filters[selectedFilter]));

    },[selectedFilter])

    useEffect(()=>{
        let  sortedData = data.filter((item) => {
        const itemValues = Object.values(item).map((value) =>
          String(value).toLowerCase()
        );
        return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
      });
      setFilteredData(sortedData)
    },[searchQuery])

    // let sortedData = data?.sort((a, b) => {
    //   if(sortKey !=undefined && a[sortKey]!=undefined && b[sortKey]!=undefined){
    //   if (sortOrder === 'asc' ) {
    //     // updatedat,updatedBy,packages,transactionamount,orderstatus,transactionstatus,transactiondate,transactionid,userid,username,orderdate,orderid

    //     if (sortKey === 'orderdate') {
    //         return new Date(a[sortKey]) - new Date(b[sortKey]);
    //       }
    //     else if(sortKey==='transactiondate'){
    //         return new Date(a[sortKey])- new Date(b[sortKey]);
    //     }
    //     else if(sortKey=='orderid'){
    //         return a[sortKey] - b[sortKey];
    //     }
    //     else if(sortKey=='transactionamount'){
    //         return  a[sortKey] - b[sortKey];
    //     }
    //    {
    //         return a[sortKey].localeCompare(b[sortKey]);
    //     }

    //   }
    //    else {

    //    if (sortKey === 'orderdate') {
    //         return new Date(b[sortKey]) - new Date(a[sortKey]);
    //       }
    //     else if(sortKey==='transactiondate'){
    //         return new Date(b[sortKey])- new Date(a[sortKey]);
    //     }
    //     else if(sortKey=='orderid'){
    //         return b[sortKey] - a[sortKey];
    //     }
    //     else if(sortKey=='transactionamount'){
    //         return  b[sortKey] - a[sortKey];
    //     }
    //     else{
    //         return b[sortKey].localeCompare(a[sortKey]);
    //     }
    //   }
    // }
    // });

    // sortedData =data.filter(filters[selectedFilter]);
    


    // sortedData = data.filter((item) => {
    //     const itemValues = Object.values(item).map((value) =>
    //       String(value).toLowerCase()
    //     );
    //     return itemValues.some((value) => value.includes(searchQuery.toLowerCase()));
    //   });
  
    const uri = new ApiConfig().BaseURI
    let Api = new ApiConfig()
 function getPayments()
{
    setIsLoading(true)
    axios.get(Api.addApiKey(`${Api.BaseURI}/payments`)).then(res => {

        setData(res?.data?.data);
        setFilteredData(res?.data?.data)
        setIsLoading(false)
    })
} 
    useEffect(() => {
        console.log("is loading",isLoading)
        getPayments()
        console.log(isLoading)
    }, [change])

    const openDialog = async (DialogData) => {
        let res;
        try {
            res = await axios.get(Api.addApiKey(`${Api.BaseURI}/instamojopaymentdetails?paymentId=${DialogData.transactionid}`));
            // res = await axios.get(`https://orca-app-ws4me.ondigitalocean.app/api/payments`);
        } catch (error) {
            // alert('error unable to connect');
            console.log('response not 200');
        }

        // res = {
        //     "data": {
        //         "orderid": "orderId:609", "transactionid": "MOJO3704D05A79942319",
        //         "transactiondate": "2023-07-04T05:49:27.707414Z", "orderamount": "4484.00",
        //         "username": "Ashwin S", "transactionstatus": true
        //     }
        // }

        if (!res) {
            alert("bad api response");
        } else if (res?.data?.message === 'No data found') {
            let orderDialogTemp = DialogData;
            orderDialogTemp.transactiondate = moment(res.transactiondate).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(res.transactiondate).format("DD-MM-YYYY")
            orderDialogTemp.orderamount = DialogData.payableamt;
            setOrderDialogData(orderDialogTemp);
            setOriginalOrderStatus(DialogData.orderstatus);
            setOrderStatus('Payment Failed');
            setDialogVisible(true);
        } else {
            res = res.data;
            let orderid = res.orderid?.split('orderId:')?.[1];
            res.orderid = orderid;

            res.transactiondate = moment(res.transactiondate).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(res.transactiondate).format("DD-MM-YYYY")

            setOrderDialogData(res);
            setOriginalOrderStatus(DialogData.orderstatus);
            setOrderStatus(res.transactionstatus ? 'Paid' : 'Payment Failed');
            setDialogVisible(true);
        }
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    const saveDialog = async () => {
        if (orderStatus === 'paidOrderStatus') {
            const update = await axios.patch(Api.addApiKey(`${Api.BaseURI}/payments/${orderDialogData.paymentid}?status=paid`), {});
            if (update?.data?.data?.transcationstatus !== 'successful') {
                alert('Unable to Save');
            } else {
                setChange(!change);
                setDialogVisible(false);
            }
        } else {
            setDialogVisible(false);
        }
    };
    const override2 = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10rem",
        // borderColor: "olive",
      };
    function renderTopBar() {
        return (
            <>
                <header className="pyui_payment-section-header">
                    <h2 className="pyui_payment-section-header-title">Payment Details</h2>
                    <nav className="pyui_payment-section-subscription-tab">
                        <ul className="pyui_payment-section-subscription-tab-list">
                            <li>
                                <Link
                                    className="pyui_payment-section-subscription-tab-list-item cart"
                                    to="/adminSubscriptions"
                                >
                                    Subscriptions
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
            {/* {renderTopBar()} */}

            <Modal isOpen={dialogVisible} onRequestClose={closeDialog}>

                <div className="ReactModal-Content-details">

                    <h3>Transaction Summary</h3> <br />

                    <label>
                        Order ID:  <span> {orderDialogData.orderid ?? '-'} </span>
                    </label>
                    <label>
                        Transaction ID: <span> {orderDialogData.transactionid ?? '-'}</span>
                    </label>
                    <label>
                        Transaction Date:  <span  > {orderDialogData.transactiondate ?? '-'} </span>
                    </label>
                    <label>
                        Order Amount:  <span> {orderDialogData.orderamount ?? '-'} </span>
                    </label>
                    <label>
                        User Name:  <span  >  {orderDialogData.username ?? '-'}</span>
                    </label>
                    <label>
                        Transaction Status: <span  > {orderStatus ?? '-'} </span>
                    </label>
                    <label>
                        Order Status:
                        {orderDialogData.transactionstatus ?
                            <span>
                                <select
                                    name="OrderStatus"
                                    id="orderStatus"
                                    value={orderStatus}
                                    onChange={(e) => {
                                        setOrderStatus(e.target.value);
                                    }}
                                >
                                    <option value="originalOrderStatus" selected >
                                        {originalOrderStatus}
                                    </option>
                                    <option value="paidOrderStatus" >
                                        Paid
                                    </option>
                                </select>
                            </span>
                            : <span>
                                {originalOrderStatus}
                            </span>
                        }
                    </label>

                    {orderDialogData.transactionstatus?
                        <div className="ReactModal-Content-details-footer">
                            <button className="button" onClick={closeDialog}>
                                &lt; back
                            </button>
                            <button className="button primary" onClick={saveDialog}>
                                Save
                            </button>
                        </div>
                        :
                        <div className="ReactModal-Content-details-footer">
                            <button className="button" onClick={closeDialog}>
                                &lt; back
                            </button>
                        </div>
                    }
                </div>

            </Modal>
            <button
            onClick={getPayments}
            >
                <IoIosRefresh/>
            </button>

            {
                !isLoading ?
                <div>
                     <div>
        <label>Filter by order date: </label>
        <select value={selectedFilter} onChange={(e) => {
            setSelectedFilter(e.target.value)
        }}  >
          <option value="All">All</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 15 days">Last 15 days</option>
          <option value="1 week">1 week</option>
        </select>

        <label>Search:</label>

        <input
          type="text"
          value={searchQuery}
          className='input'
          style={{width:'25%'}}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      
                  </div>
                  <div className="table-box1" style={{height:'30rem'}}>
                    <table >
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('orderid')}>Order Id <div className="header">{sortKey=='orderid'?render3():null}</div></th>
                                <th onClick={() => handleSort('orderdate')}>Order date
                                <div className="header">{sortKey=='orderdate'?render3():null}</div>
                                </th>
                                <th onClick={() => handleSort('username')} > User name
                                <div className="header">{sortKey=='username'?render3():null}</div>
                                 </th>
                                <th onClick={() => handleSort('userid')} > User id 
                                <div className="header">{sortKey=='userid'?render3():null}</div>
                                </th>
                                <th onClick={() => handleSort('transactionid')}>Transaction Id
                                <div className="header">{sortKey=='transactionid'?render3():null}</div>
                                </th>
                                <th onClick={() => handleSort('transactiondate')}>Transaction Date
                                <div className="header">{sortKey=='transactiondate'?render3():null}</div>
                                </th>
                                <th onClick={() => handleSort('transactionstatus')}>Transaction Status
                                <div className="header">{sortKey=='transactionstatus'?render3():null}</div>
                                </th>
                                <th onClick={() => handleSort('orderstatus')}>Order Status
                                <div className="header">{sortKey=='orderstatus'?render3():null}</div>
                                </th>
                                <th onClick={() => handleSort('transactionamount')}>Transaction Amount (INR)
                                <div className="header">{sortKey=='transactionamount'?render3():null}</div>
                                </th>
                                <th > Packages </th>
                                <th onClick={() => handleSort('updatedBy')}>Updated By
                                <div className="header">{sortKey=='updatedBy'?render3():null}</div>
                                </th>
                                <th  onClick={() => handleSort('updatedat')}>Updated At
                                <div className="header">{sortKey=='updatedat'?render3():null}</div>
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((item) =>
                                <tr>
                                    <td>{item.orderid}</td>
                                    <td>{moment(item.orderdate).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(item.orderdate).format("DD-MM-YYYY")}</td>
                                    <td>{item.username}</td>
                                    <td>{item.userid}</td>
                                    <td>{item.transactionid}</td>
                                    <td>{moment(item.transactiondate).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(item.transactiondate).format("DD-MM-YYYY")}</td>
                                    <td>{item.transactionstatus}</td>
                                    <td>{item.orderstatus}</td>
                                    <td>{item.transactionamount}</td>
                                    {/* {console.log("pakc")} */}
                                    <td>{
                                        item.packages?.map((pac, index, arr) => {
                                            if (index === arr.length - 1) {
                                                return pac.packagetitle;
                                            } else {
                                                return ((pac.packagetitle ?? '') + ', ');
                                            }
                                        })
                                    }</td>
                                    <td>{item.updatedBy}</td>
                                    <td>{moment(item.updatedat).format("DD-MM-YYYY") === 'Invalid date' ? '-' : moment(item.updatedat).format("DD-MM-YYYY")}</td>
                                    <td>
                                        {!(item.orderstatus === 'paid') ?
                                            <button
                                                size="small"
                                                onClick={() => {
                                                    openDialog(item);
                                                }}
                                                style={{
                                                    border: '1px solid #ccc',
                                                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                                    fontSize: '13px'
                                                }}
                                            >
                                                Check Status
                                            </button> :
                                            <b1> - </b1>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>:
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
        </section >
    );
}

export default AdminPayments;