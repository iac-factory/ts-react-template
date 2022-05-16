import { lazy } from "react";
import { Suspense } from "react";

import { Component } from "./../../components/mobile-device";
import { Text } from "./../../components";

export const Mobile = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );

    return (
        <Suspense fallback={ null }>
            <Component>
                <Text input={ properties.name ?? "Mobile-Device" } center={ true }/>
            </Component>
        </Suspense>
    );
};

export default Mobile;