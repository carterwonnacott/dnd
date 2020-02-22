function onClick(e) {
  e.preventDefault();
  let c = document.getElementById('category');
  let cat = c.options[c.selectedIndex].value;
  let tempVal = document.getElementById('search').value;
  let val = tempVal.replace(" ", "+");
  
  // should make a response for invalid input
  
  // setup URL
  let url = "http://www.dnd5eapi.co/api/" + cat + "/?name=" + val;
  fetch(url)
    .then(function(response) {
    if (response.status != 200) {
      return {
        text: "Error calling the D&D API service: " + response.statusText
      }
    }
    return response.json();
  }).then(function(json) {
    updateResult(json.text);
  });
  
}

function updateResult(info) {
  document.getElementById('results').textContent = info;
}

document.getElementById('search').addEventListener('click', onClick);
