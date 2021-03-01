module.exports = function babel(api) {
 api.cache(true);
   return {
     presets: ["@babel/preset-env", "@babel/preset-react",  "module:metro-react-native-babel-preset"],
       plugins: ["@babel/plugin-proposal-class-properties"],
   };
 };
