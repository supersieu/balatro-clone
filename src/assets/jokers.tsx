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
    },
    {
        id: 16,
        joker: 'Half Joker',
        effect: effectTextColorized(
            '+20 Mult if played hand contains 3 or fewer cards.'
        ),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 7,
        y_index: 0,
    },
    {
        id: 17,
        joker: 'Banner',
        effect: effectTextColorized('+30 Chips for each remaining discard'),
        cost: '$5',
        rarity: 'Common',
        type: '+c',
        activation: 'Indep',
        x_index: 1,
        y_index: 2,
    },
    {
        id: 18,
        joker: 'Mystic Summit',
        effect: effectTextColorized('+15 Mult when 0 discards remaining'),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 2,
        y_index: 2,
    },
    {
        id: 19,
        joker: 'Misprint',
        effect: effectTextColorized('+0-23 Mult'),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        x_index: 6,
        y_index: 2,
    },
    {
        id: 20,
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
    },
    {
        id: 21,
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
    },
    {
        id: 22,
        joker: 'Abstract Joker',
        effect: effectTextColorized('+3 Mult for each Joker card'),
        cost: '$4',
        rarity: 'Common',
        type: '+m',
        activation: 'Indep',
        current_stack: 0,
        x_index: 3,
        y_index: 3,
    },
    {
        id: 23,
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
    },
    {
        id: 24,
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
    },
    {
        id: 25,
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
    },
    {
        id: 26,
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
    },
    {
        id: 27,
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
    },
    {
        id: 28,
        joker: 'Card Sharp',
        effect: effectTextColorized(
            'X3 Mult if played poker hand has already been played this round'
        ),
        cost: '$6',
        rarity: 'Uncommon',
        type: 'Xm',
        activation: 'Indep',
        x_index: 6,
        y_index: 11,
    },
    {
        id: 29,
        joker: 'Baron',
        effect: effectTextColorized('Each King held in hand gives X1.5 Mult'),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'OnHeld',
        x_index: 6,
        y_index: 12,
    },
    {
        id: 30,
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
    },
    {
        id: 31,
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
    },
    {
        id: 32,
        joker: 'Acrobat',
        effect: effectTextColorized('X3 Mult on final hand of round'),
        cost: '$6',
        rarity: 'Uncommon',
        type: 'Xm',
        activation: 'Indep',
        x_index: 2,
        y_index: 1,
    },
    {
        id: 33,
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
    },
    {
        id: 34,
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
    },
    {
        id: 35,
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
    },
    {
        id: 36,
        joker: 'The Duo',
        effect: effectTextColorized('X2 Mult if played hand contains a Pair'),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 5,
        y_index: 4,
    },
    {
        id: 37,
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
    },
    {
        id: 38,
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
    },
    {
        id: 39,
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
    },
    {
        id: 40,
        joker: 'The Tribe',
        effect: effectTextColorized('X2 Mult if played hand contains a Flush'),
        cost: '$8',
        rarity: 'Rare',
        type: 'Xm',
        activation: 'Indep',
        x_index: 9,
        y_index: 4,
    },
    {
        id: 41,
        joker: 'Stuntman',
        effect: effectTextColorized('+250 Chips,-2 hand size'),
        cost: '$7',
        rarity: 'Rare',
        type: '+c',
        activation: 'Indep',
        x_index: 8,
        y_index: 6,
    },
    {
        id: 42,
        joker: 'Shoot the Moon',
        effect: effectTextColorized('Each Queen held in hand gives +13 Mult'),
        cost: '$5',
        rarity: 'Common',
        type: '+m',
        activation: 'OnHeld',
        x_index: 2,
        y_index: 6,
    },
    {
        id: 43,
        joker: 'Bootstraps',
        effect: effectTextColorized('+2 Mult for every $5 you have'),
        cost: '$7',
        rarity: 'Uncommon',
        type: '+m',
        activation: 'Indep',
        current_stack: 0,
        x_index: 9,
        y_index: 8,
    },
    {
        id: 44,
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
    },
]
