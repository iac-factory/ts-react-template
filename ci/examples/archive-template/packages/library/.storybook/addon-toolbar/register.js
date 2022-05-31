// addon-toolbar/register.js

import React from "react";

import { addons, types } from "@storybook/addons";

import { Icons, IconButton } from "@storybook/components";

addons.register("poc/toolbar", () => {
    addons.add("toolbar-poc/toolbar", {
        title: "Example Storybook toolbar",
        //👇 Sets the type of UI element in Storybook
        type: types.TOOL,
        //👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
        match: ({ viewMode }) => !!( viewMode && viewMode.match(/^(story|docs)$/) ),
        render: ({ active }) => (
            <IconButton
                active={ active }
                title="Show a Storybook toolbar"
            >
                <Icons icon="outline"/>
            </IconButton>
        )
    });
});
