import { Router } from "..";
import { Debugger } from "..";

export module Client {
    export const serve = (identifier: string = "Application", Application: () => JSX.Element) => {
        const element = document.getElementById( identifier );

        void (() => (Debugger.enable) && Debugger.Vitals())();
        return Router.Initialize( element ).render(
            (
                <Router.Framework.StrictMode>
                    <Router.Browser>
                        <Application/>
                    </Router.Browser>
                </Router.Framework.StrictMode>
            )
        );
    }
}

export default Client;
