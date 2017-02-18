const NONE = 'none';
const BLOCK = 'block';
const I_BLOCK = 'inline-block';

const display = (state = { display: 'none' }, action) => {
  switch (action.type) {
    case 'SHOW-BLOCK':
      return {
        display: BLOCK
       };
   case 'SHOW-I-BLOCK':
     return {
       display: I_BLOCK
      };
    case 'HIDE':
      return {
        display: NONE
       };
    default:
      return state;
  }
}
module.exports = display;
