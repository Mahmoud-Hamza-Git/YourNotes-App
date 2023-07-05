module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); //next here is an ananmous function that will be executed when catch executed and will pass any parameters to it(err parameter)
  };
};
