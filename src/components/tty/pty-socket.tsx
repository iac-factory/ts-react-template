import React, { useState } from "react";
import { default as useWebSocket, ReadyState, resetGlobalState } from "react-use-websocket";

export const Socket = () => {
    const [connecting, setConnection] = useState(false);

    const [url, setURL] = useState("");

    const [ messageHistory, setMessageHistory ] = useState( [] );

    const {sendMessage, getWebSocket, readyState} = useWebSocket(url, {}, (url !== ""));

    (async () => {
        const socket  = getWebSocket();

        if (socket) socket.onopen = (event) => {
            console.log(event);
        };

        if (socket) socket.onmessage = async (data) => {
            const $ = await (new Response(data.data)).text();

            ($) && console.log($);
        };
    })();

    const handleClickSendMessage = async () => {
        const $ = await fetch( "https://localhost:3443/tty/terminal" ).then( async ( $ ) => {
            return await $.text();
        } );

        setURL(["ws://localhost:10500/tty/terminal", $].join("/"));
    };

    return (
        <div>
            {/* <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button> */ }
            <button onClick={ handleClickSendMessage } /* disabled={readyState !== ReadyState.OPEN}*/>
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently { connecting }</span>
            { ( messageHistory.length > 0 ) ? <span>Last message: { messageHistory[messageHistory.length - 1] }</span> : null }
            <ul>
                { messageHistory
                    .map( ( message, idx ) => <span key={ idx }>{ message ? message.data : null }</span> ) }
            </ul>
        </div>
    );
};