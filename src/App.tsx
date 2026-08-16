import React, {useState} from 'react';
import './App.css';


interface PokemonProp{
    img: string
    name: string;
    number: number;
    types: string[];
}

//to get the random the pokeapi/pokemon endpoint spits out count use that for random
function RandomTeam(){
    try{
        let team:string[] = []
        //const response = fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=0')

       // const data = await response.json()
        //const max : number = data.count;
        const max : number = 1025;
        console.log(max);

        for(let i:number = 0; i < 6; i++) {
            team.push((Math.floor(Math.random() * (max - 1 + 1)) + 1).toString());
        }

        return team;
    }
    catch(err){
        console.error("failed to build team" + err);
        return [];
    }
}



async function getPokemon(name: string){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    const data : any = await response.json();

    if (data == null){
        console.error('Could not find any Pokémon');
        return null;
    }

    let typeNames : string[] = data.types.map((type: { type: { name: string; }; }) => type.type.name);
    const pokemonData : PokemonProp = {
        img: data.sprites.other['official-artwork'].front_default,
        name: data.name,
        number: data.id,
        types: typeNames
        };

        return pokemonData;

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}


export function PokeImg({img}: {img: string}) {
    return (
            <img src = {img} alt = "Pokemon Should Be here">
            </img>
    );
}
export function PokeName({name}: {name : string}){
    return (
        <h1> {name}</h1>
    );
}
export function PokeNumber({number}: {number : number}){
    return (
        <h2>{number}</h2>
    );
}

function IsMultipleTypes(types: string[]){
    return types.length > 1;
}

//Pokemon can only have a max of two types so do ternry op to determine dispaly of types[0] or types[0] and types[1]
//also add CSS to colour types approriatlly
export function PokeTypes({types}: {types : string[]}){
    return (

    IsMultipleTypes(types) ? (<div className = "types-div">

            <div className= {types[0]}><p>{types[0]}</p></div>
            <div className={types[1]}><p>{types[1]}</p></div>
        </div>) :
    (<div className={types[0]}><p>{types[0]}</p></div>)
    );
}

export function Pokemon({img, name, number, types}: PokemonProp){
    return (
            <header className="App-body">
                <div className="grid-item">
                    <PokeImg img =  {img} />
                    <PokeName name = {name} />
                    <PokeNumber number = {number} />
                    <PokeTypes types = {types} />
                </div>
            </header>
    );
}




function App() {


    const [pokemonList, setPokemonList] = useState<PokemonProp[]>([]);


        const fillPokemonList = async () => {
            try {
                let names:any = RandomTeam();
                const fetchedPokemon = await Promise.all(
                    names.map((name: string) => getPokemon(name))
                );

                // @ts-ignore
                setPokemonList(fetchedPokemon);
            } catch (error) {
                console.error("Failed to fetch Pokémon:", error);
            }
        };

  return (
      <div className="App">
          <div className="App-header">
              <h1>PokéTeam</h1>
              <button onClick={() => fillPokemonList()}>Click to reset team</button>
          </div>
        <div className="App-body">
            <div className="grid-container">
                {pokemonList.map((pokemon: PokemonProp) => (
                    <Pokemon
                        key={pokemon.number}
                        name={pokemon.name}
                        number={pokemon.number}
                        types={pokemon.types}
                        img={pokemon.img}
                    />
                ))}
            </div>
        </div>
          <a href = "https://jackklassen.github.io/PersonalWebsite/"> by Jack Klassen</a>
      </div>
  );
}


export default App;
