// addon-panel/register.js

import React from "react";

import { AddonPanel } from "@storybook/components";

import { addons, types } from "@storybook/addons";

import { useGlobals } from "@storybook/api";

addons.register("my/panel", () => {
    /// const configuration = useGlobals();

    /// console.log(configuration);
    addons.add("panel-addon/panel", {
        title: "Example Storybook panel",
        //👇 Sets the type of UI element in Storybook
        type: types.PANEL,
        render: ({ active, key }) => (
            <AddonPanel key={ key } active={ active }>
                <h2>I'm a panel addon in Storybook</h2>
            </AddonPanel>
        )
    });
});
