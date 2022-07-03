const plugins = [];
if (process.env.NODE_ENV === "test") {
  plugins.push("require-context-hook");
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
