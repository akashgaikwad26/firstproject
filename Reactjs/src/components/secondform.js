import { useState, useEffect } from "react"
import Multiselect from 'multiselect-react-dropdown'
import './second.css';
import * as XLSX from 'xlsx';
// import Checkbox from "./Checkbox";
import Checkbox from "./Checkbox";
import ApiConfig from "../ApiConfig";
import axios from "axios";
// import CreateData from "./Excelfile/Exceldata";
// import readExcel from "./Excelfile/Exceldata"
// import Select from 'react-select';

function Example() {
  const [evarray, setEvarray] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleRemove1 = () => {
    let array4 = [];
    console.log(isCheck);
    console.log(finalarr)
    for (let i = 0; i < isCheck.length; i++) {
      let index = finalarr.indexOf(isCheck[i]);
      if (index > -1) {
        array4 = (finalarr.filter((_, key) => key !== index));
        setFinalarr(array4)
      }
      console.log("final", finalarr)
    }



  }




  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsArrayBuffer(file)

      filereader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data);
      };
      filereader.onerror = (error) => {
        reject(error)
      };
    });
    promise.then((d) => {
      let array = []
      for (let i = 0; i < d.length; i++) {
        let array2 = Object.values(d[i])
        array.push(array2[0])
      }
      setNew(array)
    }
    )
  }







  const handleEvaluationremove = (e) => {
    const index = evarray.indexOf(e);
    if (index > -1) {
      const newarray = evarray.filter((_, i) => i !== index);
      setEvarray(newarray);
      // console.log(newarray)
    }
  }
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(finalarr.map((li) => li));
    if (isCheckAll) {
      setIsCheck([]);
    }

  };
  // console.log(isCheck)
  const handlecheckbox = (e, item) => {

    const { id, checked } = e.target;

    if (checked) {
      setIsCheck([...isCheck, item])
    }
    else {
      setIsCheck(isCheck.filter((e) => e !== item))
    }
  }

  const [user, setUser] = useState([]);
  const [user1, setUser1] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [exercise, setExecise] = useState(1)
  const [maxlevel, setMaxLevel] = useState(7)
  const [minlevel, setMinLevel] = useState(1)
  const [new1, setNew] = useState();
  const [finalarr, setFinalarr] = useState();
  const [ename, setEname] = useState('')
  // const [isChecked, setisChecked] = useState([])
  const [language, setLanguage] = useState([])
  const [selected, setSelected] = useState('C')
  const [module, setmodule] = useState('reader')
  const [modulearr, setModuleArr] = useState([])
  const [label,setLabel]=useState('')
  // console.log(modulearr)
  let minarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  let maxarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  let exe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  let Api = new ApiConfig()
  const fetchData = async () => {
    return axios.get(Api.addApiKey(`${Api.BaseURI}/getallcategory?language=${selected}`)).then((res) => setUser(res.data));
  }


  const handleSelect = async (e) => {
    setCategory(e)
    // console.log("first", selected)
    return axios.get(Api.addApiKey(`${Api.BaseURI}/getallSubcategory?category=${e}&track=${selected}`))
      .then((res) => handleSubselect(res.data));


  }

  // console.log(isChecked)
  const handleTrack = async () => {
    return axios.get(Api.addApiKey(`${Api.BaseURI}/getalltrack`))
      .then((res) => handleLanguage(res.data.result));
    
  }
  const handleLanguage = (arr) => {
    const result = arr.map((item) => item.track);
    setLanguage(result)
  }
  const handleSelected2 = async (e) => {
    setSelected(e)
    // console.log("second", e)
    // console.log(category)

     await axios.get(Api.addApiKey(`${Api.BaseURI}/getallSubcategory?category=${category}&track=${e}`)).then((res)=>{handleSubselect(res.data)})
    // return await fetch(Api.addApiKey(`${Api.BaseURI}/getallSubcategory?category=${category}&track=${e}`))
    //   .then((response) => response.json())
    //   .then((data) => handleSubselect(data));
  }
  const handlesubmit = async () => {
    // console.log(exercise);

     await axios(Api.addApiKey(`${Api.BaseURI}/getRandomExercisesSubcategoryadmin?minlevel=${minlevel}&maxlevel=${maxlevel}&subcategory=${subcategory}&total=${exercise}&language=${selected}&module=${module}`)).then((res)=>{
      setFinalarr(res.data.result)
    }).then(()=>setIsCheck([]))

    // return await fetch(Api.addApiKey(`${Api.BaseURI}getRandomExercisesSubcategory?minlevel=${minlevel}&maxlevel=${maxlevel}&subcategory=${subcategory}&total=${exercise}&language=${selected}&module=${module}`))
    //   .then((response) => response.json())
    //   .then((data) => setFinalarr(data.result)).then(() => setIsCheck([]));

  }

  const handleSubselect = (e) => {
    const arr = e.map((item) => item.subcategoryid)

    // setUser1(e)
    setSubcategory(arr)
    setUser1(e)


  }

  const HandleRemove = (e) => {
    const index = finalarr.indexOf(e);
    if (index > -1) {
      const newarray = finalarr.filter((_, i) => i !== index);
      setFinalarr(newarray);
    }
  }
  const handleAdd = () => {
     
    axios.get(Api.addApiKey(`${Api.BaseURI}/getNewExercises?exid=${new1}`)).then((res)=>{
      setEvarray(evarray.concat(res.data.result))
    })

    // fetch(Api.addApiKey(`${Api.BaseURI}getNewExercises?exid=${new1}`))
    //   .then((response) => response.json())
    //   .then((data) => { setEvarray(evarray.concat(data.result)) })
  }

  const handleEvarray = () => {
    setEvarray(evarray.concat(isCheck))
  }
  // console.log("checked",isCheck)
  // console.log("Evaluation",evarray)
  // // console.log("finalarray",finalarr)
  const handleEvalution = (ename, evarray) => {
    let exid = evarray.map((item) => item.exid)

    let duration = evarray.map((item) => item.level).reduce((item, a) => item + a, 0);

    let mod = evarray.map((item1) => item1.module)
    setModuleArr(mod)
    let avglevel = duration / (exid.length)
    console.log(avglevel)
    console.log(duration)


     return axios.get(Api.addApiKey(`${Api.BaseURI}/createEvalution?modulename=${ename}&total=${exid.length}&level=${avglevel}&exidarr=${exid}&track=${selected}&module=${mod}&duration=${duration}&label=${label}`)).then((res)=>{alert(res.data.message)})


    // return fetch(Api.addApiKey(`${Api.BaseURI}createEvalution?modulename=${ename}&total=${exid.length}&level=${avglevel}&exidarr=${exid}&track=${selected}&module=${mod}&duration=${duration}`)).then((res) => res.json()).then((data) => { alert(data.message) })


  }

  useEffect(() => {
    fetchData(selected);
    handleTrack();

  }, [selected])


  return (

    <div className="center">
      <div className="Evaluation">
        {/* <label for="level">Evalution name: </label> */}
        <input type="text" onChange={(e) => setEname(e.target.value)} class="evalip" name="evalname" placeholder="Evalution name" required="" autofocus="" />
      </div>

 <br />

      <div className="left" >
          <div className="minlevel">
            <label for="level">Minimum Level </label>
            <select name="level" id="level" onChange={(e) => setMinLevel(e.target.value)}>
              {minarr.map((item, key) => (
                <option value={item}>{item}</option>))}
            </select>
          </div>
          <div className="maxlevel">
            <label for="level">Maximum Level </label>
            <select name="level" id="level" onChange={(e) => setMaxLevel(e.target.value)}>
              {maxarr.map((item, key) => (
                <option value={item}>{item}</option>))}
            </select>
          </div>
        </div>

  <br/>

     <div className="rows1" style={{}}>
        <div className="minlevel1"  >
          <label for='module'>Select Module </label>
          <select onChange={(e) => { setmodule(e.target.value) }}>
            <option value="reader">reader</option>
            <option value="debug">debug</option>
            <option value="solver">solver</option>
          </select>
        </div>
        <div className="maxlevel1">
          <label for='language'>Language </label>
          <select onChange={(e) => handleSelected2(e.target.value)}>
            {language.map((item) => <option>{item}</option>)}
          </select>
        </div>
     </div>

  {/* <br/> */}

    <div className="rows2"  style={{}}>
          <div className="category" style={{paddingTop:'1.5rem'}}>
            <label for='category' style={{alignSelf: 'center'}}>Select Category </label>
            <Multiselect isObject={false} value={category} options={user.map((item) => item.category)} showCheckbox
              onSelect={handleSelect}
              onRemove={handleSelect} />

            <label for='subcategory' style={{alignSelf: 'center', marginLeft: '35px'}}>Select Subcategory</label>
            <Multiselect isObject={false} options={user1.map((item) => item.subcategoryid)} selectedValues={user1.map((item) => item.subcategoryid)} showCheckbox
              onSelect={(e) => { setSubcategory(e) }}
              onRemove={(e) => { setSubcategory(e) }}/>

          </div>
    </div>

    <div className="rows3"  style={{}}>
      <div className="minlevel1" style={{}}>
        <label for="exercise">No of Exercises  </label>
        <select name="exercise" id="exercise" onChange={(e) => setExecise(e.target.value)}>
          {exe.map((item, key) => (<option value={item}>{item}</option>))}
        </select>
      </div>
      
      <div className="maxlevel1" style={{}}>
        <input type="file" className="ipread" onChange={(e) => {
          const file = e.target.files[0]
          readExcel(file)
        }} />
      </div>

      <div className="minlevel">
        <button style={{ color: 'black', padding: '10px', bordeRadius: '5px', marginRight: '10px', marginTop: '25px',
        backgroundColor: '#ff9800', borderColor: 'white' }} 
        onClick={() => handleAdd()}>Custom add</button>
        <input type="text" className = 'customtext' onChange={(e) => setNew(e.target.value)} />
      </div>
      
      <div className="buttons" style={{marginLeft:'40%'}}>
          <button style={{background:'#1c84c3',color:'white',marginTop: '20px', borderRadius:'5px',padding: '10px', width:'18%',fontStyle:'bold'}} 
          onClick={handlesubmit}>Generate</button>    
      </div>

    </div>

    <br/>

    <div>
      {finalarr === undefined ? "" : <div className="scrollable-div"> 
      {/* <button onClick={handleRemove1}>Remove All</button> */}
      <table>
        <tbody>
          <th> <Checkbox
            type="checkbox"
            name="selectAll"
            id="selectAll"
            handleClick={handleSelectAll}
            isChecked={isCheckAll}
          /></th>
          <th>exid</th>
          <th>description</th>
          <th>category</th>
          <th>subcategory</th>
          <th>level</th>
          <th>operation</th>
          {finalarr.map((item) => <tr>
            <td> <Checkbox
              type="checkbox"
              name={item.exid}
              id={item.exid}
              handleClick={(e) => handlecheckbox(e, item)}
              isChecked={isCheck.includes(item)}

            /></td>
            { }
            <td>{item.exid}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.subcategoryid}</td>
            <td>{item.level}</td>
            <td>
              <button style={{ color: 'black', backgroundColor: '#f42a18', borderColor: 'white' }} onClick={() => HandleRemove(item)}>Remove</button></td>
          </tr>
          )}
        </tbody> </table></div>}
    </div>
    
    <div style={{
    marginTop:'0.3rem',
    marginBottom:'2rem'
    }}>
    <button style={{background:'#1c84c3',color:'white',borderRadius:'5px',padding: '10px', width:'18%',fontStyle:'bold'}} 
    onClick={() => { handleEvarray() }} >Add to Evalution</button>
    </div>
    
    <div style={{
      marginTop:'0.3rem'
    }} >
      {evarray === undefined ? "" : <div  >  <table>
        <tbody>
          <th>exid</th>
          <th>description</th>
          <th>category</th>
          <th>subcategory</th>
          <th>level</th>
          <th>operation</th>
          {evarray.map((item) => <tr>

            <td>{item.exid}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.subcategoryid}</td>
            <td>{item.level}</td>
            <td><button style={{ color: 'black', backgroundColor: '#f42a18', borderColor: 'white' }} onClick={() => handleEvaluationremove(item)}>Remove</button></td>
          </tr>
          )}
        </tbody> </table></div>}
      <button style={{background:'#1c84c3',color:'white',borderRadius:'5px',padding: '10px', width:'18%', marginTop: '30px',
                      fontStyle:'bold'}}  
      onClick={() => { handleEvalution(ename, evarray) }}>Create Evaluation</button>
    </div>
    
    </div>
  )
}
export default Example;