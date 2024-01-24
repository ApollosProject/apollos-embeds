module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  plugins: ["simple-import-sort", "import"],
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "**",
            group: "external",
            position: "after",
          },
          {
            pattern: "./**",
            group: "sibling",
            position: "after",
          },
          {
            pattern: "../**",
            group: "parent",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "lines-around-comment": [
      "error",
      {
        allowArrayStart: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    "spaced-comment": ["error", "always"],
  },
};
