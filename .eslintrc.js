module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    //  git commit --no-verify -m “xxx” 跳过自动化测试 不建议
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
  },
};
