module.exports = {
  plugins: [
    // ...
    "react-hooks"
  ],
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true
  },
  rules: {
    // 组件必须有 displayName 属性
    // @off 不强制要求写 displayName
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
