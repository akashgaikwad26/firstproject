const {
  getUserMasterTable,
  getUserResponseTable,
  getExercisesTable,
  getUserLabelTable,
  getQuizResponse,
  getQuizModules,
} = require("./dbConstants");
const dbErrorHandler = require("./dbErrorHandler");
const { Pool } = require('pg')
const dbconfig = require('./dbconfig')
const { getCategoryDates, getDefaultStartDate } = require('./dbUserLabels')

const pool = new Pool(dbconfig)

function convertToDate(mindateString) {
  const mindate = new Date(mindateString);

  // Extracting the date part
  const year = mindate.getUTCFullYear();
  const month = (mindate.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = mindate.getUTCDate().toString().padStart(2, '0');

  // Formatting the date part as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

const dailyReport = async (userGrp, track, label, date) => {
  console.log('date', date);
  console.log('date', date && date?.length > 0);
  console.log('userGrp', userGrp);
  console.log('track', track);
  console.log('label', label);
  if (userGrp === undefined || track === undefined || date === undefined || label === undefined) {
    return {
      message: "Please provide valid information",
      status: 406,
    };
  }
  console.log("date before", date);
  // console.log("date before12345", await getDefaultStartDate(userGrp, track));
  if (date === null || date === 'null') {
    updatedDate = await getCategoryDates(userGrp, label)
    if (updatedDate?.rows?.length > 0) {
      updatedDate = updatedDate?.rows[0]?.report_from_date
    } else {
      updatedDate = null
    }
    console.log('updatedDate', updatedDate);
    if (updatedDate !== null) {
      console.log('updatedDate', JSON.parse(updatedDate));
      updatedDate = JSON.parse(updatedDate)
      if (updatedDate.hasOwnProperty(track)) {
        date = updatedDate[track]
        console.log('not default');
      } else {
        console.log('from default');
        let newDate = await getDefaultStartDate(userGrp, track)
        // console.log('new date', convertToDate(newDate[0].mindate));
        date = convertToDate(newDate[0].mindate)
      }
    } else {
      console.log('from default');
      let newDate = await getDefaultStartDate(userGrp, track)
      // console.log('new date', convertToDate(newDate[0].mindate));
      date = convertToDate(newDate[0].mindate)
    }
  }
  console.log("date after", date);
  // console.log("Daily label",label)

  // label = 'All'
  let query1 = `select um.userid,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '6 days' THEN 1 ELSE 0 END), 0) AS exercisecount_day1,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '6 days' THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day1,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '5 days' THEN 1 ELSE 0 END), 0) AS exercisecount_day2,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '5 days' THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day2,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '4 days' THEN 1 ELSE 0 END), 0) AS exercisecount_day3,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '4 days' THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day3,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '3 days' THEN 1 ELSE 0 END), 0) AS exercisecount_day4,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '3 days' THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day4,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '2 days' THEN 1 ELSE 0 END), 0) AS exercisecount_day5,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '2 days' THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day5,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '1 days' THEN 1 ELSE 0 END), 0) AS exercisecount_day6,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE - INTERVAL '1 days' THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day6,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE THEN 1 ELSE 0 END), 0) AS exercisecount_day7,
  COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) = CURRENT_DATE THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS time_day7,`;

  // if ((date !== null && date !== 'null') && date?.length > 0) {
  query1 += ` COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) >= '${date}'::DATE THEN 1 ELSE 0 END), 0) AS total_exercisecount,
    COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) >='${date}'::DATE  THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS total_time,
    COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) >='${date}'::DATE THEN 1 ELSE 0 END) / NULLIF(DATE_PART('day', MAX(ur.first_attempt) - '${date}'::DATE), 0), 0)::INTEGER AS average_exercise_per_day,
    COALESCE(sum(case when DATE(first_attempt) >= '${date}'::DATE then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)/NULLIF(DATE_PART('day',max(first_attempt)-'${date}'::DATE),0),0)::INTEGER as averge_time_per_Day,`;
  // } else {
  //   query1 += ` COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) <= CURRENT_DATE THEN 1 ELSE 0 END), 0) AS total_exercisecount,
  //   COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) <= CURRENT_DATE THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END), 0)::INTEGER AS total_time,
  //   COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) <= CURRENT_DATE THEN 1 ELSE 0 END) / NULLIF(DATE_PART('day', MAX(ur.first_attempt) - MIN(ur.first_attempt)), 0), 0)::INTEGER AS average_exercise_per_day,
  //   COALESCE(SUM(CASE WHEN DATE(ur.first_attempt) <= CURRENT_DATE THEN EXTRACT(EPOCH FROM (ur.last_attempt - ur.first_attempt))/60 ELSE 0 END) / NULLIF(DATE_PART('day', MAX(ur.first_attempt) - MIN(ur.first_attempt)), 0), 0)::INTEGER AS average_time_per_day,
  //   COALESCE(sum(case when DATE(first_attempt) <= current_date then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)/NULLIF(DATE_PART('day',max(first_attempt)-min(first_attempt)),0),0)::INTEGER as averge_time_per_Day,`;
  // }

  query1 += `
  qr.end_time AS last_quiz_date,
  ROUND((qr.score / qr.total_marks) * 100, 2) AS quiz_percentage
from ${getUserMasterTable()} um
left join ${getUserResponseTable()} ur ON um.userid = ur.userid and ur.exid in (select exid from ${getExercisesTable()} where language = '${track}')
left join ${getExercisesTable()} ce on ce.exid = ur.exid `;

  if (label != undefined && label != "All") {
    query1 += `left join ${getUserLabelTable()} ul on ul.userid=um.userid
left join ${getQuizResponse()} qr on um.userid = qr.userid and qr.end_time = (
  select MAX(end_time) from ${getQuizResponse()} e where e.userid = um.userid and e.module_name IN (SELECT module_name FROM ${getQuizModules()} WHERE track = '${track}')
)
where um.user_group = '${userGrp}' and ul.label = '${label}'
group by um.userid, qr.end_time, qr.score, qr.total_marks
order by total_exercisecount desc;`;
  } else {
    query1 += `
  left join ${getQuizResponse()} qr on um.userid = qr.userid and qr.end_time = (
    select MAX(end_time) from ${getQuizResponse()} e where e.userid = um.userid and e.module_name IN (SELECT module_name FROM pravinyam.quiz_modules WHERE track = '${track}')
  )
  where um.user_group = '${userGrp}'
  group by um.userid, qr.end_time, qr.score, qr.total_marks
  order by total_exercisecount desc;`;
  }

  // console.log("in dailyreport", query1);
  //   let query = `select ur.userid,
  // sum(case when date(first_attempt) = current_date - interval '6 days' then 1 else 0 end) as exercisecount_day1,
  // sum(case when DATE(first_attempt) = current_date - interval '6 days' then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as time_day1,
  //  sum(case when DATE(first_attempt) = current_date - interval '5 days' then 1 else 0 END) AS exercisecount_day2,
  //   sum(case when DATE(first_attempt) = current_date - interval '5 days' then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end) ::INTEGER as time_day2,
  //    sum(case when DATE(first_attempt) = current_date - interval '4 days' then 1 else 0 END) as exercisecount_day3,
  //   sum(case when DATE(first_attempt) = current_date - interval '4 days' then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as time_day3,
  //   sum(case when DATE(first_attempt) = current_date - interval '3 days' then 1 else 0 end) as exercisecount_day4,
  //     sum(case when DATE(first_attempt) = current_date - interval '3 days' then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as time_day4,
  //     sum(case when DATE(first_attempt) = current_date - interval '2 days' then 1 else 0 end) as exercisecount_day5,
  //     sum(case when DATE(first_attempt) = current_date - interval '2 days' then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as time_day5,
  //     sum(case when DATE(first_attempt) = current_date - interval '1 days' then 1 else 0 end) as exercisecount_day6,
  //     sum(case when DATE(first_attempt) = current_date - interval '1 days' then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as time_day6,
  //     sum(case when DATE(first_attempt) = current_date then 1 else 0 end) as exercisecount_day7,
  //     sum(case when DATE(first_attempt) = current_date then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as time_day7,
  //     sum(case when DATE(first_attempt) <= current_date then 1 else 0 end) as total_exercisecount,
  //     sum(case when DATE(first_attempt) <= current_date then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)::INTEGER as total_time,
  // COALESCE(sum(case when DATE(first_attempt) <= current_date then 1 else 0 end)/NULLIF(DATE_PART('day',max(first_attempt)-min(first_attempt)),0),0)::INTEGER as average_exercise_per_day,
  // COALESCE(sum(case when DATE(first_attempt) <= current_date then extract(EPOCH from (last_attempt - first_attempt))/60 else 0 end)/NULLIF(DATE_PART('day',max(first_attempt)-min(first_attempt)),0),0)::INTEGER as averge_time_per_Day,
  // qr.start_time as last_quiz_date,
  // round((qr.score / qr.total_marks) * 100,2) as quiz_percentage

  // from
  // ${getUserResponseTable()} ur
  // left join ${getUserMasterTable()} um on um.userid=ur.userid
  // left join ${getExercisesTable()} ce on ce.exid=ur.exid
  // left join ${getQuizResponse()} qr on um.userid=qr.userid  and qr.start_time=(select max(start_time) from ${getQuizResponse()} e where userid=um.userid and module_name in(select module_name from pravinyam.quiz_modules where track='${track}'))
  // where user_group='${userGrp}' and language='${track}'`
  //   if (label !== undefined && label !== 'All') {
  //     query += `and ur.userid in (select userid from ${getUserLabelTable()} where label='${label}')`
  //   }
  //   query += `group by ur.userid,qr.start_time,qr.score,qr.total_marks`
  // console.log("dailyReport q", query)
  try {
    let result = await pool.query(query1);
    // console.log("data label",result.rows)
    return result.rows;
  } catch (error) {
    console.log("error", error);
    let result = await dbErrorHandler.ErrorHandler(error.code);
    return result;
  }
};

// dailyReport('DSL', 'C', 'Intern', null).then(res => {
//   // console.log(res)
// })
module.exports = {
  dailyReport,
};
