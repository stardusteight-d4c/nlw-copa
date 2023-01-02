import React from 'react'

interface Props {
  activeItem: string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const Menu = ({ activeItem, setOpenModal, setActiveItem }: Props) => {
  return (
    <section className={style.wrapper}>
      <div className={style.buttonContainer}>
        <button
          onClick={() => setOpenModal(true)}
          className={style.createGuessButton}
        >
          Criar palpite
        </button>
      </div>
      <div>
        <div className={style.menuContainer}>
          <span
            onClick={() => setActiveItem('your_guesses')}
            className={`${activeItem === 'your_guesses' && 'bg-gray-600'} ${
              style.menuItem
            }`}
          >
            Seus palpites
          </span>
          <span
            onClick={() => setActiveItem('all_guesses')}
            className={`${activeItem === 'all_guesses' && 'bg-gray-600'} ${
              style.menuItem
            }`}
          >
            Todos palpites
          </span>
          <span
            onClick={() => setActiveItem('group_ranking')}
            className={`${activeItem === 'group_ranking' && 'bg-gray-600'} ${
              style.menuItem
            }`}
          >
            Ranking do grupo
          </span>
        </div>
      </div>
    </section>
  )
}

const style = {
  wrapper: `bg-gray-800 w-[600px] mt-8 mx-auto rounded text-white shadow-xl`,
  buttonContainer: `w-[600px] mx-auto`,
  createGuessButton: `bg-ignite-500 hover:brightness-110 w-full text-white font-bold text-sm uppercase px-6 py-4 rounded-t`,
  menuContainer: `font-bold rounded gap-x-2 flex justify-between min-h-[50px] max-h-[50px] p-2`,
  menuItem: `rounded cursor-pointer flex items-center w-full justify-center min-h-full px-4`,
}
