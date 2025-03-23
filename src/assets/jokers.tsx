import { CardProperties } from '../components/card/CardFactory'
import { Card } from '../type'

const effectTextColorized = (effect: string) => {
    const regex = /([+X]\d+(\.\d+)?)/g
    const parts = effect.split(' ')
    return parts.map((part, index) => {
        if (regex.test(part)) {
            const isMult = parts[index + 1] === 'Mult'
            const isChips = parts[index + 1] === 'Chips'
            return (
                <span
                    key={index}
                    className={`rounded-[2px] ${isMult ? 'bg-(--red)' : isChips ? 'bg-(--blue)' : ''} p-[1px] text-white`}
                >
                    {part}
                </span>
            )
        }
        return ' ' + part + ' '
    })
}

type props = {
    hand: Card[]
    played: Card[]
    discard: number
    handRemaining: number
    money: number
    card_properties: CardProperties[]
    mult: number
    chips: number
    title: string
    scoredCards: Card[]
}

export const jokers = [
    {
        id: 1,
        joker: 'Joker',
        effect: effectTextColorized('+4 Mult'),
        cost: '$2',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 0,
        y_index: 0,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fn: (props: props) => {
            const { chips, mult } = props
            return { chips, mult: mult + 4 }
        },
    },
    {
        id: 2,
        joker: 'Greedy Joker',
        effect: effectTextColorized(
            'Played cards with Diamond suit give +3 Mult when scored'
        ),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'OnScored',
        x_index: 6,
        y_index: 1,
        fn: (props: props) => {
            const { played, chips, mult } = props
            const diamonds = played.filter((card) => card.y_index === 2).length
            return { chips, mult: 3 * diamonds + mult }
        },
    },
    {
        id: 3,
        joker: 'Lusty Joker',
        effect: effectTextColorized(
            'Played cards with Heart suit give +3 Mult when scored'
        ),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'OnScored',
        x_index: 7,
        y_index: 1,
        fn: (props: props) => {
            const { played, chips, mult } = props
            const heart = played.filter((card) => card.y_index === 0).length
            return { chips, mult: 3 * heart + mult }
        },
    },
    {
        id: 4,
        joker: 'Wrathful Joker',
        effect: effectTextColorized(
            'Played cards with Spade suit give +3 Mult when scored'
        ),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'OnScored',
        x_index: 8,
        y_index: 1,
        fn: (props: props) => {
            const { played, chips, mult } = props
            const spade = played.filter((card) => card.y_index === 3).length
            return { chips, mult: 3 * spade + mult }
        },
    },
    {
        id: 5,
        joker: 'Gluttonous Joker',
        effect: effectTextColorized(
            'Played cards with Club suit give +3 Mult when scored'
        ),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'OnScored',
        x_index: 9,
        y_index: 1,
        fn: (props: props) => {
            const { played, chips, mult } = props
            const club = played.filter((card) => card.y_index === 1).length
            return { chips, mult: 3 * club + mult }
        },
    },
    {
        id: 6,
        joker: 'Jolly Joker',
        effect: effectTextColorized('+8 Mult if played hand contains a Pair'),
        cost: '$3',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 2,
        y_index: 0,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const pair = title === 'One Pair' ? 1 : 0
            return { chips, mult: 8 * pair + mult }
        },
    },
    {
        id: 7,
        joker: 'Zany Joker',
        effect: effectTextColorized(
            '+12 Mult if played hand contains a Three of a Kind'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 3,
        y_index: 0,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const three = title === 'Three of a Kind' ? 1 : 0
            return { chips, mult: 12 * three + mult }
        },
    },
    {
        id: 8,
        joker: 'Mad Joker',
        effect: effectTextColorized(
            '+10 Mult if played hand contains a Two Pair'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 4,
        y_index: 0,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const twoPair = title === 'Two Pair' ? 1 : 0
            return { chips, mult: 10 * twoPair + mult }
        },
    },
    {
        id: 9,
        joker: 'Crazy Joker',
        effect: effectTextColorized(
            '+12 Mult if played hand contains a Straight'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 5,
        y_index: 0,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const Straight = title === 'Straight' ? 1 : 0
            return { chips, mult: 12 * Straight + mult }
        },
    },
    {
        id: 10,
        joker: 'Droll Joker',
        effect: effectTextColorized('+10 Mult if played hand contains a Flush'),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 6,
        y_index: 0,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const Flush = title === 'Flush' ? 1 : 0
            return { chips, mult: 10 * Flush + mult }
        },
    },
    {
        id: 11,
        joker: 'Sly Joker',
        effect: effectTextColorized('+50 Chips if played hand contains a Pair'),
        cost: '$3',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 0,
        y_index: 14,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const Pair = title === 'Pair' ? 1 : 0
            return { chips: 50 * Pair + chips, mult }
        },
    },
    {
        id: 12,
        joker: 'Wily Joker',
        effect: effectTextColorized(
            '+100 Chips if played hand contains a Three of a Kind'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 1,
        y_index: 14,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const Three = title === 'Three of a Kind' ? 1 : 0
            return { chips: 100 * Three + chips, mult }
        },
    },
    {
        id: 13,
        joker: 'Clever Joker',
        effect: effectTextColorized(
            '+80 Chips if played hand contains a Two Pair'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 2,
        y_index: 14,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const TwoPair = title === 'Two Pair' ? 1 : 0
            return { chips: 80 * TwoPair + chips, mult }
        },
    },
    {
        id: 14,
        joker: 'Devious Joker',
        effect: effectTextColorized(
            '+100 Chips if played hand contains a Straight'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 3,
        y_index: 14,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const Straight = title === 'Straight' ? 1 : 0
            return { chips: 100 * Straight + chips, mult }
        },
    },
    {
        id: 15,
        joker: 'Crafty Joker',
        effect: effectTextColorized(
            '+80 Chips if played hand contains a Flush'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 4,
        y_index: 14,
        fn: (props: props) => {
            const { title, chips, mult } = props
            const Flush = title === 'Flush' ? 1 : 0
            return { chips: 80 * Flush + chips, mult }
        },
    },
    {
        id: 16,
        joker: 'Banner',
        effect: effectTextColorized('+30 Chips for each remaining discard'),
        cost: '$5',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 1,
        y_index: 2,
        fn: (props: props) => {
            const { discard, chips, mult } = props
            return { chips: 30 * discard + chips, mult }
        },
    },
    {
        id: 17,
        joker: 'Mystic Summit',
        effect: effectTextColorized('+15 Mult when 0 discards remaining'),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 2,
        y_index: 2,
        fn: (props: props) => {
            const { discard, chips, mult } = props
            const isZeroDiscard = discard === 0 ? 1 : 0
            return { chips: 15 * isZeroDiscard + chips, mult }
        },
    },
    {
        id: 18,
        joker: 'Misprint',
        effect: effectTextColorized('+0-23 Mult'),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 6,
        y_index: 2,
        fn: (props: props) => {
            const { chips, mult } = props
            const randomMult = Math.floor(Math.random() * 23) + 1
            return { chips, mult: randomMult + mult }
        },
    },
    {
        id: 19,
        joker: 'Fibonacci',
        effect: effectTextColorized(
            'Each played Ace, 2, 3, 5, or 8 gives +8 Mult when scored'
        ),
        cost: '$8',
        rarity: 'Uncommon',
        type: '+m',
        activation: 'OnScored',
        x_index: 1,
        y_index: 5,
        fn: (props: props) => {
            const { chips, mult } = props
            const tab = [12, 0, 1, 3, 6]
            const played = props.played.filter((card) =>
                tab.includes(card.x_index)
            ).length
            return { chips, mult: 8 * played + mult }
        },
    },
    {
        id: 20,
        joker: 'Scary Face',
        effect: effectTextColorized(
            'Played face cards give +30 Chips when scored'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+c',
        activation: 'OnScored',
        x_index: 2,
        y_index: 3,
        fn: (props: props) => {
            const { chips, mult } = props
            const tab = [9, 10, 11]
            const played = props.played.filter((card) =>
                tab.includes(card.x_index)
            ).length
            return { chips: 30 * played + chips, mult }
        },
    },
    {
        id: 21,
        joker: 'StEveneven',
        effect: effectTextColorized(
            'Played cards with even rank give +4 Mult when scored  (10, 8, 6, 4, 2)'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'OnScored',
        x_index: 8,
        y_index: 3,
        fn: (props: props) => {
            const { chips, mult } = props
            const tab = [0, 2, 4, 6, 8]
            const played = props.played.filter((card) =>
                tab.includes(card.x_index)
            ).length
            return { chips, mult: 4 * played + mult }
        },
    },
    {
        id: 22,
        joker: 'Odd Todd',
        effect: effectTextColorized(
            'Played cards with odd rank give +31 Chips when scored  (A, 9, 7, 5, 3)'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+c',
        activation: 'OnScored',
        x_index: 9,
        y_index: 3,
        fn: (props: props) => {
            const { chips, mult } = props
            const tab = [1, 3, 5, 7, 12]
            const played = props.played.filter((card) =>
                tab.includes(card.x_index)
            ).length
            return { chips: 31 * played + chips, mult }
        },
    },
    {
        id: 23,
        joker: 'Scholar',
        effect: effectTextColorized(
            'Played Aces give +20 Chips and +4 Mult when scored'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '++',
        activation: 'OnScored',
        x_index: 0,
        y_index: 4,
        fn: (props: props) => {
            const { chips, mult } = props
            const played = props.played.filter(
                (card) => card.x_index === 12
            ).length
            return { chips: 20 * played + chips, mult: 4 * played + mult }
        },
    },
    {
        id: 24,
        joker: 'Blackboard',
        effect: effectTextColorized(
            'X3 Mult if all cards held in hand are Spades or Clubs'
        ),
        cost: '$6',
        rarity: 'Uncommon',
        type: 'Xm',
        activation: 'Indep',
        x_index: 2,
        y_index: 10,
        fn: (props: props) => {
            const { chips, mult } = props
            const hand = props.hand.every(
                (card) => card.y_index === 3 || card.y_index === 1
            )
            return { chips, mult: hand ? mult * 3 : mult }
        },
    },
    {
        id: 25,
        joker: 'Hiker',
        effect: effectTextColorized(
            'Every played card permanently gains +5 Chips when scored'
        ),
        cost: '$5',
        rarity: 'Uncommon',
        type: '+c',
        activation: 'OnScored',
        x_index: 0,
        y_index: 11,
        fn: (props: props) => {
            const { chips, mult, card_properties, scoredCards } = props
            scoredCards.forEach((card) => {
                card_properties[card.x_index].point += 5
            })
            return { chips, mult }
        },
    },
    {
        id: 26,
        joker: 'Baron',
        effect: effectTextColorized('Each King held in hand gives X1.5 Mult'),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'OnHeld',
        x_index: 6,
        y_index: 12,
        fn: (props: props) => {
            const { chips, mult } = props
            const kings = props.hand.filter(
                (card) => card.x_index === 11
            ).length
            return { chips, mult: mult * 1.5 ** kings }
        },
    },
    {
        id: 27,
        joker: 'Photograph',
        effect: effectTextColorized(
            'First played face card gives X2 Mult when scored'
        ),
        cost: '$5',
        rarity: 'Common',
        type: 'Xm',
        activation: 'OnScored',
        x_index: 2,
        y_index: 13,
        fn: (props: props) => {
            const { chips, mult } = props
            const tab = [9, 10, 11]
            const played = props.played.filter((card) =>
                tab.includes(card.x_index)
            )
            const face = played.length > 0 ? 1 : 0
            return { chips, mult: face ? mult * 2 : mult }
        },
    },
    {
        id: 28,
        joker: 'Smiley Face',
        effect: effectTextColorized(
            'Played face cards give +5 Mult when scored'
        ),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'OnScored',
        x_index: 6,
        y_index: 15,
        fn: (props: props) => {
            const { chips, mult } = props
            const tab = [9, 10, 11]
            const played = props.played.filter((card) =>
                tab.includes(card.x_index)
            ).length
            return { chips, mult: 5 * played + mult }
        },
    },
    {
        id: 29,
        joker: 'Acrobat',
        effect: effectTextColorized('X3 Mult on final hand of round'),
        cost: '$6',
        rarity: 'Uncommon',
        type: 'Xm',
        activation: 'Indep',
        x_index: 2,
        y_index: 1,
        fn: (props: props) => {
            const { chips, mult } = props
            const finalHand = props.handRemaining === 1 ? 1 : 0
            return { chips, mult: finalHand ? mult * 3 : mult }
        },
    },
    {
        id: 30,
        joker: 'Arrowhead',
        effect: effectTextColorized(
            'Played cards with Spade suit give +50 Chips when scored'
        ),
        cost: '$7',
        rarity: 'Uncommon',
        type: '+c',
        activation: 'OnScored',
        x_index: 1,
        y_index: 8,
        fn: (props: props) => {
            const { chips, mult } = props
            const played = props.played.filter(
                (card) => card.y_index === 3
            ).length
            return { chips: 50 * played + chips, mult }
        },
    },
    {
        id: 31,
        joker: 'Onyx Agate',
        effect: effectTextColorized(
            'Played cards with Club suit give +7 Mult when scored'
        ),
        cost: '$7',
        rarity: 'Uncommon',
        type: '+m',
        activation: 'OnScored',
        x_index: 2,
        y_index: 8,
        fn: (props: props) => {
            const { chips, mult } = props
            const played = props.played.filter(
                (card) => card.y_index === 1
            ).length
            return { chips, mult: 7 * played + mult }
        },
    },
    {
        id: 32,
        joker: 'Flower Pot',
        effect: effectTextColorized(
            'X3 Mult if poker hand contains a Diamond card, Club card, Heart card, and Spade card'
        ),
        cost: '$6',
        rarity: 'Uncommon',
        type: 'Xm',
        activation: 'Indep',
        x_index: 0,
        y_index: 6,
        fn: (props: props) => {
            const { chips, mult } = props

            const Heart = props.hand.filter((card) => card.y_index === 0).length
            const Club = props.hand.filter((card) => card.y_index === 1).length
            const Diamond = props.hand.filter(
                (card) => card.y_index === 2
            ).length
            const Spade = props.hand.filter((card) => card.y_index === 3).length
            console.log([Heart, Club, Diamond, Spade])
            const hand = [Heart, Club, Diamond, Spade].every((card) => card > 0)
            return { chips, mult: hand ? mult * 3 : mult }
        },
    },
    {
        id: 33,
        joker: 'The Duo',
        effect: effectTextColorized('X2 Mult if played hand contains a Pair'),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 5,
        y_index: 4,
        fn: (props: props) => {
            const { chips, mult, title } = props
            const Pair = title === 'One Pair' ? 1 : 0
            return { chips, mult: mult * 2 ** Pair }
        },
    },
    {
        id: 34,
        joker: 'The Trio',
        effect: effectTextColorized(
            'X3 Mult if played hand contains a Three of a Kind'
        ),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 6,
        y_index: 4,
        fn: (props: props) => {
            const { chips, mult, title } = props
            const Three = title === 'Three of a Kind' ? 1 : 0
            return { chips, mult: mult * 3 ** Three }
        },
    },
    {
        id: 35,
        joker: 'The Family',
        effect: effectTextColorized(
            'X4 Mult if played hand contains a Four of a Kind'
        ),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 7,
        y_index: 4,
        fn: (props: props) => {
            const { chips, mult, title } = props
            const Four = title === 'Four of a Kind' ? 1 : 0
            return { chips, mult: mult * 4 ** Four }
        },
    },
    {
        id: 36,
        joker: 'The Order',
        effect: effectTextColorized(
            'X3 Mult if played hand contains a Straight'
        ),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 8,
        y_index: 4,
        fn: (props: props) => {
            const { chips, mult, title } = props
            const Straight = title === 'Straight' ? 1 : 0
            return { chips, mult: mult * 3 ** Straight }
        },
    },
    {
        id: 37,
        joker: 'The Tribe',
        effect: effectTextColorized('X2 Mult if played hand contains a Flush'),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 9,
        y_index: 4,
        fn: (props: props) => {
            const { chips, mult, title } = props
            const Flush = title === 'Flush' ? 1 : 0
            return { chips, mult: mult * 2 ** Flush }
        },
    },
    {
        id: 38,
        joker: 'Shoot the Moon',
        effect: effectTextColorized('Each Queen held in hand gives +13 Mult'),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'OnHeld',
        x_index: 2,
        y_index: 6,
        fn: (props: props) => {
            const { chips, mult } = props
            const queens = props.hand.filter(
                (card) => card.x_index === 10
            ).length
            return { chips, mult: 13 * queens + mult }
        },
    },
    {
        id: 39,
        joker: 'Bootstraps',
        effect: effectTextColorized('+2 Mult for every $5 you have'),
        cost: '$7',
        rarity: 'Uncommon',
        type: '+m',
        activation: 'Indep',
        x_index: 9,
        y_index: 8,
        fn: (props: props) => {
            const { chips, mult, money } = props
            const current_stack = Math.floor(money / 5)
            return { chips, mult: 2 * current_stack + mult }
        },
    },
    {
        id: 40,
        joker: 'Triboulet',
        effect: effectTextColorized(
            'Played Kings and Queens each give X2 Mult when scored'
        ),
        cost: '$20',
        rarity: 'Legendary',
        type: 'Xm',
        activation: 'OnScored',
        x_index: 4,
        y_index: 9,
        fn: (props: props) => {
            const { chips, mult } = props
            const queens = props.played.filter(
                (card) => card.x_index === 10
            ).length
            const kings = props.played.filter(
                (card) => card.x_index === 11
            ).length
            const stack = queens > 0 && kings > 0 ? 2 : 1
            return { chips, mult: 2 * stack * mult }
        },
    },
]
