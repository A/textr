export default ()=> {
  let mws = [];
  const parse = (text)=> mws.reduce((text, mw) => mw(text), text);
  parse.use = (mw) => {
    mws.push(mw);
    return parse;
  }

  return parse;
}
