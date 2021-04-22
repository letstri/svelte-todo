import { writable, readable } from 'svelte/store';

export const user = writable({ name: '' });

export const userName = readable('', (set) => {
  const unsubscribe = user.subscribe((value) => {
    set(value.name);
  });

  return () => {
    unsubscribe();
  };
});
