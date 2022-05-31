import PropTypes from "prop-types";

import { FilterPanel } from "@carbon/ibm-security";

import "./SCSS/Filter.scss";

const Component = () => {
    return (
        <div className={"blog-side-panel-filter"}>
            <FilterPanel
                filterData={ {
                    categories: {
                        CATEGORY_2: {
                            count: 10,
                            id: "CATEGORY_2",
                            name: "Categories",
                            subcategories: [
                                "CATEGORY_2:SUBCATEGORY_1",
                                "CATEGORY_2:SUBCATEGORY_2",
                                "CATEGORY_2:SUBCATEGORY_3",
                                "CATEGORY_2:SUBCATEGORY_4",
                                "CATEGORY_2:SUBCATEGORY_5",
                                "CATEGORY_2:SUBCATEGORY_6"
                            ]
                        },
                        DEFAULT: {
                            count: 25,
                            id: "DEFAULT",
                            name: "Filter",
                            subcategories: [
                                "DEFAULT",
                                "NO_FILTERS",
                                "ZERO_FILTERS_COUNT",
                                "OPEN"
                            ]
                        },
                        NO_FILTERS: {
                            count: 0,
                            id: "NO_FILTERS",
                            name: "Category with no filters",
                            subcategories: [
                                "NO_FILTERS"
                            ]
                        },
                        NO_SUBCATEGORIES: {
                            count: 0,
                            id: "NO_SUBCATEGORIES",
                            name: "Category with no subcategories",
                            subcategories: []
                        }
                    },
                    filters: {
                        "CATEGORY_2:SUBCATEGORY_1:FILTER_1": {
                            count: 5,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_1:FILTER_1",
                            name: "Filter 1",
                            parent: "CATEGORY_2:SUBCATEGORY_1"
                        },
                        "CATEGORY_2:SUBCATEGORY_1:FILTER_2": {
                            count: 12,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_1:FILTER_2",
                            name: "Filter 2",
                            parent: "CATEGORY_2:SUBCATEGORY_1"
                        },
                        "CATEGORY_2:SUBCATEGORY_1:FILTER_3": {
                            count: 19,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_1:FILTER_3",
                            name: "Filter 3",
                            parent: "CATEGORY_2:SUBCATEGORY_1"
                        },
                        "CATEGORY_2:SUBCATEGORY_1:FILTER_4": {
                            count: 22,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_1:FILTER_4",
                            name: "Filter 4",
                            parent: "CATEGORY_2:SUBCATEGORY_1"
                        },
                        "CATEGORY_2:SUBCATEGORY_1:FILTER_5": {
                            count: 5,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_1:FILTER_5",
                            name: "Filter 5",
                            parent: "CATEGORY_2:SUBCATEGORY_1"
                        },
                        "CATEGORY_2:SUBCATEGORY_1:FILTER_6": {
                            count: 1,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_1:FILTER_6",
                            name: "Filter 6",
                            parent: "CATEGORY_2:SUBCATEGORY_1"
                        },
                        "CATEGORY_2:SUBCATEGORY_2:FILTER_1": {
                            count: 15,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_2:FILTER_1",
                            name: "Filter 1",
                            parent: "CATEGORY_2:SUBCATEGORY_2"
                        },
                        "CATEGORY_2:SUBCATEGORY_3:FILTER_1": {
                            count: 13,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_3:FILTER_1",
                            name: "Filter 1",
                            parent: "CATEGORY_2:SUBCATEGORY_3"
                        },
                        "CATEGORY_2:SUBCATEGORY_3:FILTER_2": {
                            count: 3,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_3:FILTER_2",
                            name: "Filter 2",
                            parent: "CATEGORY_2:SUBCATEGORY_3"
                        },
                        "CATEGORY_2:SUBCATEGORY_3:FILTER_3": {
                            count: 9,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_3:FILTER_3",
                            name: "Filter 3",
                            parent: "CATEGORY_2:SUBCATEGORY_3"
                        },
                        "CATEGORY_2:SUBCATEGORY_4:FILTER_1": {
                            count: 26,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_4:FILTER_1",
                            name: "Filter 1",
                            parent: "CATEGORY_2:SUBCATEGORY_4"
                        },
                        "CATEGORY_2:SUBCATEGORY_4:FILTER_2": {
                            count: 4,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_4:FILTER_2",
                            name: "Filter 2",
                            parent: "CATEGORY_2:SUBCATEGORY_4"
                        },
                        "CATEGORY_2:SUBCATEGORY_4:FILTER_3": {
                            count: 27,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_4:FILTER_3",
                            name: "Filter 3",
                            parent: "CATEGORY_2:SUBCATEGORY_4"
                        },
                        "CATEGORY_2:SUBCATEGORY_4:FILTER_4": {
                            count: 3,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_4:FILTER_4",
                            name: "Filter 4",
                            parent: "CATEGORY_2:SUBCATEGORY_4"
                        },
                        "CATEGORY_2:SUBCATEGORY_5:FILTER_1": {
                            count: 10,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_5:FILTER_1",
                            name: "Filter 1",
                            parent: "CATEGORY_2:SUBCATEGORY_5"
                        },
                        "CATEGORY_2:SUBCATEGORY_5:FILTER_2": {
                            count: 22,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_5:FILTER_2",
                            name: "Filter 2",
                            parent: "CATEGORY_2:SUBCATEGORY_5"
                        },
                        "CATEGORY_2:SUBCATEGORY_6:FILTER_1": {
                            count: 24,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_6:FILTER_1",
                            name: "Filter 1",
                            parent: "CATEGORY_2:SUBCATEGORY_6"
                        },
                        "CATEGORY_2:SUBCATEGORY_6:FILTER_2": {
                            count: 7,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_6:FILTER_2",
                            name: "Filter 2",
                            parent: "CATEGORY_2:SUBCATEGORY_6"
                        },
                        "CATEGORY_2:SUBCATEGORY_6:FILTER_3": {
                            count: 20,
                            enabled: false,
                            id: "CATEGORY_2:SUBCATEGORY_6:FILTER_3",
                            name: "Filter 3",
                            parent: "CATEGORY_2:SUBCATEGORY_6"
                        },
                        DEFAULT: {
                            count: 10,
                            enabled: false,
                            id: "DEFAULT",
                            name: "Filter",
                            parent: "DEFAULT"
                        },
                        LONG_TEXT: {
                            count: 10,
                            enabled: false,
                            id: "LONG_TEXT",
                            name: "Long filter label that overflows out of panel.",
                            parent: "DEFAULT"
                        },
                        "OPEN:FILTER_1": {
                            count: 10,
                            enabled: false,
                            id: "OPEN:FILTER_1",
                            name: "Filter 1",
                            parent: "OPEN"
                        },
                        "OPEN:FILTER_2": {
                            count: 10,
                            enabled: false,
                            id: "OPEN:FILTER_2",
                            name: "Filter 2",
                            parent: "OPEN"
                        },
                        "OPEN:FILTER_3": {
                            count: 10,
                            enabled: false,
                            id: "OPEN:FILTER_3",
                            name: "Filter 3",
                            parent: "OPEN"
                        },
                        SELECTED: {
                            count: 10,
                            enabled: true,
                            id: "SELECTED",
                            name: "Selected filter",
                            parent: "DEFAULT"
                        },
                        "ZERO_FILTERS_COUNT:FILTER_1": {
                            count: 0,
                            enabled: false,
                            id: "ZERO_FILTERS_COUNT:FILTER_1",
                            name: "Filter 1",
                            parent: "ZERO_FILTERS_COUNT"
                        },
                        "ZERO_FILTERS_COUNT:FILTER_2": {
                            count: 0,
                            enabled: false,
                            id: "ZERO_FILTERS_COUNT:FILTER_2",
                            name: "Filter 2",
                            parent: "ZERO_FILTERS_COUNT"
                        },
                        "ZERO_FILTERS_COUNT:FILTER_3": {
                            count: 0,
                            enabled: false,
                            id: "ZERO_FILTERS_COUNT:FILTER_3",
                            name: "Filter 3",
                            parent: "ZERO_FILTERS_COUNT"
                        }
                    },
                    subcategories: {
                        "CATEGORY_2:SUBCATEGORY_1": {
                            count: 64,
                            filters: [
                                "CATEGORY_2:SUBCATEGORY_1:FILTER_1",
                                "CATEGORY_2:SUBCATEGORY_1:FILTER_2",
                                "CATEGORY_2:SUBCATEGORY_1:FILTER_3",
                                "CATEGORY_2:SUBCATEGORY_1:FILTER_4",
                                "CATEGORY_2:SUBCATEGORY_1:FILTER_5",
                                "CATEGORY_2:SUBCATEGORY_1:FILTER_6"
                            ],
                            id: "CATEGORY_2:SUBCATEGORY_1",
                            name: "Subcategory 1",
                            parent: "CATEGORY_2"
                        },
                        "CATEGORY_2:SUBCATEGORY_2": {
                            count: 15,
                            filters: [
                                "CATEGORY_2:SUBCATEGORY_2:FILTER_1"
                            ],
                            id: "CATEGORY_2:SUBCATEGORY_2",
                            name: "Subcategory 2",
                            parent: "CATEGORY_2"
                        },
                        "CATEGORY_2:SUBCATEGORY_3": {
                            count: 25,
                            filters: [
                                "CATEGORY_2:SUBCATEGORY_3:FILTER_1",
                                "CATEGORY_2:SUBCATEGORY_3:FILTER_2",
                                "CATEGORY_2:SUBCATEGORY_3:FILTER_3"
                            ],
                            id: "CATEGORY_2:SUBCATEGORY_3",
                            name: "Subcategory 3",
                            parent: "CATEGORY_2"
                        },
                        "CATEGORY_2:SUBCATEGORY_4": {
                            count: 60,
                            filters: [
                                "CATEGORY_2:SUBCATEGORY_4:FILTER_1",
                                "CATEGORY_2:SUBCATEGORY_4:FILTER_2",
                                "CATEGORY_2:SUBCATEGORY_4:FILTER_3",
                                "CATEGORY_2:SUBCATEGORY_4:FILTER_4"
                            ],
                            id: "CATEGORY_2:SUBCATEGORY_4",
                            name: "Subcategory 4",
                            parent: "CATEGORY_2"
                        },
                        "CATEGORY_2:SUBCATEGORY_5": {
                            count: 32,
                            filters: [
                                "CATEGORY_2:SUBCATEGORY_5:FILTER_1",
                                "CATEGORY_2:SUBCATEGORY_5:FILTER_2"
                            ],
                            id: "CATEGORY_2:SUBCATEGORY_5",
                            name: "Subcategory 5",
                            parent: "CATEGORY_2"
                        },
                        "CATEGORY_2:SUBCATEGORY_6": {
                            count: 51,
                            filters: [
                                "CATEGORY_2:SUBCATEGORY_6:FILTER_1",
                                "CATEGORY_2:SUBCATEGORY_6:FILTER_2",
                                "CATEGORY_2:SUBCATEGORY_6:FILTER_3"
                            ],
                            id: "CATEGORY_2:SUBCATEGORY_6",
                            name: "Subcategory 6",
                            parent: "CATEGORY_2"
                        },
                        DEFAULT: {
                            count: 30,
                            filters: [
                                "DEFAULT",
                                "LONG_TEXT",
                                "SELECTED"
                            ],
                            id: "DEFAULT",
                            name: "Subcategory",
                            parent: "DEFAULT"
                        },
                        NO_FILTERS: {
                            count: 0,
                            filters: [],
                            id: "NO_FILTERS",
                            name: "Subcategory with no filters",
                            parent: "DEFAULT"
                        },
                        OPEN: {
                            count: 30,
                            filters: [
                                "OPEN:FILTER_1",
                                "OPEN:FILTER_2",
                                "OPEN:FILTER_3"
                            ],
                            id: "OPEN",
                            name: "Open Subcategory",
                            // open: true,
                            open: false,
                            parent: "DEFAULT"
                        },
                        ZERO_FILTERS_COUNT: {
                            count: 0,
                            filters: [
                                "ZERO_FILTERS_COUNT:FILTER_1",
                                "ZERO_FILTERS_COUNT:FILTER_2",
                                "ZERO_FILTERS_COUNT:FILTER_3"
                            ],
                            id: "ZERO_FILTERS_COUNT",
                            name: "Subcategory with filters with no count",
                            parent: "DEFAULT"
                        }
                    }
                } }
                filterSearchLabel="Find filter - prop"
                filtersCollapseLabel="View less - prop"
                filtersExpandLabel="View more - prop"
                labels={ {
                    FILTER_PANEL_CATEGORY_COLLAPSE_LABEL: "View less",
                    FILTER_PANEL_CATEGORY_EXPAND_LABEL: "View more",
                    FILTER_PANEL_SEARCH_CLOSE_BUTTON: "Clear search",
                    FILTER_PANEL_SEARCH_LABEL: "Find filter...",
                    FILTER_PANEL_SEARCH_NO_RESULTS_LABEL: "No filter matches your search"
                } }
                noFiltersResultsLabel="No filter matches your search - prop"
                onChange={ function noRefCheck() {} }
                title="Filters"
            />
        </div>
    );
};

export default Component;