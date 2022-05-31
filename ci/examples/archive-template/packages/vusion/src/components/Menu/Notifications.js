//import { NotificationsPanel } from "@carbon/ibm-products";

/// import { NotificationsPanel } from "@carbon/ibm-cloud-cognitive";

import "./SCSS/Notifications-Panel.scss";

function noRefCheck() {
    console.log("Trigger");
}

const Component = ({ State }) => {
    return null;

//    (
//        <NotificationsPanel
//            open={ State[0] }
//            //            dismissAllLabel={ "Dismiss-All" }
//            //            emptyStateLabel={ "Empty" }
//            //            previousLabel={ "Previous" }
//            //            readLessLabel={ "Less" }
//            //            readMoreLabel={ "More" }
//            //            todayLabel={ "Today" }
//            //            viewAllLabel={ "All" }
//            //            yesterdayLabel={ "Yesterday" }
//            data={ [
//                {
//                    description: "LogRhythm is failing to connect, check timeout.",
//                    id: "200c50dc-2057-4fc9-bcb8-bba263b2ed49",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-15T05:12:53.858Z"),
//                    title: "LogRhythm connection failure",
//                    type: "error",
//                    unread: true
//                },
//                {
//                    description: "Unable to communicate with LogDNA.",
//                    id: "bbae4a84-43f8-461c-8fd8-1e1357cbfcdd",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-15T05:12:23.858Z"),
//                    title: "LogDNA cannot be reached.",
//                    type: "error",
//                    unread: true
//                },
//                {
//                    description: "Email classification was exported successfully.",
//                    id: "f131937a-6a67-487c-91a7-9cdeb7ad2d5d",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-15T05:01:53.858Z"),
//                    title: "System alert",
//                    type: "warning"
//                },
//                {
//                    description: "Successfully connected cartridge",
//                    id: "66d4ac37-95ff-41c6-aca3-c8098dfbb826",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-15T03:12:53.858Z"),
//                    title: "IBM Cloud Pak for Automation Success",
//                    type: "success"
//                },
//                {
//                    description: "App connection succeeded",
//                    id: "036b5783-828d-4d3e-85d5-8bc2a02cedbd",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-14T05:12:53.858Z"),
//                    title: "Successfully connected LogDNA",
//                    type: "success"
//                },
//                {
//                    description: "Allocated app memory low",
//                    id: "222f83dd-5c03-48cc-bd75-b787cf9b932b",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cloud Foundry app memory",
//                    type: "warning"
//                },
//                {
//                    id: "04646035-a9dd-4fb9-9b07-d9757a016616",
//                    link: {
//                        text: "View logs",
//                        url: "https://www.carbondesignsystem.com"
//                    },
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Logs are now being monitored",
//                    type: "informational"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "bff6ceeb-7212-4f14-856e-edac235889f3",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "5fa08620-569d-4f32-a127-e24e40d118ea",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "3ff0076d-8513-478a-b9f4-8d7694996d95",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "684c7ea3-2f4a-4b33-b015-4efe802cf06f",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "cc8c8b79-3bed-4f0a-a94d-4c57dd2b6491",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "59bda3f1-67ce-40e1-9288-2c3be78d0792",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "6973ad57-23d5-4431-94d1-6cbc48728707",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "2c12bdfb-6c91-4936-8077-6f4cff7f5426",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                },
//                {
//                    description: "Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.",
//                    id: "13745bdf-259d-4f3e-b85a-960a288c3f4c",
//                    onNotificationClick: function noRefCheck() {},
//                    timestamp: new Date("2021-12-13T05:12:53.858Z"),
//                    title: "Cluster unreachable",
//                    type: "error"
//                }
//            ] }
//            //                {
//            //                    description: "[Test-Notification-Description]",
//            //                    id: "2fa2eab4-65ad-4b8b-ac62-4ee88e060b58",
//            //                    onNotificationClick: function noRefCheck() {
//            //                        console.debug("[Debug]", "Notification-Click");
//            //                    },
//            //                    timestamp: new Date("2021-09-12T09:12:10.172Z"),
//            //                    title: "[Test-Notification-Title]",
//            //                    type: "error",
//            //                    unread: true,
//            //                    link: {
//            //                        url: "https://google.com",
//            //                        text: "Test"
//            //                    }
//            //                },
//            //                {
//            //                    description: "[Test-Notification-Description]",
//            //                    id: "2d14a3e8-0e28-464b-bfe2-dfa667b357aa",
//            //                    onNotificationClick: function noRefCheck() {
//            //                        console.debug("[Debug]", "Notification-Click");
//            //                    },
//            //                    timestamp: new Date("2021-09-12T09:12:10.172Z"),
//            //                    title: "[Test-Notification-Title]",
//            //                    type: "warning",
//            //                    unread: true
//            //                },
//            //                {
//            //                    description: "[Test-Notification-Description]",
//            //                    id: "cad26eec-dc03-4460-82d5-73662dcf1308",
//            //                    onNotificationClick: function noRefCheck() {
//            //                        console.debug("[Debug]", "Notification-Click");
//            //                    },
//            //                    timestamp: new Date("2021-09-10T09:12:10.172Z"),
//            //                    title: "[Test-Notification-Title]",
//            //                    type: "warning",
//            //                    unread: true
//            //                },
//            //                {
//            //                    description: "[Test-Notification-Description]",
//            //                    id: "f1b6b35a-157a-40f7-89ad-a5f63f956fc3",
//            //                    onNotificationClick: function noRefCheck() {
//            //                        console.debug("[Debug]", "Notification-Click");
//            //                    },
//            //                    timestamp: new Date("2021-09-12T07:12:10.172Z"),
//            //                    title: "[Test-Notification-Title]",
//            //                    type: "success"
//            //                },
//            //                {
//            //                    description: "[Test-Notification-Description]",
//            //                    id: "15b6c5e0-709d-4552-ab1d-6a42f8f03c8a",
//            //                    onNotificationClick: function noRefCheck() {
//            //                        console.debug("[Debug]", "Notification-Click");
//            //                    },
//            //                    timestamp: new Date("2021-09-11T09:12:10.172Z"),
//            //                    title: "[Test-Notification-Title]",
//            //                    type: "informational"
//            //                }
//            //            ] }
//            //            onClickOutside={ function noRefCheck() { } }
//            //            onDismissAllNotifications={ function noRefCheck() { } }
//            //            onDismissSingleNotification={ function noRefCheck() { } }
//            //            onDoNotDisturbChange={ function noRefCheck() { } }
//            //            onSettingsClick={ function noRefCheck() { } }
//            //            onViewAllClick={ function noRefCheck() { } }
//
//            onClickOutside={ () => {
//                console.debug("[Debug]", "Notifications", "Event: Click Outside");
//                //                State[1](false);
//            } }
//            onDismissAllNotifications={ () => {
//                console.debug("[Debug]", "Notifications", "Event: Dismiss All");
//            } }
//            onDismissSingleNotification={ () => {
//                console.debug("[Debug]", "Notifications", "Event: Dismiss Single");
//            } }
//            doNotDisturbLabel={ "Do Not Disturb" }
//            onDoNotDisturbChange={ () => {
//                console.debug("[Debug]", "Notifications", "Event: Do Not Disturb");
//                // setDoNotDisturb(!doNotDisturb);
//            } }
//            onSettingsClick={ () => {
//                console.debug("[Debug]", "Notifications", "Event: Settings");
//            } }
//            onViewAllClick={ () => {
//                console.debug("[Debug]", "Notifications", "Event: View All");
//            } }
//        />
//    );
};

//NotificationsPanel.defaultProps = {
//    daysAgoText: function daysAgoText(value) {
//        return "".concat(value, " days ago");
//    },
//    dismissAllLabel: "Dismiss all",
//    dismissSingleNotificationIconDescription: "Dismiss",
//    doNotDisturbLabel: "Do not disturb",
//    emptyStateLabel: "You do not have any notifications",
//    hourAgoText: function hourAgoText(value) {
//        return "".concat(value, " hour ago");
//    },
//    hoursAgoText: function hoursAgoText(value) {
//        return "".concat(value, " hours ago");
//    },
//    minuteAgoText: function minuteAgoText(value) {
//        return "".concat(value, " minute ago");
//    },
//    minutesAgoText: function minutesAgoText(value) {
//        return "".concat(value, " minutes ago");
//    },
//    monthAgoText: function monthAgoText(value) {
//        return "".concat(value, " month ago");
//    },
//    monthsAgoText: function monthsAgoText(value) {
//        return "".concat(value, " months ago");
//    },
//    nowText: "Now",
//    onDismissAllNotifications: function onDismissAllNotifications() {},
//    onDismissSingleNotification: function onDismissSingleNotification() {},
//    previousLabel: "Previous",
//    readLessLabel: "Read less",
//    readMoreLabel: "Read more",
//    secondsAgoText: function secondsAgoText(value) {
//        return "".concat(value, " seconds ago");
//    },
//    settingsIconDescription: "Settings",
//    title: "Notifications",
//    todayLabel: "Today",
//    viewAllLabel: function viewAllLabel(value) {
//        return "View all (".concat(value, ")");
//    },
//    yearsAgoText: function yearsAgoText(value) {
//        return "".concat(value, " years ago");
//    },
//    yearAgoText: function yearAgoText(value) {
//        return "".concat(value, " year ago");
//    },
//    yesterdayLabel: "Yesterday",
//    yesterdayAtText: function yesterdayAtText(value) {
//        return "Yesterday at ".concat(value);
//    }
//};

export default Component;