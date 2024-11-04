
'use client'
import axios from 'axios'
import { useRouter,useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import PokemonCard from "../../components/PokemonCard"
import {PokemeonDetails} from "../../interface/types"


const DetailsPage = () => {
    const { id } = useParams () as { id: string };
    const router = useRouter()
    const [pokemon, setPokemon] = useState<PokemeonDetails | null>(null)

    // It will redirect to Home page 
    const handleBackToHome = () => {
        router.push('/')
    }

    //get single Pokemon Details from below code based on id;
    useEffect(() => {
        const getPokemonDetails = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            setPokemon(response.data)
        }

        getPokemonDetails()

    }, [])

    if (!pokemon) return <div>..Loading</div>

    return (
        <div  className='md:flex flex-col  m-5 gap-4 justify-center'>

            <button onClick={handleBackToHome}
                className='mt-4 max-w-[100px]  px-4 bg-blue-300 
                text-white rounded hover:bg-blue-500 '
            >
                Back
            </button>
            <div className='max-w-sm  bg-white '>
                <PokemonCard
                    id={parseInt(id)}
                    name={pokemon.name.toUpperCase()}
                    imageUrl={pokemon.sprites?.back_default}
                />
            </div>
        </div>
    )
}

export default DetailsPage
