import { Card, CardName, CardType } from "../../type";

type CardProperties = {
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
};

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

    evaluateHand(hands: Card[]): HandEvaluation {
        const hand = [...hands];
        if (hand.length === 0) {
            return { title: 'None', chips: 0, mult: 0, scoredCards: [] };
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

        let scoredCards = [];
        if (isRoyalFlush) {
            scoredCards = hand;
            return { title: 'Royal Flush', chips: 100, mult: 100, scoredCards };
        } else if (isFlush && (isStraight || hasAceLowStraight)) {
            scoredCards = hand;
            return { title: 'Straight Flush', chips: 50, mult: 50, scoredCards };
        } else if (counts.includes(4)) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 4) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            return { title: 'Four of a Kind', chips: 40, mult: 40, scoredCards };
        } else if (counts.includes(3) && counts.includes(2)) {
            scoredCards = hand;
            return { title: 'Full House', chips: 35, mult: 35, scoredCards };
        } else if (isFlush) {
            scoredCards = hand;
            return { title: 'Flush', chips: 30, mult: 30, scoredCards };
        } else if (isStraight || hasAceLowStraight) {
            scoredCards = hand;
            return { title: 'Straight', chips: 25, mult: 25, scoredCards };
        } else if (counts.includes(3)) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 3) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            return { title: 'Three of a Kind', chips: 20, mult: 20, scoredCards };
        } else if (counts.filter(c => c === 2).length === 2) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 2) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            return { title: 'Two Pair', chips: 15, mult: 15, scoredCards };
        } else if (counts.includes(2)) {
            const tab: Card[] = []
            hand.forEach(card => {
                if (hand.filter(c => c.x_index === card.x_index).length === 2) {
                    tab.push(card)
                }
            })
            scoredCards = tab
            return { title: 'One Pair', chips: 10, mult: 10, scoredCards };
        } else {
            scoredCards = [hand[hand.length - 1]];
            return { title: 'High Card', chips: 5, mult: 5, scoredCards };
        }
    }
}

export default new CardFactory();