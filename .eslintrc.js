module.exports = {
  plugins: ["sql"],
  rules: {
    "sql/format": [
      "error",
      {
        ignoreExpressions: false,
        ignoreInline: true,
        ignoreTagless: true,
      },
    ],
  },
};
