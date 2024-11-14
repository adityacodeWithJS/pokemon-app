"use client";

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import debounce from 'lodash/debounce'
import PokemonCard from "./components/PokemonCard"
import Home from './components/Home';
import TextInput from './components/Input/TextInput';
import SelectInput from './components/Input/SelectInput';
import { Pokemeon } from './interface/types'
import Login from './Login';


const LandingPage = () => {

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
    setLoading(false)
  }

  const handleMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  /* It will be call after certain time and take
  @params : params serahKey:string or filterType:string */

  const handleFilterSearch = debounce((itemSearchKey: string, filterType: string) => {
    let filterPokemons = allPokemonList
    if (filterType) {
      filterPokemons = filterPokemons.filter((pokemon) => {
        if (pokemon.name === filterType)
          return pokemon
      })
    
    }

    if (itemSearchKey) {
      filterPokemons = filterPokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(itemSearchKey.toLowerCase())
      })
    }
   
    setPokeMonList(filterPokemons)
  //  setSelectedTypes(filterType)
  }, 500)


  // const fetchPokemonTypes = async () => {
  //   const response = await axios.get(`https://pokeapi.co/api/v2/type/`);
  //   //  setPokemonTypes(response.data.results)
  //   console.log("Response", response.data.results)
  // }

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
      <Login/>
       <TextInput
        value={searchItem}
        onChange={handleSearchInputChange}
        className='p-2 mb-4 border rounded w-full'
        placeholder='Search Item'
        />

       <SelectInput
         value={selectedType}
         onChange={handleFilterChange}
         options={pokemonTypes}
         className='
         focus:ring-2
         p-2 mb-4 border border-gray-300 rounded-lg shadow-sm w-full
          text-gray-700
        '
        />
      
      </div>
  
      {pokemonList.length  && <Home pokemonList={pokemonList}  />}

      <div ref={observerRef} className='h-4'></div>
    </div>
  )
}

export default LandingPage