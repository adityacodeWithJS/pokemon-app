"use client";

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import debounce from 'lodash/debounce'
import PokemonCard from "./components/PokemonCard"

interface Pokemeon {
  name: string;
  url: string;
}

const Home = () => {

  const [pokemonList, setPokeMonList] = useState<Pokemeon[]>([]);
  const [allPokemonList, setAllPokeMonList] = useState<Pokemeon[]>([]);
  const limit = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [searchItem, setSearchItem] = useState<string>('');
  const [selectedType, setSelectedTypes] = useState<string>('');
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1)


  const getPokemonList = async (currentPage: number) => {
    setLoading(true)
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * limit} &limit=${limit}}`)
    const pokemonResults = response.data.results.map((pokemon: Pokemeon, index: number) => ({
      id: index + 1,
      name: pokemon.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }))
    setPokeMonList((prevPokemons) => [...prevPokemons, ...pokemonResults])
    setAllPokeMonList((prevPokemons) => [...prevPokemons, ...pokemonResults])

    //Filter Data Consume
    const uniqueTypes = pokemonResults.map((pokemon: Pokemeon) => pokemon.name)
    setPokemonTypes(uniqueTypes)
    console.log("pokemonResults", pokemonResults, uniqueTypes)
    setLoading(false)
  }

  const handleMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleFilterSearch = debounce((itemSearchKey: string, filterType: string) => {
    let filterPokemons = allPokemonList
    if (filterType) {
      filterPokemons = filterPokemons.filter((pokemon) => {
        if (pokemon.name === filterType)
          return pokemon
      })
      console.log("filterPokemons", filterPokemons)
    }

    if (itemSearchKey) {
      filterPokemons = filterPokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(itemSearchKey.toLowerCase())
      })
    }
    setPokeMonList(filterPokemons)
  }, 500)


  const fetchPokemonTypes = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/`);
    //  setPokemonTypes(response.data.results)
    console.log("Response", response.data.results)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((allItems) => {
      if (allItems[0].isIntersecting && !loading) {
        handleMore()
      }
    }, {
      rootMargin: '100px',
      threshold: 1.0
    })

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
    //fetch apkemon List 

  }, [loading])


  useEffect(() => {
    getPokemonList(page)
  }, [page])


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedType = event.target.value
    setSelectedTypes(newSelectedType)
    handleFilterSearch(searchItem, newSelectedType)
  }


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value
    setSearchItem(searchText)
    handleFilterSearch(searchText, selectedType)
  }

  return (
    <div>
      <div className='w-1/2 flex gap-3 mx-auto max-w-2xl p-2'>
        <input type='text' placeholder='Search Pokemeon...'
          value={searchItem}
          onChange={handleSearchInputChange}
          className='p-2 mb-4 border rounded w-full'
        />
        <select
          value={selectedType}
          onChange={handleFilterChange}
          className='
        focus:ring-2
        p-2 mb-4 border border-gray-300 rounded-lg shadow-sm w-full
         text-gray-700
       '

        >
          <option
            value=""
            className='text-gray-500'
          >All Types</option>

          {pokemonTypes.length &&
            pokemonTypes.map((type, index) => {
              return <option
                key={type}
                value={type}
                className='text-gray-700'
              >
                {type}
              </option>
            })

          }
        </select>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-4  gap-3 m-5'>
        {
          pokemonList.length > 0 &&
          pokemonList.map((pokemon: any, index: number) => {
            return (
              <PokemonCard key={index + 'abc'} {...pokemon} />
            )
          })
        }
      </div>

      <div ref={observerRef} className='h-4'></div>
    </div>
  )
}

export default Home