import { writable } from 'svelte/store';
import { LIST_NAME } from '../constants';
import type ITodo from '../interfaces/ITodo';

const createList = () => {
  const { subscribe, update, set } = writable<Array<ITodo>>(JSON.parse(window.localStorage.getItem(LIST_NAME) || '[]'));

  return {
    subscribe,
    set: (value: Array<ITodo>) => {
      window.localStorage.setItem(LIST_NAME, JSON.stringify(value));
      set(value);
    },
    add: (item: ITodo) => update((value) => {
      window.localStorage.setItem(LIST_NAME, JSON.stringify([item, ...value]));
      return [item, ...value];
    }),
    remove: (id: number) => update((value) => {
      window.localStorage.setItem(LIST_NAME, JSON.stringify(value.filter((i) => i.id !== id)));
      return value.filter((i) => i.id !== id);
    }),
    removeAll() {
      window.localStorage.setItem(LIST_NAME, '[]');
      set([]);
    },
  };
};

export const list = createList();

const createSelection = () => {
  const { subscribe, update, set } = writable<Array<number>>([]);

  list.subscribe((value) => {
    const listIds = value.map((t) => t.id);

    update((selection) => selection.filter((item) => listIds.includes(item)));
  });

  return {
    subscribe,
    add: (id: number) => update((value) => [...value, id]),
    remove: (id: number) => update((value) => value.filter((item) => item !== id)),
    removeAll: () => set([]),
  };
};

export const selection = createSelection();
