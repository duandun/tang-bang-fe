let console = window.console;
const LogLevel = {
  'debug': 1,
  'info': 2,
  'log': 3
}
let debugLevel = window.localStorage.debugLevel || 'log';
let level = LogLevel[debugLevel];
console.info('current LogLevel: %s', debugLevel);

let emptyFun = function() {};

const rlog = {
  debug: level <= LogLevel['debug'] ? console.debug : emptyFun,
  info: level <= LogLevel['info'] ? console.info : emptyFun,
  log: level <= LogLevel['log'] ? console.log : emptyFun,
  warn: console.warn,
  error: console.error
};

export default rlog;
