import React from "react";
import { useLocation } from "react-router-dom";
import { URLSearchParams } from "url";

/***
 *
 * @returns {URLSearchParams}
 *
 */

const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [ search ]);
};

export default useQuery;