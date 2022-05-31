const emptyFunction = function () {};

const __DEV__ = process.env.NODE_ENV !== "production";

const warning = __DEV__
    ? function warning(condition, format, ... args) {
        if ( format === undefined ) {
            throw new Error(
                "`warning(condition, format, ...args)` requires a warning " +
                "format argument"
            );
        }
        if ( !condition ) {
            let index = 0;
            const message = format.replace(/%s/g, () => {
                return args[index++];
            });

            console.warn("Warning: " + message);
        }
    } : emptyFunction;

export { warning };

const didWarnAboutDeprecation = {};

export default function deprecate(propType, message) {
    function checker(props, propName, componentName, ... rest) {
        if ( props[propName] === undefined ) {
            return;
        }

        if (
            !didWarnAboutDeprecation[componentName] ||
            !didWarnAboutDeprecation[componentName][propName]
        ) {
            didWarnAboutDeprecation[componentName] = {
                ... didWarnAboutDeprecation[componentName],
                [propName]: true
            };

            warning(
                false,
                message ||
                `The prop \`${ propName }\` has been deprecated for the ` +
                `${ componentName } component. It will be removed in the next major ` +
                `release`
            );
        }

        return propType(props, propName, componentName, ... rest);
    }

    return checker;
}