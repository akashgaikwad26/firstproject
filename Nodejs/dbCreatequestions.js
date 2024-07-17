const axios = require('axios');
const { getCode } = require('./dbCode');
const { getQuestions } = require('./dbQuestions');
const dbErrorHandler = require('./dbErrorHandler');
const {Pool} = require('pg')
const dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);

async function fetchData(question) {
    const url = "https://api.together.xyz/v1/chat/completions";
  
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer e305dbe08c7507078496ee698ffc9441f81fbc658146a5a165a213233d893806',
  };

  const data = {
    // model: "meta-llama/Llama-3-8b-chat-hf",
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    stop: ['</s>'],
    frequency_penalty: 0,
    presence_penalty: 0,
    min_p: 0,
    messages: [
      {
        role: 'user',
        content:question
        ,
      },
    ],
  };

  try {
    const result = await axios.post(url, data, { headers });
    console.log((result.data.choices[0].message.content));
    return result.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

async function getdata(exid){
    let code=await getCode(exid);
     let question=`can you generate json from this ${code} with at least 5 multiple choice Questions with exact json like  [
      {
    
        key: 'PYBL21',
        label: 'What is the size of the newlist?',
        type: 'number',
        options: null,
        answer: '4'
      },
      {
        key: 'PYBL22',
        label: 'newlist[2] points to which value in the list?',
        type: 'number',
        options: null,
        answer: '3'
      },
      {
        key: 'PYBL23',
        label: 'what is the type of variable?',
        type: 'radio',
        options: 'int,float,string',
        answer: '3'
      }
    ] please don't additional information in json and  type should be number,radio,checkbox and text if answer is multiple then type should be checkbox  and json must be closed in  three ''' `
    let generatedQuestions=await fetchData(question)
    try{
    console.log("generate",generatedQuestions)
    const match = generatedQuestions.match(/\[[^\]]*\]/);
    // console.log("match",match[0])
if (match ) {
    const json_string = match[0];

    const questions = JSON.parse(json_string);
    if(questions){
      let answers1=questions.map((item)=>{return {key:item.key,answer:item.answer}});
      return {questions:questions,answers:answers1};

    }
    return ;
    
 
  
} else {
    return 'No Question available.'   
}
    }
    catch(e){
      console.log("error while generateing a questions")
    } 
}

async function getExercises(exid){
  try{
    let query=`select * from pravinyam.cexercises where exid='${exid}'`
    console.log("query",query)
    let result=await pool.query(query);

    return result.rows[0];
  }
  catch(e){
    let result=dbErrorHandler.ErrorHandler(e.code)
    return result;
  }
}


async function generateExercises(exid,questions_json){
  let code=await getCode(exid);
  let exercise_Details=await getExercises(exid)
  let language=null;
  
  // console.log("code is",code)
  // let questions_json1=await getQuestions(exid)
  let question='';
  if(exercise_Details.language=='Mathematics Skills' && (exercise_Details.qlocation==null  || exercise_Details.qlocation =='null')) 
    {
    language='Mathematics Skills'
     question=`Generate a similar statement to the following, and create five related questions in JSON format. The original statement is:

      "${code.message}"

The new statement should maintain a similar structure and complexity but use different colors and quantities. The JSON format questions should test various aspects of the scenario, such as counting, ratio calculation, and hypothetical changes.
Output json should be like {
    "code": "In a jar, there are 6 red marbles and 9 yellow marbles. What is the ratio of red marbles to yellow marbles?",
    "json": [
        {
            "key": "Q1",
            "label": "How many red marbles are there in the jar?",
            "type": "number",
            "options": null,
            "answer": "6"
        },
        {
            "key": "Q2",
            "label": "How many yellow marbles are there in the jar?",
            "type": "number",
            "options": null,
            "answer": "9"
        },
        {
            "key": "Q3",
            "label": "What is the total number of marbles in the jar?",
            "type": "number",
            "options": null,
            "answer": "15"
        },
        {
            "key": "Q4",
            "label": "What is the ratio of red marbles to yellow marbles (Answer should be in the form of a ratio i.e., 2:3, 1:3)?",
            "type": "text",
            "options": null,
            "answer": "2:3"
        },
        {
            "key": "Q5",
            "label": "If 3 more red marbles are added to the jar, what will be the new ratio of red marbles to yellow marbles?",
            "type": "text",
            "options": null,
            "answer": "9:9"
        }
    ]
}
`
 
    }

    else{
   
      question=`can you give similar type code like ${code} and also i want question json like   [
        {
      
          key: 'PYBL21',
          label: 'What is the size of the newlist?',
          type: 'number',
          options: null,
          answer: '4'
        },
        {
          key: 'PYBL22',
          label: 'newlist[2] points to which value in the list?',
          type: 'number',
          options: null,
          answer: '3'
        },
        {
          key: 'PYBL23',
          label: 'what is the type of variable?',
          type: 'radio',
          options: 'int,float,string',
          answer: '3'
        }
      ] with 5 questions  for each code and please add c character start of  the code and json in start of the json`;
    }

    // console.log("quersiont",question)
  let data=await fetchData(question)
  // console.log("generated Exercise is",JSON.parse(data));

  return {data:data,exercise_Details:exercise_Details,language:language};
}

// generateExercises('CDCN3').then((data)=>console.log("Generated Exerices is",data))

// getdata('CDCN3').then((res)=>console.log("res",res))

// fetchData()
module.exports={
  getdata:getdata,
  generateExercises:generateExercises,
  fetchData:fetchData
}
