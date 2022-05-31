import * as Styles from "./SCSS/Index.module.scss";

import {
    Grid,
    Column,
    ListItem,
    UnorderedList
} from "@carbon/react";

const Component = () => {
    return (
        <footer className={ Styles["ui-footer"] }>
            <Grid className={ Styles["cds--col-span-4"] }>
                <Column className={ Styles["cds--col"] } lg={ 4 } md={ 8 } sm={ 16 }>
                    <div className={ Styles["column-container"] }>
                        <UnorderedList className={ Styles["unordered-list"] }>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-1
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-2
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-3
                            </ListItem>
                        </UnorderedList>
                    </div>
                </Column>
                <Column className={ Styles["cds--col"] } lg={ 4 } md={ 8 } sm={ 16 }>
                    <div className={ Styles["column-container"] }>
                        <UnorderedList className={ Styles["unordered-list"] }>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-1
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-2
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-3
                            </ListItem>
                        </UnorderedList>
                    </div>
                </Column>
                <Column className={ Styles["cds--col"] } lg={ 4 } md={ 8 } sm={ 16 }>
                    <div className={ Styles["column-container"] }>
                        <UnorderedList className={ Styles["unordered-list"] }>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-1
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-2
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-3
                            </ListItem>
                        </UnorderedList>
                    </div>
                </Column>
                <Column className={ Styles["cds--col"] } lg={ 4 } md={ 8 } sm={ 16 }>
                    <div className={ Styles["column-container"] }>
                        <UnorderedList className={ Styles["unordered-list"] }>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-1
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-2
                            </ListItem>
                            <ListItem className={ Styles["unordered-list-item"] }>
                                Test-3
                            </ListItem>
                        </UnorderedList>
                    </div>
                </Column>
            </Grid>
        </footer>
    );
};

export default Component;
