export * from "./index";

import { normalize } from "./normalize";
import { formalize } from "./menu-item";

export module Strings {
    export const Normalize = normalize;
    export const Formalize = formalize;
}

export default Strings;