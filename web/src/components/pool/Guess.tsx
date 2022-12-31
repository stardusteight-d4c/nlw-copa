import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { VscClose } from 'react-icons/vsc'

interface Props {}

export const Guess = (props: Props) => {
  return (
    <div className="bg-gray-800 relative border-b-[3px] p-6 border-b-yellow-500 w-[600px] mt-4 mx-auto rounded text-white shadow-xl">
      <div className="text-center flex-col">
        <div>
          <h2 className="font-bold text-2xl">Brasil vs. Argentina</h2>
          <span className="text-gray-200">
            22 de Novembro de 2022 às 16:00h
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="flex gap-x-2 justify-center items-center">
          <span className="flex items-center justify-center h-[35px] w-[50px] rounded bg-gray-900 border border-gray-800 text-white">
            10
          </span>
          <ReactCountryFlag
            countryCode="BR"
            svg
            style={{
              width: '2.5em',
              height: '2.5em',
            }}
            title="US"
          />
        </div>
        <VscClose className="text-gray-200 text-3xl mx-5" />
        <div className="flex gap-x-2 justify-center items-center">
          <ReactCountryFlag
            countryCode="US"
            svg
            style={{
              width: '2.5em',
              height: '2.5em',
            }}
            title="US"
          />
          <span className="flex items-center justify-center h-[35px] w-[50px] rounded bg-gray-900 border border-gray-800 text-white">
            1
          </span>
        </div>
      </div>
      <div className="w-full absolute left-0 bottom-1 text-sm text-center">
        <span>Criado por </span>
        <span className="w-fit text-yellow-500 uppercase font-bold mx-auto">
          Gabriel Sena
        </span>
      </div>
    </div>
  )
}
