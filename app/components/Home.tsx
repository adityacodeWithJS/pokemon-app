import PokemonCard from "./PokemonCard"
const Home = ({pokemonList}:any) => {
return <>
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
</>
}
export default Home