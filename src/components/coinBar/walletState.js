// walletState.js
const Wallet = {
    delfir: 800,
    ditcoin: 0,
    ficha: 0,
  
    get(type) {
      return this[type] || 0;
    },
  
    set(type, value) {
      if (this.hasOwnProperty(type)) {
        this[type] = value;
      }
    },
  
    add(type, value) {
      if (this.hasOwnProperty(type)) {
        this[type] += value;
      }
    },
  
    reset() {
      this.delfir = 800;
      this.ditcoin = 0;
      this.ficha = 0;
    }
  };
  
  export default Wallet;
  