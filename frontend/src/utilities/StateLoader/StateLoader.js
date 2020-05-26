class StateLoader {

  loadState() {
    try {
      let serializedState = localStorage.getItem('store');
  
      if (serializedState === null) {
        return this.initializeState(); 
      }
  
      return JSON.parse(serializedState);
    } catch (error) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem('store', serializedState);
    } catch (error) {
      
    }
  }

  initializeState() {
    return {
      user: {
        name: '',
        email: '',
        avatar: '',
        about: '',
        googleId: '',
        facebookId: '',
        followers: [],
        following: [],
      },
        challenges: [],
        loading: false,
    }
  }
}

export default StateLoader;
