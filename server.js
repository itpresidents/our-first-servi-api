// where should we serve files from?
serveFiles("public");

// Now we are making a database
// This uses https://github.com/louischatriot/nedb behind the scenes
// It basically saves your data like JSON
var database = useDatabase('names');

// create routes!
route('/', index); // get route
route('/get-api-data',getApiData); // get route for API
route('/show-chart',createChart); // get route to create a chart

route('/submit-data',submitData); //post route

function index(request){
  console.log("home page requested!");
  request.render("index.html");
}

function submitData(request){
  
  console.log(request.fields);

  // now we need to save the data
  var dataToSave = {
   name: request.fields.name,
   sleepyLevel: request.fields.sleepyLevel
  }
  
  database.add(dataToSave);
  //request.redirect("/index.html");
  request.redirect('/chart.html');
}

function getApiData(request){
  database.getAll(gotData);
  
  function gotData(data){
    // These second two arguments make it a little prettier to look at
    request.respond(JSON.stringify(data), null, 2);    
  }
} 

function createChart(request){
  console.log("create chart requested");
  
  request.render("chart.html");
}






