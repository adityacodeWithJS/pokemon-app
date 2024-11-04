import {  PokemeonCard } from "../interface/types";
import PokemonCard from "./PokemonCard"
import React from "react";

const Home = ({pokemonList}:any) => {
    
return <>
<div className='grid grid-cols-1 sm:grid-cols-4  gap-3 m-5'>
        {
          pokemonList.length > 0 &&
          pokemonList.map((pokemon: PokemeonCard, index: number) => {
            return (
              <PokemonCard key={index + '_002'} {...pokemon} />
            )
          })
        }
       
      </div>
</>
}
export default Home