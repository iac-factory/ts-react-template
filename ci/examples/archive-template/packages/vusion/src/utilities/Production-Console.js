export const isProduction = process.env.NODE_ENV === "production";
export const noop = () => undefined;
export const shimIfProduction = (fn) => (isProduction ? noop : fn);
export const log = shimIfProduction((... args) => console.log(... args));
export const warn = shimIfProduction((... args) => console.warn(... args));
export const error = shimIfProduction((... args) => console.error(... args));

export default {
    isProduction,
    noop,
    shimIfProduction,
    log,
    warn,
    error
};