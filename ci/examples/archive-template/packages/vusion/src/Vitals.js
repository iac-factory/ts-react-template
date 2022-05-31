const Logger = ($) => {
    switch ($.name) {
        case "FCP":
            console.debug("First-Contentful-Paint", { ... $, ... { description: "First-Contentful-Paint" } });
            return { ... $, ... { description: "First-Contentful-Paint" } };
        case "CLS":
            console.debug("Cumulative-Layout-Shift", { ... $, ... { description: "Cumulative-Layout-Shift" } });
            return { ... $, ... { description: "Cumulative-Layout-Shift" } };
        case "LCP":
            console.debug("Largest-Contentful-Paint", { ... $, ... { description: "Largest-Contentful-Paint" } });
            return { ... $, ... { description: "Largest-Contentful-Paint" } };
        case "TTFB":
            console.debug("Time-to-First-Byte", { ... $, ... { description: "Time-to-First-Byte" } });
            return { ... $, ... { description: "Time-to-First-Byte" } };
        case "FID":
            console.debug("First-Input-Delay", { ... $, ... { description: "First-Input-Delay" } });
            return { ... $, ... { description: "First-Input-Delay" } };
    }
};

/***
 *
 * @return {Promise<{"First-Input-Delay": *, "Time-to-First-Byte": *, "Cumulative-Layout-Shift": *, "First-Contentful-Paint": *, "Largest-Contentful-Paint": *}>}
 * @constructor
 */

const Profile = () =>
    import("web-vitals").then((
            { getCLS, getFID, getFCP, getLCP, getTTFB }
        ) => {
            return {
                "First-Contentful-Paint": getFCP(Logger, false),
                "Cumulative-Layout-Shift": getCLS(Logger, false),
                "Largest-Contentful-Paint": getLCP(Logger, false),
                "Time-to-First-Byte": getTTFB(Logger, false),
                "First-Input-Delay": getFID(Logger, false)
            };
        }
    );

export default Profile;
