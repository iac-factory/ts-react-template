import { lazy } from "react";
import { Suspense } from "react";

export const Mobile = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );
    const Component = lazy( () => import("./../../components/mobile-device") );

    return (
        <Suspense fallback={ null }>
            <Component>
                <Text input={ properties.name ?? "Mobile-Device" } center={ true }/>
            </Component>
        </Suspense>
    );
};

export default Mobile;