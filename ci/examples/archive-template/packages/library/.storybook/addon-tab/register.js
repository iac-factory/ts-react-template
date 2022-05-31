// addon-tab/register.js

import React from "react";

import { addons, types } from "@storybook/addons";

addons.register("poc/tab", () => {
    addons.add("panel-poc/tab", {
        type: types.TAB,
        title: "Example Storybook tab",
        //👇 Checks the current route for the story
        route: ({ storyId, refId }) => ( refId ? `/poc/${ refId }_${ storyId }` : `/poc/${ storyId }` ),
        //👇 Shows the Tab UI element in mytab view mode
        match: ({ viewMode }) => viewMode === "panel-poc",
        render: () => (
            <div>
                <h2>I'm a tabbed addon in Storybook</h2>
            </div>
        )
    });
});
