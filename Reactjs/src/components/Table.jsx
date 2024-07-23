import React, { useMemo } from "react";
import Checkbox from "./Checkbox";
import { useState } from "react";
import { useEffect,useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import {FaArrowUp,FaArrowDown} from 'react-icons/fa'
import "../../src/assets/styles/_Scss/_table.scss";
import { useScrollTrigger } from "@mui/material";
export default function Table({ rows, headers, setSelected, isLoading,data,isCheckBox }) {
 
  const [isCheckAll, setIsCheckAll] = useState(false);
  // const [data, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newdata1, setnewData1] = useState([]);
  const [isShowCheckBox,setIsShowCheckBox]=useState(true)
  // setnewData1(rows)
  const rerender=useRef(true)
  // console.log(rows)
  if(rerender.current && rows.length>0){
    // console.log('use ref #######',rerender.current)
    // setnewData1(rows)
    rerender.current=false
  }

 const [sorted,setSorted]=useState({sorted:'id',reversed:true})

  // console.log('data ########',headers)
  const override = {
    display: "inline",
    alignItems: "end",
    justifyContent: "center",
    marginTop: "5rem",

  };
  
function handleSelectAll (e)  {
    setIsCheckAll(!isCheckAll);

    setSelected(
      rows.map((li) => {
        if (li !== undefined) {
          // console.log("li",li)
          return li;
        }
      })
    );
    if (isCheckAll) {
      setSelected([]);
    }
    // setSelected(data);
    console.log("data", data);
  };
  const isEqual = (obj1, obj2) => {
    // Implement your custom logic for object equality comparison
    return obj1.id === obj2.id && obj1.packageid === obj2.packageid && obj1.startDate === obj2.startDate;
  };

  const handlecheckbox = (e, items) => {
   

    const { id, checked } = e.target;
console.log("item",checked,"data.includes(item)",data.includes(items))
    if (checked) {
      setSelected([...data, items]);
    }
    else{
      setSelected(data.filter((e) =>  e.id !== items.id));
    }

  };


 useEffect(()=>{
  setnewData1(rows)
  if(isCheckBox!==undefined)
{
  setIsShowCheckBox(isCheckBox)
} 
},[rerender.current,rows,isLoading])

const sortData = (column) => {
  setSorted({ sorted: column, reversed: !sorted.reversed });
  const newData = [...rows];
  newData.sort((a, b) => {
    const lastA = a[column];
    const lastB = b[column];

    if (sorted.reversed) {
      return lastA.localeCompare(lastB);
    }
    return lastB.localeCompare(lastA);

    // console.log(emailA)
    // console.log(emailB)
  });
  // setUserResponse(activeusers);
  // console.log(newData,rows)
  // rows=newData
  setnewData1(newData)

};
const renderArrow = () => {
  console.log("sorted.reversed ", sorted.reversed)
  if (sorted.reversed) {
    return <FaArrowDown />;
  } else {
    return <FaArrowUp />;
  }
};


  return (
    <div className="table-box1">
      {isLoading && (
        <PulseLoader
          color="#4199ce"
          loading={isLoading}
          cssOverride={override}
          size={5}
          className="pulse-loader"
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
      )}
      {/* {tabel} */}
      <table>
    {/* </thead> */}

    {headers.map((item, index) => (
      <thead>
        {/* <tr> */}

        {index == 0 && (
          <tr>
            <th>#</th>
            {isShowCheckBox &&<th>
              {" "}
              <Checkbox
                type="checkbox"
                name="selectAll"
                id="selectAll"
                handleClick={handleSelectAll}
                isChecked={isCheckAll}
                //  disabled1={handeledisable(item)}
              />
            </th>}
           
            {headers.map((name) => (
              <th onClick={()=>{sortData(name.field)}}>{name.headerName} {sorted.sorted===name.field&& renderArrow()}</th>
            ))}
       
          </tr>
        )}
      </thead>
    ))}

    <tbody>
      {
       newdata1.map((item, index) => (
        <tr>
          <td>{index + 1}</td>
          {isShowCheckBox && <td>
            <Checkbox
              type="checkbox"
              name={item.id}
              index={index}
              id={item.id}
              style={{ width: "1rem", height: "1rem" }}
              handleClick={(e) => handlecheckbox(e, item)}
              // isChecked={()=>{checkBox1(item.id)}}
              isChecked={data.some(obj => isEqual(obj, item))}

              //   disabled1={handeledisable(item, index)}
            />
            {/* {console.log('is checked  ######',data.includes(item))} */}
          </td>}
          {/* {console.log('rows ####',item[headers[index%headers.length].field],headers[index%headers.length].field,[label[0]])} */}
          {headers.map((items) => (
            
            <td>{item[items.field]}</td>
          ))}
        </tr>
      ))
      // :
      // rows.map((item, index) => (
      //   <tr>
      //     <td>{index + 1}</td>
      //     <td>
      //       <Checkbox
      //         type="checkbox"
      //         name={item.id}
      //         index={index}
      //         id={item.id}
      //         style={{ width: "1rem", height: "1rem" }}
      //         handleClick={(e) => handlecheckbox(e, item)}
      //         // isChecked={()=>{checkBox1(item.id)}}
      //         isChecked={data?.includes(item)}

      //         //   disabled1={handeledisable(item, index)}
      //       />
      //       {/* {console.log('is checked  ######',data.includes(item))} */}
      //     </td>
      //     {/* {console.log('rows ####',item[headers[index%headers.length].field],headers[index%headers.length].field,[label[0]])} */}
      //     {headers.map((items) => (
      //       <td>{item[items.field]}</td>
      //     ))}
      //   </tr>
      // ))
      }
    </tbody>
  </table>
    </div>
  );
}
