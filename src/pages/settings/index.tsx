import { lazy } from "react";
import { Suspense } from "react";

export const Settings = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );

    return (
        <Suspense fallback={ null }>
            <Text input={ properties.name ?? "Settings" } center={ true }/>
        </Suspense>
    );
};

export default Settings;