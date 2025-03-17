import { useState } from 'react'
import { jokers } from '../../assets/jokers'

export function Joker({ id }: { id: number }) {
    const [joker] = useState(jokers.find((joker) => joker.id === id))
    if (!joker) return null
    return (
        <div className="group relative">
            <div
                style={
                    {
                        '--x-position': joker.x_index,
                    } as React.CSSProperties
                }
                className="moveAnimation rotate-y-0 transform-3d sm:h-[95px] sm:w-[71px] sm:rounded-[5px] md:h-[190px] md:w-[142px] md:rounded-[8px]"
            >
                <div
                    style={{
                        backgroundPosition: `calc(100%/9*${joker.x_index}) calc(100%/15*${joker.y_index})`,
                    }}
                    className="absolute z-1 bg-white bg-[auto_1600%] bg-no-repeat shadow-xs drop-shadow-[2px_5px_0.5rem_#000000] transition-shadow duration-300 ease-in-out backface-hidden hover:shadow-2xl sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/Jokers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/Jokers.png')]"
                ></div>
                <div className="absolute -z-1 rotate-y-180 bg-[auto_500%] backface-hidden sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/Enhancers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/Enhancers.png')]" />
            </div>
            <div className="absolute left-[-25%] z-10 mt-2 bg-(--dark-light) text-center text-white opacity-0 outline-2 select-none group-hover:opacity-100 sm:w-[106px] sm:rounded-[5px] md:w-[213px] md:rounded-[8px]">
                <h3 className="font-bold sm:text-lg md:text-2xl">
                    {joker.joker}
                </h3>
                <p className="m-1 rounded-md bg-white text-sm text-black sm:text-sm md:text-lg">
                    {joker.effect}
                </p>
                <p className="mb-1 inline-block w-auto rounded-md bg-green-700 p-1 text-sm sm:text-sm md:text-lg">
                    {joker.rarity}
                </p>
            </div>
        </div>
    )
}
