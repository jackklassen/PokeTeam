 const P = new Pokedex.Pokedex();

 function createRandomTeam() {
     var teamArray = [];
     for (var i = 0; i <= 5; i++) {
         teamArray[i] = getRandomInt(151);
     }
     return teamArray;
 }


 function getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max) + 1)
 }


 async function display() { //a bit overstuffed 
     var teamArray = createRandomTeam();
     var name = document.querySelectorAll(".pokemon #name");
     var id = document.querySelectorAll(".pokemon #pokeId");

     var weight = document.querySelectorAll(".pokemon #weight");
     var height = document.querySelectorAll(".pokemon #height");
     for (var i = 0; i <= 5; i++) {
         try {
             var pokemon = await setPokemon(teamArray[i]) //other info can be weight, type , stats abilitys etc

             name[i].innerHTML = pokemon.name;
             id[i].innerHTML = pokemon.id;
             weight[i].innerHTML = "Weight: " + pokemon.weight;
             height[i].innerHTML = "Height: " + pokemon.height;

             await setPokeSprite(pokemon, i);

             await setPokeType(pokemon, i);

             // await setFlavourText(pokemon, i);
         } catch {
             console.log("Error Can't Set Pokemon")
         }

     }
 }
 async function setPokeSprite(pokemon, i) {
     var img = document.querySelectorAll(".pokemon img");
     if (getRandomInt(6) == 4) { //set shiny as a 1 out of 6 chance
         img[i].src = pokemon.sprites.front_shiny;
     } else {
         img[i].src = pokemon.sprites.front_default;
     }
 }

 //todo: set colur by type
 async function setPokeType(pokemon, i) {
     var type1 = document.querySelectorAll(".pokemon #type1");
     var type2 = document.querySelectorAll(".pokemon #type2");

     type1[i].innerHTML = pokemon.types[0].type.name;
     type2[i].innerHTML = pokemon.types[1].type.name;

 }

 async function setFlavourText(pokemon, i) {
     var flavour = document.querySelectorAll(".pokemon #flavourtext");
     P.getPokemonSpeciesByName(pokemon.name)
         .then(function(response) {

             var englishtext = [];
             for (var j = 0; j < response.flavor_text_entries.length; j++) {
                 if (response.flavor_text_entries[j].language.name == "en") {
                     englishtext.push(response.flavor_text_entries[j]);
                 }
             }
             for (var x = 0; x < englishtext.length - 1; x++) {
                 console.log("this is a test: " + englishtext[x].flavor_text);
             }
             /* var randNum = getRandomInt(response.flavor_text_entries.length);
             var randText = response.flavor_text_entries[randNum];

             var textset = false;
             while (textset == false) { // grab a random flavor text if thats not in english loop back and try again until we find one
                 if (randText.language.name == "en") {
                     flavour[i].innerHTML = randText.flavor_text;
                     textset = true;
                     console.log(randText.flavor_text);
                 } else {
                     randNum = getRandomInt(response.flavor_text_entries.length);
                     randText = response.flavor_text_entries[randNum];
                     console.log("Second Attempt: " + randText.flavor_text);
                 }
             }

*/
         });
 }

 async function setPokemon(pokeNum) {
     var pokemon;
     try {
         pokemon = await P.getPokemonByName(pokeNum);
         return pokemon;
     } catch {
         console.log("Error " + pokemon + " Not Found")
     }
 }
 display();