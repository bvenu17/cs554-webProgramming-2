const jsonData = require('./lab5.json');

getById = ((id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // find project
        if (jsonData) {
            resolve(jsonData[id - 1]);
        } else {
            reject(new Error("Timedout. Make sure it is a proper ID"));
        }}, 5000);
      });
})

module.exports ={
  getById
}
