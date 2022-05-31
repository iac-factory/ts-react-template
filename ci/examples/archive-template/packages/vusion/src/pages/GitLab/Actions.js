import { Requestable } from "./../../pages/Development/Code-Snippet-Awaitable/Page";

/***
 *
 * @param id
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

export const Variables = ({ id }) => {
    const Token = process.env.REACT_APP_GITLAB_TOKEN;
    const URL = [ process.env.REACT_APP_GITLAB_PROJECTS_URL, id, "variables" ].join("/");

    const Headers = {
        "PRIVATE-TOKEN": Token
    };

    return (<Requestable headers={ Headers } url={ URL }/>);
};