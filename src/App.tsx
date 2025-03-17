import { useEffect, useRef, useState } from 'react'
import './App.css'
import { motion, AnimatePresence } from 'motion/react'
import CardFactory from './components/card/CardFactory'
import { Card, StackCard } from './components/card/Card'
import { Joker } from './components/card/Joker'
import { Card as CardElement } from './type'

function App() {
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [showSettings, setShowSettings] = useState(false)
    const [gamePage, setGamePage] = useState('home')

    useEffect(() => {
        const constraints = constraintsRef.current
        if (constraints) {
            constraints.classList.add('reveal')
            setTimeout(() => {
                constraints.classList.remove('reveal')
            }, 2500)
        }
    }, [constraintsRef])

    return (
        <>
            <AnimatePresence>
                {gamePage === 'home' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid h-full w-full place-content-center gap-10 select-none"
                    >
                        <motion.div
                            ref={constraintsRef}
                            className="relative bg-cover bg-center sm:h-[216px] sm:w-[333px] sm:bg-[url('./assets/images/textures/1x/balatro.png')] md:h-[432px] md:w-[666px] md:bg-[url('./assets/images/textures/2x/balatro.png')]"
                        >
                            <motion.div
                                drag
                                dragConstraints={constraintsRef}
                                dragSnapToOrigin={true}
                                dragElastic={0.5}
                                whileDrag={{ scale: 1.1 }}
                                whileTap={{ scale: 1.1 }}
                                className="absolute top-1/2 left-1/2 -translate-1/2 bg-white bg-[auto_400%] bg-[calc(100%/12*var(--x-position))_calc(100%/3*var(--y-position))] bg-no-repeat shadow-xs drop-shadow-[2px_5px_0.5rem_#000000] transition-shadow duration-300 ease-in-out [--x-position:12] [--y-position:3] hover:shadow-2xl sm:h-[95px] sm:w-[71px] sm:rounded-[5px] sm:bg-[url('./assets/images/textures/1x/8BitDeck_opt2.png')] md:h-[190px] md:w-[142px] md:rounded-[8px] md:bg-[url('./assets/images/textures/2x/8BitDeck_opt2.png')]"
                            ></motion.div>
                        </motion.div>
                        <div className="flex h-auto flex-row items-center justify-around rounded-[6px] bg-[#374b52] text-white sm:w-[333px] sm:text-4xl md:w-[666px] md:text-6xl">
                            <button
                                onClick={() => setGamePage('game')}
                                className="w-full rounded-[6px] bg-(--blue) ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:m-2 sm:p-3 md:m-3 md:p-6"
                            >
                                PLAY
                            </button>
                            <button
                                onClick={() => setShowSettings(true)}
                                className="w-full rounded-[6px] bg-(--orange) ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:m-2 sm:p-3 md:m-3 md:p-6"
                            >
                                OPTIONS
                            </button>
                        </div>
                    </motion.div>
                )}
                {gamePage === 'game' && <GamePage />}
            </AnimatePresence>
            <AnimatePresence>
                {showSettings && (
                    <GameSettings onClose={() => setShowSettings(false)} />
                )}
            </AnimatePresence>
        </>
    )
}

export default App

function GameSettings({ onClose }: { onClose: () => void }) {
    const [gameSpeed, setGameSpeed] = useState(1)

    const handleIncreaseSpeed = () => {
        setGameSpeed((prev) => {
            if (prev === 1) return 2
            if (prev === 2) return 4
            return 4
        })
    }

    const handleDecreaseSpeed = () => {
        setGameSpeed((prev) => {
            if (prev === 4) return 2
            if (prev === 2) return 1
            return 1
        })
    }

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 text-white select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                transition={{
                    type: 'spring',
                    stiffness: 50,
                    duration: 0.2,
                }}
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '100vh' }}
                className="w-80 rounded-2xl bg-gray-700 p-6 shadow-lg"
            >
                <h1 className="mb-4 text-center text-4xl font-bold">
                    Game Settings
                </h1>

                <div className="mb-6">
                    <label className="mb-2 block text-xl font-medium">
                        Game Speed
                    </label>
                    <div className="flex items-center justify-between">
                        <button
                            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-red-500 text-xl font-medium hover:bg-red-600"
                            onClick={handleDecreaseSpeed}
                        >
                            &lt;
                        </button>
                        <span className="text-xl font-bold">{gameSpeed}</span>
                        <button
                            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-red-500 text-xl font-medium hover:bg-red-600"
                            onClick={handleIncreaseSpeed}
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                <button
                    className="w-full rounded-[6px] bg-(--orange) py-2 ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:text-2xl md:text-4xl"
                    onClick={onClose}
                >
                    Back
                </button>
            </motion.div>
        </motion.div>
    )
}

function GamePage() {
    const [deck, setDeck] = useState<CardElement[]>([])
    const [hands, setHands] = useState<CardElement[]>([])
    const [playedCard, setPlayedCard] = useState<CardElement[]>([])
    const [jokers, setJokers] = useState<number[]>([])
    const [combination, setCombination] = useState({
        title: 'None',
        chips: 0,
        mult: 0,
    })

    useEffect(() => {
        const { deck, hands } = retirerElements(CardFactory.createDeck())
        setDeck(deck)
        setHands(hands)
        ramdomJoker()
    }, [])

    useEffect(() => {
        const timeout = setInterval(() => ramdomJoker(), 10000)
        return () => clearInterval(timeout)
    }, [])

    useEffect(() => {
        const selected = hands.filter((card) => card.selected)
        const c = CardFactory.evaluateHand(selected)
        setCombination(c)
    }, [hands])

    useEffect(() => {
        if (playedCard.length === 0) {
            setCombination({
                title: 'None',
                chips: 0,
                mult: 0,
            })
        } else {
            const c = CardFactory.evaluateHand(playedCard)
            setCombination(c)
        }
    }, [playedCard])

    function ramdomJoker() {
        const j: number[] = []
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * 44) + 1
            if (!jokers.includes(randomIndex) && !j.includes(randomIndex)) {
                j.push(randomIndex)
            }
        }
        setJokers(j)
    }

    function retirerElements(deck: CardElement[], count = 8) {
        const newArray = [...deck]
        const removedElements = []

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * newArray.length)
            removedElements.push(...newArray.splice(randomIndex, 1))
        }

        return {
            deck: newArray.map((card) => ({ ...card, selected: false })),
            hands: removedElements.map((card) => ({
                ...card,
                selected: false,
            })),
        }
    }

    function handleDrawCard(index: number) {
        const selected = hands.filter((card) => card.selected).length
        setHands((prev) => {
            const newHands = [...prev]
            const card = { ...prev[index] }
            card.selected = selected < 5 ? !card.selected : false
            newHands.splice(index, 1, card)
            return newHands
        })
    }

    function sortHand(type: 'Rank' | 'Suit') {
        setHands((prev) => {
            const newHands = [...prev]
            newHands.sort((a, b) => {
                if (type === 'Rank') {
                    return b.x_index - a.x_index
                } else {
                    return a.y_index - b.y_index
                }
            })
            return newHands
        })
    }

    function handleDiscard() {
        const selectedCard = hands.filter((card) => card.selected)
        const NoSelectedCard = hands.filter((card) => !card.selected)
        const { deck: newDeck, hands: newHands } = retirerElements(
            deck,
            selectedCard.length
        )
        setDeck([...newDeck, ...selectedCard])
        setHands([...NoSelectedCard, ...newHands])
    }

    function handlePlayHand() {
        const selectedCard = hands.filter((card) => card.selected)
        const NoSelectedCard = hands.filter((card) => !card.selected)
        if (selectedCard.length > 0) {
            setPlayedCard(selectedCard.sort((a, b) => b.x_index - a.x_index))
            const { deck: newDeck, hands: newHands } = retirerElements(
                deck,
                selectedCard.length
            )
            setDeck(newDeck)
            setHands([...NoSelectedCard, ...newHands])
        }
    }

    return (
        <div className="grid h-full w-full grid-cols-4 grid-rows-3 select-none sm:px-6 md:px-16">
            <div className="col-span-1 row-span-3">
                <div className="flex h-full w-full flex-col items-center justify-around rounded-lg bg-(--dark-light)">
                    <div className="mt-8 flex w-full items-center justify-center">
                        <div className="flex h-[95%] w-[95%] flex-col items-center justify-around rounded-md bg-(--dark) py-3 text-white">
                            <h4 className="sm:text-xl md:text-3xl">
                                Score at least
                            </h4>

                            <div className="flex flex-row items-center justify-center">
                                <div className="sm:h-[29px] sm:w-[29px] sm:bg-[url('./assets/images/textures/1x/chips.png')] md:h-[58px] md:w-[58px] md:bg-[url('./assets/images/textures/2x/chips.png')]"></div>
                                <h1 className="ml-1 flex text-(--red) sm:text-3xl md:text-6xl">
                                    450
                                </h1>
                            </div>
                            <div className="flex flex-row">
                                <h4 className="text-nowrap sm:text-xl md:text-3xl">
                                    Reward:&nbsp;
                                </h4>
                                <h2 className="text-(--orange) sm:text-xl md:text-3xl">
                                    $$$$
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <div className="flex h-[95%] w-[95%] flex-col rounded-lg text-white">
                            <div className="flex w-full flex-row items-center rounded-md bg-(--dark) p-1">
                                <h4 className="sm:text-md ml-1 flex-1 text-center leading-none md:text-xl">
                                    Round score
                                </h4>
                                <div className="ml-1 flex flex-4 items-center justify-center rounded-xl bg-(--dark-light)">
                                    <div className="sm:h-[29px] sm:w-[29px] sm:bg-[url('./assets/images/textures/1x/chips.png')] md:h-[58px] md:w-[58px] md:bg-[url('./assets/images/textures/2x/chips.png')]"></div>
                                    <h1 className="ml-1 flex sm:text-3xl md:text-6xl">
                                        450
                                    </h1>
                                </div>
                            </div>
                            <div className="my-2 flex h-full w-full flex-col items-center rounded-md bg-(--dark) px-1 py-2">
                                <h1 className="flex leading-none sm:text-3xl md:text-6xl">
                                    {combination.title}
                                </h1>
                                <div className="mt-2 flex w-full flex-row items-center justify-center">
                                    <div className="w-full rounded-md bg-(--blue) pr-2 text-end sm:text-3xl md:text-6xl">
                                        {combination.chips}
                                    </div>
                                    <div className="px-2 text-center text-(--red) sm:text-3xl md:text-6xl">
                                        X
                                    </div>
                                    <div className="w-full rounded-md bg-(--red) pl-2 sm:text-3xl md:text-6xl">
                                        {combination.mult}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 flex h-full w-full items-center justify-center">
                        <div className="flex h-[95%] w-[95%] flex-row rounded-md text-white">
                            <div className="flex flex-1 flex-col items-center px-1 pt-2">
                                <button className="mb-2 rounded-lg bg-(--red) ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:h-20 sm:w-15 sm:text-xl md:h-30 md:w-25 md:text-3xl">
                                    Run <br />
                                    Info
                                </button>
                                <button className="rounded-lg bg-(--orange) ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:h-20 sm:w-15 sm:text-xl md:h-30 md:w-25 md:text-3xl">
                                    Options
                                </button>
                            </div>
                            <div className="flex flex-2 flex-col">
                                <div className="flex flex-row justify-center gap-2 px-1 pt-1">
                                    <div className="flex flex-col items-center rounded-lg bg-(--dark) sm:w-15 md:w-25">
                                        <h1 className="sm:text-md md:text-xl">
                                            Hands
                                        </h1>
                                        <div className="w-[90%] rounded-xl bg-(--dark-light) text-center text-blue-700 sm:text-3xl md:text-6xl">
                                            1
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center rounded-lg bg-(--dark) pb-1 sm:w-15 md:w-25">
                                        <h1 className="sm:text-md md:text-xl">
                                            Discards
                                        </h1>
                                        <div className="w-[90%] rounded-xl bg-(--dark-light) text-center text-red-700 sm:text-3xl md:text-6xl">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-center px-1 pt-1">
                                    <div className="flex flex-col items-center rounded-lg bg-(--dark) pb-1 sm:w-32 md:w-52">
                                        <div className="mt-1 w-[90%] rounded-xl bg-(--dark-light) text-center text-(--orange) sm:text-3xl md:text-6xl">
                                            $1
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center gap-2 px-1 pt-1">
                                    <div className="flex flex-col items-center rounded-lg bg-(--dark) sm:w-15 md:w-25">
                                        <h1 className="sm:text-md md:text-xl">
                                            Ante
                                        </h1>
                                        <div className="w-[90%] rounded-xl bg-(--dark-light) text-center">
                                            <span className="text-orange-600 sm:text-3xl md:text-6xl">
                                                1
                                            </span>
                                            <span className="sm:text-md md:text-xl">
                                                /8
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center rounded-lg bg-(--dark) pb-1 sm:w-15 md:w-25">
                                        <h1 className="sm:text-md md:text-xl">
                                            Rounds
                                        </h1>
                                        <div className="w-[90%] rounded-xl bg-(--dark-light) text-center text-orange-600 sm:text-3xl md:text-6xl">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 row-span-1 grid grid-cols-3">
                <div className="relative col-span-3 m-5 flex flex-row items-center justify-around rounded-lg bg-black/40">
                    {jokers.map((id) => (
                        <Joker key={id} id={id} />
                    ))}
                    <span className="absolute bottom-0 left-0 translate-x-2 translate-y-full text-sm text-white">
                        {jokers.length}/5
                    </span>
                </div>
            </div>
            <div className="col-span-3 row-span-1 grid grid-cols-3">
                <div className="col-span-3 m-5 flex flex-row items-center justify-center sm:gap-5 md:gap-10">
                    {playedCard.map((card) => (
                        <motion.div
                            key={card.name + card.type}
                            layout
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 150,
                            }}
                        >
                            <Card data={card} className="bounceAnimation" />
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="col-span-3 row-span-1 grid grid-cols-1">
                <div className="col-span-1 mx-5 mb-5 grid grid-cols-5 gap-2">
                    <div className="col-span-4 flex flex-col items-center justify-around rounded-lg">
                        <div className="relative grid grid-cols-8 grid-rows-1 sm:w-[448px] md:w-[912px]">
                            {hands.map((card, index) => (
                                <motion.div
                                    key={card.name + card.type}
                                    layout
                                    transition={{
                                        type: 'spring',
                                        damping: 20,
                                        stiffness: 150,
                                    }}
                                    className={`col-span-1 col-start-${index + 1} sm:w-[56px] md:w-[114px]`}
                                    onClick={() => handleDrawCard(index)}
                                >
                                    <Card
                                        data={card}
                                        className={`moveAnimation ${card.selected && '-translate-y-1/3'}`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex w-full flex-row justify-center">
                            <div className="bg-blue flex flex-row justify-center">
                                <button
                                    onClick={handlePlayHand}
                                    className="rounded-[6px] bg-(--blue) text-nowrap text-white ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:m-2 sm:w-[100px] sm:p-3 sm:text-xl md:m-3 md:w-[150px] md:p-4 md:text-2xl"
                                >
                                    Play Hand
                                </button>

                                <div className="flex flex-col items-center justify-center rounded-[6px] text-white ring-3 ring-white sm:w-[150px] sm:py-1 md:my-4 md:w-[200px] md:py-2">
                                    <h4>Sort Hand</h4>
                                    <div className="flex flex-row items-center justify-between">
                                        <button
                                            className="mt-2 mr-2 rounded-[6px] bg-(--orange) p-1 sm:w-[50px] md:w-[70px]"
                                            onClick={() => sortHand('Rank')}
                                        >
                                            Rank
                                        </button>
                                        <button
                                            className="mt-2 ml-2 rounded-[6px] bg-(--orange) p-1 sm:w-[50px] md:w-[70px]"
                                            onClick={() => sortHand('Suit')}
                                        >
                                            Suit
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDiscard}
                                    className="rounded-[6px] bg-(--red) text-nowrap text-white ring-3 shadow-xl ring-transparent transition-all ease-in-out hover:ring-white sm:m-2 sm:w-[100px] sm:p-3 sm:text-xl md:m-3 md:w-[150px] md:p-4 md:text-2xl"
                                >
                                    Discard
                                </button>
                            </div>
                        </div>
                    </div>
                    <StackCard remaining={deck.length} />
                </div>
            </div>
        </div>
    )
}
