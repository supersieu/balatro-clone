import { Card, CardName, CardType } from "../../type";
import { jokers } from '../../assets/jokers'

export type CardProperties = {
    name: CardName;
    point: number;
    x_index: number;
}
type CardTypes = {
    type: CardType;
    y_index: number;
}

export type HandEvaluation = {
    title: string;
    chips: number;
    mult: number;
    scoredCards?: Card[];
    lvl: number;
};

type props = {
    hand: Card[]
    allHands: Card[]
    discard: number
    handRemaining: number
    money: number
    jokers: number[]
}

class CardFactory {
    card_properties: CardProperties[] = [
        { name: 'Two', point: 2, x_index: 0 },
        { name: 'Three', point: 3, x_index: 1 },
        { name: 'Four', point: 4, x_index: 2 },
        { name: 'Five', point: 5, x_index: 3 },
        { name: 'Six', point: 6, x_index: 4 },
        { name: 'Seven', point: 7, x_index: 5 },
        { name: 'Eight', point: 8, x_index: 6 },
        { name: 'Nine', point: 9, x_index: 7 },
        { name: 'Ten', point: 10, x_index: 8 },
        { name: 'Jack', point: 10, x_index: 9 },
        { name: 'Queen', point: 10, x_index: 10 },
        { name: 'King', point: 10, x_index: 11 },
        { name: 'Ace', point: 11, x_index: 12 }
    ];

    card_types: CardTypes[] = [
        { type: 'Heart', y_index: 0 },
        { type: 'Club', y_index: 1 },
        { type: 'Diamond', y_index: 2 },
        { type: 'Spade', y_index: 3 }
    ];

    levels = {
        'Royal Flush': 0,
        'Straight Flush': 0,
        'Four of a Kind': 0,
        'Full House': 0,
        'Flush': 0,
        'Straight': 0,
        'Three of a Kind': 0,
        'Two Pair': 0,
        'One Pair': 0,
        'High Card': 0
    }

    incrementLevel(level: keyof typeof this.levels) {
        this.levels[level] += 1;
    }

    createCard(name: CardName, type: CardType): Card {
        const cardProperty = this.card_properties.find(card => card.name === name);
        const cardType = this.card_types.find(card => card.type === type);
        return {
            name,
            type,
            point: cardProperty?.point ?? 0,
            x_index: cardProperty?.x_index ?? 0,
            y_index: cardType?.y_index ?? 0,
            selected: false
        };
    }

    createDeck(): Card[] {
        const deck: Card[] = [];
        for (const cardProperty of this.card_properties) {
            for (const cardType of this.card_types) {
                deck.push(this.createCard(cardProperty.name, cardType.type));
            }
        }
        return deck;
    }

    evaluateHand(props: props): HandEvaluation {
        const j = jokers.filter(j => props.jokers.includes(j.id));

        const hand = [...props.hand];
        if (hand.length === 0) {
            return { title: 'None', chips: 0, mult: 0, scoredCards: [], lvl: 0 };
        }

        // Trier la main par valeur (x_index) pour faciliter l'analyse
        hand.sort((a, b) => a.x_index - b.x_index);

        // Regrouper par valeur et par couleur
        const valueCount: Record<number, number> = {};
        const suitCount: Record<number, number> = {};

        for (const card of hand) {
            valueCount[card.x_index] = (valueCount[card.x_index] || 0) + 1;
            suitCount[card.y_index] = (suitCount[card.y_index] || 0) + 1;
        }

        const uniqueValues = Object.keys(valueCount).map(Number).sort((a, b) => a - b);

        const isFlush = hand.length === 5 && hand.every(card => card.y_index === hand[0].y_index);
        const isStraight = uniqueValues.length === 5 && uniqueValues[4] - uniqueValues[0] === 4;
        const hasAceLowStraight = uniqueValues.join(',') === '0,1,2,3,12'; // Cas spécial A-2-3-4-5
        const isRoyalFlush = isFlush && uniqueValues.join(',') === '8,9,10,11,12'; // 10-J-Q-K-A

        const counts = Object.values(valueCount).sort((a, b) => b - a);

        let scoredCards: Card[] = [];
        if (isRoyalFlush) {
            scoredCards = hand;
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 100) * 1.1 ** this.levels['Royal Flush']);
            let mult = Math.round(100 * 1.1 ** this.levels['Royal Flush']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Royal Flush',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Royal Flush', chips, mult, scoredCards, lvl: this.levels['Royal Flush'] };
        } else if (isFlush && (isStraight || hasAceLowStraight)) {
            scoredCards = hand;
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 50) * 1.1 ** this.levels['Straight Flush']);
            let mult = Math.round(50 * 1.1 ** this.levels['Straight Flush']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Straight Flush',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Straight Flush', chips, mult, scoredCards, lvl: this.levels['Straight Flush'] };
        } else if (counts.includes(4)) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 4) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 40) * 1.1 ** this.levels['Four of a Kind']);
            let mult = Math.round(40 * 1.1 ** this.levels['Four of a Kind']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Four of a Kind',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Four of a Kind', chips, mult, scoredCards, lvl: this.levels['Four of a Kind'] };
        } else if (counts.includes(3) && counts.includes(2)) {
            scoredCards = hand;
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 35) * 1.1 ** this.levels['Full House']);
            let mult = Math.round(35 * 1.1 ** this.levels['Full House']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Full House',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Full House', chips, mult, scoredCards, lvl: this.levels['Full House'] };
        } else if (isFlush) {
            scoredCards = hand;
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 30) * 1.1 ** this.levels['Flush']);
            let mult = Math.round(30 * 1.1 ** this.levels['Flush']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Flush',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Flush', chips, mult, scoredCards, lvl: this.levels['Flush'] };
        } else if (isStraight || hasAceLowStraight) {
            scoredCards = hand;
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 25) * 1.1 ** this.levels['Straight']);
            let mult = Math.round(25 * 1.1 ** this.levels['Straight']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Straight',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Straight', chips, mult, scoredCards, lvl: this.levels['Straight'] };
        } else if (counts.includes(3)) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 3) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 20) * 1.1 ** this.levels['Three of a Kind']);
            let mult = Math.round(20 * 1.1 ** this.levels['Three of a Kind']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Three of a Kind',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Three of a Kind', chips, mult, scoredCards, lvl: this.levels['Three of a Kind'] };
        } else if (counts.filter(c => c === 2).length === 2) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 2) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 15) * 1.1 ** this.levels['Two Pair']);
            let mult = Math.round(15 * 1.1 ** this.levels['Two Pair']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'Two Pair',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'Two Pair', chips, mult, scoredCards, lvl: this.levels['Two Pair'] };
        } else if (counts.includes(2)) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 2) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 10) * 1.1 ** this.levels['One Pair']);
            let mult = Math.round(10 * 1.1 ** this.levels['One Pair']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'One Pair',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'One Pair', chips, mult, scoredCards, lvl: this.levels['One Pair'] };
        } else {
            scoredCards = [hand[hand.length - 1]];
            let chips = Math.round(scoredCards.reduce((acc, card) => acc + card.point, 5) * 1.1 ** this.levels['High Card']);
            let mult = Math.round(5 * 1.1 ** this.levels['High Card']);
            j.forEach(joker => {
                const { chips: c, mult: m } = joker.fn({
                    hand: props.allHands,
                    played: hand,
                    discard: props.discard,
                    handRemaining: props.handRemaining,
                    money: props.money,
                    card_properties: this.card_properties,
                    mult: mult,
                    chips: chips,
                    title: 'High Card',
                    scoredCards: scoredCards,
                });
                chips = Math.round(c);
                mult = Math.round(m);
            });
            return { title: 'High Card', chips, mult, scoredCards, lvl: this.levels['High Card'] };
        }
    }
}

export default new CardFactory();