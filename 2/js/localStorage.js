const localStorageObject = {
  save(data) {
      localStorage.setItem('todos', JSON.stringify(data));
  },
  load() {
      const data = localStorage.getItem('todos');
      return data ? JSON.parse(data) : [];
  }
};

export default localStorageObject;
