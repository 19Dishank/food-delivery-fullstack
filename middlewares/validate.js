const validate = validations => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
    }
    next();
  };
};
module.exports = validate;







// function validate(req, res, next) {
//   const result = validationResult(req);
//   console.log(result.isEmpty());// true if there are no errors
//   if (!result.isEmpty()) {
//     console.log(result.array());
//     return res.status(422).json({ errors: result.array() });
//   }
//   next();
// }
