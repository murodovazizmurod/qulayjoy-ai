import store from 'store2';

const storageAPI = (type: 'local' | 'session') => ({
  get: (key: string) => store[type].get(key),
  remove: (key: string) => store[type].remove(key),
  set: (key: string, value: any) => store[type].set(key, value)
});

const storage = {
  local: storageAPI('local'),
  session: storageAPI('session')
};

export default storage;
