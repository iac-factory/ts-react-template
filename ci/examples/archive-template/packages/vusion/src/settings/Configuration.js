import { settings } from "carbon-components";

// import { pkg as Cognitive } from "@carbon/ibm-cloud-cognitive";

import * as Features from "@carbon/feature-flags";

settings.prefix = "cds";

//Cognitive.prefix = "cds";

Features.merge({
    "enable-css-custom-properties": true,
    "enable-use-controlled-state-with-value": true,
    "enable-css-grid": true,
    "enable-v11-release": true
});

export default {
    ... settings, ... {
        Prefix: "io"
    }
};

/***
 *
 * @param feature {String}
 * @returns {Boolean}
 * @constructor
 */

export const Enabled = (feature) => Features.enabled(feature);

export const Flags = Features.FeatureFlags;

if ( process.env.NODE_ENV !== "production" ) console.debug({ Flags: Features.FeatureFlags });
