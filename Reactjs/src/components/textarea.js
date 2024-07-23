import { Button } from '@mui/material';
import { useState } from "react";
import './textarea.css'
const esprima = require('esprima'); // import the Esprima library
const acorn = require('acorn');







function generateQuestionsAndAnswers(program) {

  const ast = esprima.parseScript(program);

  const questions = [];
  const answers = [];
const optionsArray=[]
const types=[]

  ast.body.forEach(node => {
    if (node.type === 'FunctionDeclaration') {
      const functionName = node.id.name;
      const question = `What is the ${functionName} function in JavaScript?`;
      const answer = `The ${functionName} `;
   
      questions.push(question);
      answers.push(answer);
      optionsArray.push(0)
      types.push('number')
    }
  });

  
  ast.body.forEach(node => {
    if (node.type === 'ForStatement' || node.type === 'WhileStatement') {
      const loopType = node.type === 'ForStatement' ? 'for' : 'while';
      const question = `What is a ${loopType} loop in JavaScript?`;
      const answer = `A ${loopType} `; 

      questions.push(question);
      answers.push(answer);
      optionsArray.push(0)
      types.push('number')

      const question1=`How many time a ${loopType} loop iterate?`;
      const answer1=0;
      questions.push(question1);
      answers.push(answer1);
      optionsArray.push(0)
      types.push('number')
      const question2=`What is the Output of this program?`;
      const answer2=0;
      questions.push(question2);
      answers.push(answer2);
      optionsArray.push(0)
      types.push('number')


    }
  });

  
  return { 'questions':questions,
  'answers':answers,
  'options':optionsArray,
  'type':types };
}
function mapi(updated) {
  let inputs=[]
  inputs=updated.split("\n");
  let obj = {}
  let ans=[]
  let question3=[]
  let type=[];
  let y=0;
  for (let k = 0; k < inputs.length - 1; k++) {
      let arr = []
      arr = inputs[k].split("=");
      for (let j = 0; j < arr.length - 1; j++) {
          obj[arr[j]] = arr[j + 1].split(",");
      }
  }
  let keys=Object.keys(obj);
  let values=Object.values(obj)
  for(let j=0;j<keys.length-1;j++){
     
      question3[y]=` what will be the final value of  ${keys[j]} ?`;
      ans[y]=obj[keys[j]][values[j].length-1];
      type[y]='radio'
    y++;
      question3[y]=`What is highest value of ${keys[j+1]}`;
      const max = Math.max(...values[j+1]);
      ans[y]=max
      type[y]='number'
    y++;
      question3[y]=`What is the Lowest value of ${keys[j+1]}`;
      const min=Math.min(...values[j+1]); 
      ans[y]=min;
      type[y]='number'
    y++;
      question3[y]=`What is the range of ${keys[j]}`;
      ans[y]=(Math.min(...values[j]))+'-'+Math.max(...values[j]);
      type[y]='number'
    y++;
      question3[y]=`What is the type of the ${keys[j]}`;
      ans[y]='Float'
      type[y]='text'
    y++;
      
      
    for(let i=0;i<keys.length;i++){
         question3[y]=`When ${keys[j]}=${obj[keys[j]][i]} and iteration begins,what will be the value of ${keys[j+1]} ?`;
         ans[y]=obj[keys[j+1]][i];
         type[y]='number'
         y++;
        
         if(j<keys.length-2){
                  question3[y]=`When ${keys[j]}=${obj[keys[j]][i]} and ${keys[j+1]}=${obj[keys[j+1]][i]} Then what  is the value of ${keys[j+2]} ?`;
                  ans[y]=obj[keys[j+2]][i];
                  type[y]='radio'
                  y++;
                  question3[y]=`When ${keys[j]}=${obj[keys[j]][i]} and ${keys[j+1]}=${obj[keys[j+1]][i]} Then what  is the value of ${keys[keys.length-1]} ?`;
                  ans[y]=obj[keys[j+2]][keys.length-2];
                  type[y]='radio'
                  y++;
                  
        }
        else if(keys.length>4){
               question3[y]=`When ${keys[0]}=${obj[keys[0]][i]} and ${keys[1]}=${obj[keys[1]][i]} and ${keys[1]}=${obj[keys[2]][i]} then what is the value of ${keys[keys.length-1]} ?`
               ans[y]=0;
               type[y]='radio'
        }


    }

     question3[y]="What is the output of this program ?"
     ans[y]=obj[keys[keys.length-1]][values[keys.length-1].length-1]
      type[y]='radio'
  }

  const optionsArray = [];

for (let i = 0; i < ans.length; i++) {
  const optionSet = [];
  const correctOptionIndex = Math.floor(Math.random() * 4);

  for (let j = 0; j < 4; j++) {
    if (j === correctOptionIndex) {
      optionSet.push(ans[i]);
    } else {
      let randomOption;
      do {
        randomOption = Math.floor(Math.random() * 10);
      } while (optionSet.includes(randomOption) || randomOption === ans[i]);
      optionSet.push(" "+randomOption+" ");
    }
  }
  optionsArray.push(optionSet);
}
console.log("optionsArray is",optionsArray);
// question3[y]=`When  ${keys[j]}=${obj[0][0]},${key}`
  return {
    'questions':question3,
    'answers':ans,
    'options':optionsArray,
    'type':type
  };
}

function Example1() {
  const [message, setMessage] = useState('');

  const [questionarr,setQuestion]=useState({});


  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const key=index;
    const label = questionarr.questions[index];

    
    const answer = questionarr.type[index]=='radio'?questionarr.options[index].indexOf(questionarr.answers[index]): 
    questionarr.answers[index]

    const option= questionarr.type[index]=='number'?'null':
          questionarr.options[index];
    const type=questionarr.type[index]
    
    if (isChecked) {
      setSelected([...selected, { key,label, answer,option,type }]);
    } else {
      const filtered = selected.filter(item => item.label !== label);
      setSelected(filtered);
    }
  };

  const handleSaveClick = () => {
    const json = JSON.stringify(selected);
    console.log(json);
  };

  // const [answer,setAnswer]=useState([]);
  // const [Filterd,setFiltered]=useState([]);
  
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = async () => {

    
   setQuestion(mapi(message))
  // setQuestion(generateQuestionsAndAnswers(message))
   
  // setFiltered(finalarr['answers'])
  };


//   const When=()=>{
//     let obj={Question:arr,
//       answer:answer1}
//       function isEven(value) {
//            if(value.startsWith('When',0)){
//             return value;
//            }
//       }
//  var filtered = arr.filter(isEven);
//     setFiltered(filtered)
//   }

//  const What=()=>{
//   function isWhat(value){
//  if(value.startsWith('What')){
//   return value;
//  }}
//  var filtered=arr.filter(isWhat)
// setFiltered(filtered)
//   }

//   const IF=()=>{
//     function isIF(value){
//       if(value.startsWith('if')){
//         return value;
//       }
//     }
//     var filtered=arr.filter(isIF)
//     setFiltered(filtered)
//    }


// function convertToObj(a, b){
//       if(a.length != b.length || a.length == 0 || b.length == 0){
//        return null;
//       }
//       let obj = {};
       
//     // Using the foreach method
//       a.forEach((k, i) => {obj[k] = b[i]})
//       return obj;
//     }
// let obj=convertToObj(arr,answer1);
// console.log(obj)



 


  return (
    <div className="Main-class">
      <div className="textareas">
      <textarea
      placeholder="please enter the code here"
      className="placeholder-large"
        type="text"
        id="message"
        name="message"
        cols='55'
        rows='15'
        onChange={handleChange}
        value={message}
      />
      </div>
      <div className="buttons">

      <Button sx={{
            position: 'relative',
            //left: '55em',
            //margin: '15px 503px',
            bottom: '1rem',
            boxShadow: 8, 
            marginTop: '30px',
            backgroundColor: '#1c84c3',
            color: 'white',
            "&:hover": {
              backgroundColor: '#fff',
              color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            },
        }} onClick={handleClick}>Submit</Button>

        <Button sx={{
            position: 'relative',
            //left: '55em',
            //margin: '15px 503px',
            bottom: '1rem',
            boxShadow: 8, 
            marginTop: '30px',
            marginLeft: '25px',
            backgroundColor: '#1c84c3',
            color: 'white',
            "&:hover": {
              backgroundColor: '#fff',
              color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            },
        }} onClick={handleSaveClick}>Save Selected</Button>

      {/* <button onClick={handleClick}>submit</button> */}
      {/* <button onClick={handleSaveClick}>Save selected</button> */}
      {/* <button onClick={When}>When</button>
      <button onClick={What}>What</button>
      <button onClick={IF}>If</button> */}
      </div>
      <div className="headers">
      {questionarr!=undefined ? (
  <table>
    <thead>
      <tr>
        <th>check</th>
        <th>key</th>
        <th>label</th>
        <th>Type</th>
        <th>Options</th>
        <th>Answers</th>
      </tr>
    </thead>
    <tbody>
      {questionarr.questions!=undefined && questionarr.options!=undefined && questionarr.questions.map((item, i) => (
        <tr key={i}>
          <td><td><input type="checkbox" onChange={(event) => handleCheckboxChange(event, i)} /></td></td>
          <td>{i + 1}</td>
          <td>{item}</td>
          <td>{questionarr.type[i]}</td>

          <td>{
          questionarr.type[i]=='number'?'null':
          questionarr.options[i]}</td>

          <td>{
          questionarr.type[i]=='radio'?questionarr.options[i].indexOf(questionarr.answers[i]):
          
          questionarr.answers[i]}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No questions found.</p>
)}
  </div>
 


 </div>
  );
  }
export default Example1;

