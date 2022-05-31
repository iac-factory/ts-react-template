import {useEffect} from "react";

const Content = ({ID, state}) => {
    return (
        <iframe id={ID} data-state={String(state[0])}/>
    )
};

/*****
 *
 * @param previewID {string}
 * @param url {string}
 * @param state
 * @returns {JSX.Element}
 * @constructor
 *
 */

const Component = ({previewID, url, state}) => {
    console.debug("Page Load Event", "I-Frame Component");

    useEffect(() => {
        require("axios").get(url).then((response) => {
            let content;

            const iframe = document.getElementById(previewID);

            content = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);

            require("axios").get(url).then((data) => {
                content.document.open();
                content.document.write(data.data);
                content.document.close();
            });

            state[1](true);
        });
    }, []);


    return (
        <Content ID={previewID} state={state}/>
    )
};

export default Component;
