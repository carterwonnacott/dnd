function onClick(e) {
  e.preventDefault();
  let c = document.getElementById('category');
  let cat = c.options[c.selectedIndex].value;
  let tempVal = document.getElementById('search').value;
  let val = tempVal.replace(" ", "+");
    
  // set up URL
  let url = "http://www.dnd5eapi.co/api/" + cat + "/?name=" + val + "/";
  fetch(url)
    .then(function(response) {
    if (response.status != 200) {
      return {
        text: "Error calling the D&D API service: " + response.statusText
      }
    }
    return response.json();
  }).then(function(json) {
    //updateResult(json.text);
    let results = "";
    for(let i = 0; i < json.main.count; i++) {
      let temp = "http://www.dnd5eapi.co" + json.main.results[i].url;
      results += '<h2><a onclick=updateResults(' + temp + ')>' + json.main.results[i].name + '</a></h2>';
    }
    document.getElementById("result").innerHTML = results;
  });  
}

function updateResults(newURL) {
  fetch(newURL)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the D&D API service: " + response.statusText
        }  
      }
      return response.json();
    }).then(function(json) {
        
    }); 
}

document.getElementById('search').addEventListener('click', onClick);
