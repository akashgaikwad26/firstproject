// This file is used to define schema names, table names, blob storage(spaces location) etc.

// Initial part of the tables are non-transactional and updated by Admin
// Queries from this table can be cached
const PRAVINYAM_SCHEMA = 'pravinyam'; // use real schema name here

const TABLE_MODULES = 'modulemaster';
const TABLE_TRACKS = 'trackmaster';
const TABLE_EXERCISES = 'cexercises';
const TABLE_QA = 'cqadata';
const TABLE_CATEGORY_MASTER = 'category';
const TABLE_MODULE_EXID='module_exid';


const TABLE_TRACK_SUMMARY = 'track_summary';
const TABLE_MODULE_SUMMARY = 'module_summary';
const TABLE_LEVEL_SUMMARY = 'level_summary';
const TABLE_CATEGORY_SUMMARY = 'category_summary';
const TABLE_CATEGORY_LOCK = 'categorylock';

// USER_TABLES are all transactional and should not be cached
const TABLE_GROUP_MASTER = 'group_master';
const TABLE_USER_MASTER = 'pravinyam_usermaster';
const TABLE_USER_HISTORY = 'userhistory';
const TABLE_USER_MAIL_HISTORY = 'user_mail_send_history';
const TABLE_USER_RESPONSE_MASTER = 'userResponse_master';
const TABLE_USER_MODULES='user_modules';
// The following tables are regenerated from time to time
// These can be semi-cached if we know the interval of update
const TABLE_USER_TRACK_PROGRESS = 'user_track_progress';
const TABLE_USER_MODULE_PROGRESS = 'user_module_progress';
const TABLE_USER_LEVEL_SUMMARY = 'user_level_progress';
const TABLE_USER_CATEGORY_SUMMARY = 'user_category_progress';
const TABLE_USER_DETAILS='user_details';
// Persistent location for Blob Storage
const SPACES_CODE_FILES = 'pravinyam-programs';

function getModulesTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_MODULES;
}

function getTracksTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_TRACKS;
}

function getExercisesTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_EXERCISES;
}

function getMduleExidTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_MODULE_EXID;
}

function getQATable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_QA;
}

function getCategoryMasterTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_CATEGORY_MASTER;
}

function getTrackSummaryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_TRACK_SUMMARY;
}

function getModuleSummaryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_MODULE_SUMMARY;
}
function getUserModulesTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_MODULES;
}

function getLevelSummaryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_LEVEL_SUMMARY;
}

function getCategorySummaryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_CATEGORY_SUMMARY;
}

function getCategoryLockTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_CATEGORY_LOCK;
}

function getGroupMasterTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_GROUP_MASTER;
}

function getUserMasterTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_MASTER;
}

function getUserHistoryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_HISTORY;
}

function getUserMailHistoryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_MAIL_HISTORY;
}

function getUserResponseTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_RESPONSE_MASTER;
}

function getUserTrackProgressTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_TRACK_PROGRESS;
}

function getUserModuleProgressTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_MODULE_PROGRESS;
}

function getUserLevelSummaryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_LEVEL_SUMMARY;
}

function getUserCategorySummaryTable() {
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_CATEGORY_SUMMARY;
}
function getUserDetails(){
  return PRAVINYAM_SCHEMA + "." + TABLE_USER_DETAILS;
}

// return media location
function getMediaLocation() {
  return SPACES_CODE_FILES;
}

module.exports = {

  getModulesTable: getModulesTable,
  getTracksTable: getTracksTable,
  getExercisesTable: getExercisesTable,
  getQATable: getQATable,
  getCategoryMasterTable: getCategoryMasterTable,
  getMduleExidTable:getMduleExidTable,

  getModuleSummaryTable: getModuleSummaryTable,
  getTrackSummaryTable: getTrackSummaryTable,
  getLevelSummaryTable: getLevelSummaryTable,
  getCategorySummaryTable: getCategorySummaryTable,
  getCategoryLockTable: getCategoryLockTable,

  getGroupMasterTable: getGroupMasterTable,
  getUserMasterTable: getUserMasterTable,
  getUserHistoryTable: getUserHistoryTable,
  getUserMailHistoryTable: getUserMailHistoryTable,
  getUserResponseTable: getUserResponseTable,

  getUserTrackProgressTable: getUserTrackProgressTable,
  getUserModuleProgressTable: getUserModuleProgressTable,
  getUserLevelSummaryTable: getUserLevelSummaryTable,
  getUserCategorySummaryTable: getUserCategorySummaryTable,
getUserDetails:getUserDetails,
  getMediaLocation: getMediaLocation,
  getUserModulesTable:getUserModulesTable

}
