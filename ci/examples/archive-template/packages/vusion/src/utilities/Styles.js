const flatten = (obj, roots = [], sep = ".") => {
    const Element = Object
        // find props of given object
        .keys(obj)
        // return an object by iterating props
        .reduce((memo, prop) => Object.assign(
            // create a new object
            {},
            // include previously returned object
            memo,
            Object.prototype.toString.call(obj[prop]) === "[object Object]"
                // keep working if value is an object
                ? flatten(obj[prop], roots.concat([prop]), sep)
                // include current prop and value and prefix prop with the roots
                : { [roots.concat([prop]).join(sep)]: obj[prop] }
        ), {});

    Element.iterable = Object.entries(Element);

    if (process.env.NODE_ENV !== "production") console.debug("[DEBUG]", "Style Utility", Element.iterable[0][1]);

    return Element;
};

const Default = (module) => {
    const Export = flatten(module);

    return {
        Object: Export,
        Enumeration: Export.iterable,
        Name: {
            Base: Export.iterable[0][0],
            Unique: Export.iterable[0][1]
        }
    };
};

export default Default;
