export type CardName = 'Ace' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six' | 'Seven' | 'Eight' | 'Nine' | 'Ten' | 'Jack' | 'Queen' | 'King';
export type CardType = 'Heart' | 'Diamond' | 'Club' | 'Spade';
export type Card = {
    name: CardName;
    type: CardType;
    point: number;
    x_index: number;
    y_index: number;
    selected?: boolean;
}