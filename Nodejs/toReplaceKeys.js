function toReplaceKeys(questions, exercise) {
  // console.log(questions[0].key);
  let data = [];
  for (var i = 0; i < questions.length; i++) {
    let x = {
      key: exercise + "" + questions[i].key,
      label: questions[i].label,
      type: questions[i].type,
      options: questions[i].options,
    }
    data.push(x);
  }
  // console.log('data', data);
  return data;
};

function toReplaceAnsKeys(answers, exercise) {
  let data = [];
  for (var i = 0; i < answers.length; i++) {
    let x = {
      key: exercise + "" + answers[i].key,
      answer: answers[i].answer,
    }
    data.push(x);
  }
  // console.log('data', data);
  return data;
}

module.exports = {
  toReplaceKeys: toReplaceKeys,
  toReplaceAnsKeys: toReplaceAnsKeys
}