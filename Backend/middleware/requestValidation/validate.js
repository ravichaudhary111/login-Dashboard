exports.validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], { abortEarly: false });
    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({ message: "Validation failed", status: 400, details });
    }
    next();
  };
};
