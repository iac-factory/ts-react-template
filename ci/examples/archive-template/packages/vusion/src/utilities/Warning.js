const emptyFunction = function () {
};

const warning = (__DEV__) ? function warning(condition, format, ...args) {
    if (format === undefined) {
        throw new Error(
            '`warning(condition, format, ...args)` requires a warning ' +
            'format argument'
        );
    }
    if (!condition) {
        let index = 0;
        const message = format.replace(/%s/g, () => {
            return args[index++];
        });

        console.warn('Warning: ' + message);
    }
} : emptyFunction;

export {warning};
