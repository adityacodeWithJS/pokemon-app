export interface Pokemeon {
    name: string;
    url: string;
  }

  export type PokemeonCard = {
    id: number;
    name: string;
    imageUrl: string;
  }
  

 export  type PokemeonDetails = {
    name: string;
    id: number;
    height: string;
    weight: number;
    sprites: {
        back_default: string
    }
}
