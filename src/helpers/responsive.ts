const {Dimensions} = require('react-native');

const {width, height} = Dimensions.get('screen');

const ww = (param:number) => {
  return width * param || width;
};
const wh = (param:number) => {
  return height * param || height;
};

export {ww, wh};
