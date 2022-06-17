// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Item = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

export type cartType = {
  cart: Item[];
  loading: boolean;
};

export type countType = {
  count: number;
};

export interface countInter {
  count: countType;
}

export interface cartInter {
  cart: cartType;
}

export type Something = {
  text: string;
  important?: boolean;
};
