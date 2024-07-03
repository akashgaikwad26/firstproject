var options = {
  token: 'XXXXXXXXXX' // get this from GitHub,
  owner: 'doowb',
  repo: 'github-metadata'
};

metadata(options)
  .then(function(data) {
    console.log(data);
    //=> {
    //=>   // this object contains all of the metadata that was gather from GitHub
    //=> }
  })
  .catch(console.error);
