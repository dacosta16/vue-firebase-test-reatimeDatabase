import firebase from "../firebase";

const db = firebase.ref("/data");

class DataService {
    getAll() {
      return db;
    }
  
    create(data) {
      return db.push(data);
    }
  
  }
  
  export default new DataService();