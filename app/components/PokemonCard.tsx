import React from "react";
import Image from "next/image";
import Link from "next/link";
import {PokemeonCard} from "../interface/types"

const pokemonCard = ({ id, name, imageUrl }: PokemeonCard) => {

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="loading"
          className=" h-32 object-contain"
        />
        <div className="p-4 font-semibold text-gray-800">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>

  )
}

export default pokemonCard