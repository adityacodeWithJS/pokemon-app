
'use client'
import axios  from 'axios'

import {useRouter} from 'next/navigation'
import { useEffect, useState } from 'react';
import PokemonCard from "../../components/PokemonCard"

type Pokemeon = {
    name:string;
    id:number;
    height:string;
    weight:number;
    sprites:{
        back_default: string
    }
  }

  interface PageProps{
    params:{
        id:string
    }
  }
  
const DetailsPage= ({params} : PageProps)=>{
const {id}= params;
const [pokemon,setPokemon]=useState<Pokemeon | null>(null)

useEffect(() => {
    const getPokemonDetails = async () => {
       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
       setPokemon(response.data)
    }
    getPokemonDetails()
},[])

if(!pokemon ) return <div>....Loading</div>

return (
    <div>
       <PokemonCard 
       id={parseInt(id)}
       name={pokemon.name.toUpperCase()}
       imageUrl={pokemon.sprites?.back_default}
       />
    </div>
)
  }
  
  export default DetailsPage
