import { useEffect, Suspense } from "react";

const Component = () => {
    useEffect( () => {
        const Load = async () => {
            const worker = new Worker( [ "", "web-workers", "index-db.js" ].join( "/" ) );

            const element = document.getElementById("Development-Page");

            /// Once the worker is spawned, a message is emitted to the client
            worker.onmessage = async function ( event ) {
                console.log(event.data, "Data");
                /// Respond back upon spawn with the event message
                element.innerHTML = event.data;
            };
        };

        return void Load();
    }, []);

    return (
        <span id={"Development-Page"}>
            {
                "Hello World"
            }
        </span>
    );
};

export const Page = () => {
    return (
        <Suspense fallback={null}>
            <Component/>
        </Suspense>
    );
};

export default Page;