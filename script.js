function onClick(e) {
  e.preventDefault();
  let c = document.getElementById('category');
  let cat = c.options[c.selectedIndex].value;
  let tempVal = document.getElementById('search').value;
  let val = tempVal.replace(" ", "+");

  // set up URL
  let url = "http://www.dnd5eapi.co/api/" + cat + "/" + val;
  fetch(url)
    .then(function(response) {
    if (response.status != 200) {
      return {
        text: "Error calling the D&D API service: " + response.statusText
      }
    }
    return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";
    if (cat === "ability-scores") {
      results += "<h2>" + json.full_name + "</h2>";
      results += "<p>Description:</p>";
      for (var i = 0; i < Object.keys(json.desc).length; i++) {
        results += "<p>" + json.desc[i] + "</p>";
      }
      results += "<p>Skills:</p><ul>";
      for (var i = 0; i < Object.keys(json.skills).length; i++) {
        results += "<li>" + json.skills[i].name + "</li>";
      }
      results += "</ul>";
    }
    else if (cat === "skills") {
      results += "<h2>" + json.name + " (" + json.ability_score.name + ")</h2>";
      results += "<p>Description:</p>";
      for (var i = 0; i < Object.keys(json.desc).length; i++) {
        results += "<p>" + json.desc[i] + "</p>";
      }
    }
    else if (cat === "proficiencies") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Type: " + json.type + "</p>";
      if (Object.keys(json.classes).length > 0) {
        results += "<p>Classes:</p>";
        results += "<ul>";
        for (var i = 0; i < Object.keys(json.classes).length; i++) {
          results += "<list>" + json.classes[i].name + "</list>";
        }
        results += "</ul>";
      }
    }
    else if (cat === "languages") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Type: " + json.type + "</p>";
      results += "<p>Typical Speakers:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.typical_speakers).length; i++) {
        results += "<list>" + json.typical_speakers[i] + "</list>";
      }
      results += "</ul>";
      results += "<p>Script:" + json.script + "</p>";
    }
    else if (cat === "classes") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Hit Die: d" + json.hit_die + "<p>";
      for (var i = 0; i < Object.keys(json.proficiency_choices).length; i++) {
        results += "<p>Choose " + json.proficiency_choices[i].choose + " " + json.proficiency_choices[i].type + ":</p>";
        results += "<ul>";
        for (var j = 0; j < Object.keys(json.proficiency_choices[i].from).length; j++) {
          results += "<list>" + json.proficiency_choices[i].from[j].name + " </list>";
        }
        results += "</ul>";
      }
      results += "<p>Proficiencies:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.proficiencies).length; i++) {
        results += "<list>" + json.proficiencies[i].name + " </list>";
      }
      results += "</ul>";
      results += "<p>Saving Throws:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.saving_throws).length; i++) {
        results += "<list>" + json.saving_throws[i].name + " </list>";
      }
      results += "</ul>";

    }
    else if (cat === "subclasses") {
      results += "<h2>" + json.class.name + ": " + json.name + "</h2>";
      results += "<p>Description:</p>";
      for (var i = 0; i < Object.keys(json.desc).length; i++) {
        results += "<p>" + json.desc[i] + "</p>";
      }
    }
    else if (cat === "races") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Speed: " + json.speed + "</p>";
      results += "<p>Ability Bonuses: </p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.ability_bonuses).length; i++) {
        results += "<list>" + json.ability_bonuses[i].name + ": " + json.ability_bonuses[i].bonus + " </list>";
      }
      results += "</ul>";
      results += "<p>Alignment:</p>";
      results += "<p>" + json.alignment + "</p>";
      results += "<p>Age:</p>";
      results += "<p>" + json.age + "</p>";
      results += "<p>Size: " + json.size + "</p>";
      results += "<p>" + json.size_description + "</p>";
      results += "<p>Proficiencies:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.starting_proficiencies).length; i++) {
        results += "<list>" + json.starting_proficiencies[i].name + "</list>";
      }
      results += "</ul>";
      /*results += "<p>Choose " + json.starting_proficiency_options.choose + "from the following " + json.starting_proficiency_options.type + ":</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.starting_proficiency_options.from).length; i++) {
        results += "<list>" + json.starting_proficiency_options.from[i] + "</list>";
      }
      results += "</ul>";*/
      results += "<p>Languages:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.languages).length; i++) {
        results += "<list>" + json.languages[i].name + " </list>";
      }
      results += "</ul>";
      results += "<p>" + json.language_desc + "</p>";
      results += "<p>Traits:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.traits).length; i++) {
        results += "<list>" + json.traits[i].name + " </list>";
      }
      results += "</ul>";
      results += "<p>Subraces:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.subraces).length; i++) {
        results += "<list>" + json.subraces[i].name + "</list>";
      }
      results += "</ul>";
    }
    else if (cat === "subraces") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>" + json.desc + "</p>";
      results += "<p>Ability Bonuses:</p>";
      results += "<ul>";
      for (var i = 0; i < Object.keys(json.ability_bonuses).length; i++) {
        results += "<list>" + json.ability_bonuses[i].name + ": " + json.ability_bonuses[i].bonus + " </list>";
      }
      results += "</ul>";
      if (Object.keys(json.starting_proficiencies).length != 0) {
        results += "<p>Proficiencies:</p>";
        results += "<ul>";
        for (var i = 0; i < Object.keys(json.starting_proficiencies).length; i++) {
          results += "<list>" + json.starting_proficiencies[i].name + " </list>";
        }
        results += "</ul>";
      }
      if (Object.keys(json.languages).length != 0) {
        results += "<p>Proficiencies:</p>";
        results += "<ul>";
        for (var i = 0; i < Object.keys(json.languages).length; i++) {
          results += "<list>" + json.languages[i].name + " </list>";
        }
        results += "</ul>";
      }
      if (Object.keys(json.racial_traits).length != 0) {
        results += "<p>Proficiencies:</p>";
        results += "<ul>";
        for (var i = 0; i < Object.keys(json.racial_traits).length; i++) {
          results += "<list>" + json.racial_traits[i].name + " </list>";
        }
        results += "</ul>";
      }

    }
    else if (cat === "equipment") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Categories: " + json.equipment_category + ", " + json.weapon_category + ", " + json.weapon_range + "</p>";
      results += "<p>Cost: " + json.cost.quantity + " " + json.cost.unit + "</p>";
      results += "<p>Damage: " + json.damage.damage_dice;
      if (json.damage.damage_bonus != 0) {
        results += "+" + json.damage.damage_bonus;
      }
      results += " " + json.damage.damage_type.name + " damage</p>";
      results += "<p>Range: ";
      if (json.range.long != null) {
        results += "normal: " + json.range.normal + ", long:" + json.range.long + "</p>";
      }
      else {
        results += json.range.normal + "</p>";
      }
      results += "<p>Weight: " + json.weight + "</p>";
      if (Object.keys(json.properties).length != 0) {
        results += "<p>Properties: ";
        results += json.properties[0].name;
        for (var i = 1; i < Object.keys(json.properties).length; i++) {
          results += ", " + json.properties[i].name;
        }
        results += "</p>";
      }
    }
    else if (cat === "spells") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>" + json.desc + "</p>";
      if (Object.keys(json.higher_level).length != 0) {
        results += "<p>At Higher Levels: </p>";
        for (var i = 0; i < Object.keys(json.higher_level).length; i++) {
          results += "<p>" + json.higher_level[i] + "</p>";
        }
      }
      results += "<p>Range: " + json.range + "</p>";
      results += "<p>Components: ";
      for (var i = 0; i < Object.keys(json.components).length; i++) {
        results += json.components[i];
      }
      results += "</p>";
      results += "<p>Ritual: ";
      if (json.ritual) {
        results += "yes</p>";
      }
      else {
        results += "no</p>";
      }
      results += "<p>Casting Time: " + json.casting_time + "</p>";
      results += "<p>Duration: " + json.duration + "</p>";
      results += "<p>Level: " + json.level + "</p>";
    }
    /*else if (cat === "monsters") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Size: " + json.size + "</p>";
      results += "<p>Type: " + json.type + "</p>";
      results += "<p>Alignment: " + json.alignment + "</p>";
      results += "<p>Armor Class: " + json.armor_class + "</p>";
      results += "<p>Hit Points: " + json.hit_points + "</p>";
      results += "<p>Hit Dice: " + json.hit_dice + "</p>";
      results += "<p>Speed:</p>";
      results += "<ul>";
      for (var i = 0; i < json.speed.size(); i++) {
        results += "<list>" + json.racial_traits[i].name + "</list>";
      }
      results += "</ul>";


    }*/
    else if (cat === "conditions") {
      results += "<h2>" + json.name + "</h2>";
      results += "<p>Description:</p>";
      for (var i = 0; i < Object.keys(json.desc).length; i++) {
        results += "<p>" + json.desc[i] + "</p>";
      }
    }

    document.getElementById("result").innerHTML = results;
  });
}
document.getElementById('button').addEventListener('click', onClick);
