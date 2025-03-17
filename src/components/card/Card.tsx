import { useState } from 'react'
import './Card.css'
import { Card as CardObject } from '../../type'

export function Card({
    data,
    className,
}: {
    data: CardObject
    className?: string
}) {
    const [card] = useState<CardObject>(data)

    return (
        <div
            style={
                {
                    '--x-position': card.x_index,
                } as React.CSSProperties
            }
            className={`rotate-y-0 transform-3d sm:h-[95px] sm:w-[71px] sm:rounded-[5px] md:h-[190px] md:w-[142px] md:rounded-[8px] ${className} transition-transform duration-150 ease-in-out`}
        >
            <div
                style={{
                    backgroundPosition: `calc(100%/12*${card.x_index}) calc(100%/3*${card.y_index})`,
                }}
                className="absolute z-1 bg-white bg-[auto_400%] bg-no-repeat shadow-xs drop-shadow-[2px_5px_0.5rem_#000000] transition-shadow duration-300 ease-in-out backface-hidden hover:shadow-2xl sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('src/assets/images/textures/1x/8BitDeck_opt2.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('src/assets/images/textures/2x/8BitDeck_opt2.png')]"
            ></div>
            <div className="absolute -z-1 rotate-y-180 bg-[auto_500%] backface-hidden sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('src/assets/images/textures/1x/Enhancers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('src/assets/images/textures/2x/Enhancers.png')]" />
        </div>
    )
}

export function StackCard({ remaining }: { remaining: number }) {
    return (
        <div className="relative col-span-1 mt-5 grid place-items-center">
            <div className="relative bg-white bg-[auto_500%] bg-no-repeat drop-shadow-[2px_-2px_0.4rem_rgba(0,0,0,0.5)] sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/Enhancers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/Enhancers.png')]">
                <span className="absolute right-0 bottom-0 translate-y-full text-sm text-white">
                    {remaining}/52
                </span>
            </div>
            <div className="absolute -translate-y-[2px] translate-x-[2px] bg-white bg-[auto_500%] bg-no-repeat drop-shadow-[2px_-2px_0.4rem_rgba(0,0,0,0.5)] sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/Enhancers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/Enhancers.png')]"></div>
            <div className="absolute -translate-y-[4px] translate-x-[4px] bg-white bg-[auto_500%] bg-no-repeat drop-shadow-[2px_-2px_0.4rem_rgba(0,0,0,0.5)] sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/Enhancers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/Enhancers.png')]"></div>
            <div className="absolute -translate-y-[6px] translate-x-[6px] bg-white bg-[auto_500%] bg-no-repeat drop-shadow-[2px_-2px_0.4rem_rgba(0,0,0,0.5)] sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/Enhancers.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/Enhancers.png')]"></div>
        </div>
    )
}
