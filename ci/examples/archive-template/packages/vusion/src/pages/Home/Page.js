import React from "react";
import PropTypes from "prop-types";

import Styles from "./SCSS/Index.module.scss";

//import { default as Button } from "./../../components/Button";

import { Button } from "@carbon/react";

import {
    Application,
    Globe,
    PersonFavorite
} from "@carbon/icons-react";

import {
    Column,
    Row,
    Grid
} from "@carbon/react";

import { default as Selectable } from "./../../components/Tile-Mutli-Select";

import { default as List } from "./../../components/Selectable-List";

/***
 *
 * @param phrase {string} - Spoken Phrase, Space Separated
 *
 * @returns {(*)[]}
 *
 */

function createArrayFromPhrase(phrase) {
    const splitPhrase = phrase.split(" ");
    const thirdWord = splitPhrase.pop();
    return [ splitPhrase.join(" "), thirdWord ];
}

const Sectional = (props) => (
    <Grid>
        <Column md={ 8 } lg={ 4 } xlg={ 3 }>
            <h3 className={ Styles["home-info-section-heading"] }>
                { props.heading }
            </h3>
        </Column>

        { props.children }
    </Grid>
);

Sectional.propTypes = {
    /***
     * Header H3 String Context
     */
    heading: PropTypes.string.isRequired,

    /***
     * JSX Node(s) as Individual Elements or as an Array
     */
    children: PropTypes.node
};

const Card = ({ heading, body, icon }) => {
    const splitHeading = createArrayFromPhrase(heading);

    return (
        <Column sm={ 4 } md={ 8 } lg={ 4 } className={ Styles["home-info-card"] }>
            <h4 className={ Styles["home-info-heading"] }>
                { splitHeading[0] + " " }
                <strong>
                    {
                        splitHeading[1]
                    }
                </strong>
            </h4>
            <p className={ Styles["home-info-card-body"] }>
                { body }
            </p>
            { icon }
        </Column>
    );
};

/***
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

const Component = () => (
    <React.Fragment>
        <Row className={ Styles["home-row-1"] }>
            <Row>
                <Column lg={ 16 } md={ 8 } sm={ 4 } className={ Styles["home-banner"] }>
                    <h1 className={ Styles["home-heading"] }>
                        Design &amp; Engineering
                    </h1>
                    <Grid fullWidth={ true }>
                        <Column
                            md={ 4 }
                            lg={ 7 }
                            sm={ 4 }
                        >
                            <h2 className={ Styles["home-subheading"] }>
                                Foster Innovation
                            </h2>
                            <p className={ Styles["home-paragraph"] }>
                                Nexus is a managed cloud service & provided software library that interface(s)
                                community-driven APIs and extends IBM’s open-source design system
                                to create an easy-to-use and engaging experience.
                            </p>
                            <Button>
                                Learn more
                            </Button>
                        </Column>
                        <Column
                            md={ 4 }
                            lg={ { span: 8, offset: 7 } }
                            sm={ 4 }
                        >
                            <img
                                className={ Styles["home-primary-image"] }
                                src={ process.env.PUBLIC_URL + "/Isometric.jpeg" }
                                alt="Carbon illustration"
                            />
                        </Column>
                    </Grid>
                </Column>
            </Row>
        </Row>
        {/*<Row>*/ }
        {/*<Column className={ Styles["home-row-2"] }>*/ }
        {/*    <Tabs type={ "default" }*/ }
        {/*        aria-label="Tab Navigation"*/ }
        {/*        className={ Styles.navigators }*/ }
        {/*    >*/ }
        {/*        <Tab label="Overview" className={ Styles.navigation }>*/ }
        {/*            <Grid fullWidth={ true }>*/ }
        {/*                <Column*/ }
        {/*                    md={ 4 }*/ }
        {/*                    lg={ 7 }*/ }
        {/*                    sm={ 4 }*/ }
        {/*                >*/ }
        {/*                    <h2 className={ Styles["home-subheading"] }>*/ }
        {/*                        Foster Innovation*/ }
        {/*                    </h2>*/ }
        {/*                    <p className={ Styles["home-paragraph"] }>*/ }
        {/*                        Nexus is a managed cloud service & provided software library that interface(s)*/ }
        {/*                        community-driven APIs and extends IBM’s open-source design system*/ }
        {/*                        to create an easy-to-use and engaging experience.*/ }
        {/*                    </p>*/ }
        {/*                    <Button>*/ }
        {/*                        Learn more*/ }
        {/*                    </Button>*/ }
        {/*                </Column>*/ }
        {/*                <Column*/ }
        {/*                    md={ 4 }*/ }
        {/*                    lg={ { span: 8, offset: 7 } }*/ }
        {/*                    sm={ 4 }*/ }
        {/*                >*/ }
        {/*                    <img*/ }
        {/*                        className={ Styles["home-primary-image"] }*/ }
        {/*                        src={ process.env.PUBLIC_URL + "/Isometric.jpeg" }*/ }
        {/*                        alt="Carbon illustration"*/ }
        {/*                    />*/ }
        {/*                </Column>*/ }
        {/*            </Grid>*/ }
        {/*        </Tab>*/ }
        {/*        <Tab label="Design" className={ Styles.navigation }>*/ }
        {/*            <Grid fullWidth={ true }>*/ }
        {/*                <Column*/ }
        {/*                    md={ 4 }*/ }
        {/*                    lg={ 7 }*/ }
        {/*                    sm={ 4 }*/ }
        {/*                >*/ }
        {/*                    <h2 className={ Styles["home-subheading"] }>*/ }
        {/*                        Express Creativeness*/ }
        {/*                    </h2>*/ }
        {/*                    <p className={ Styles["home-paragraph"] }>*/ }
        {/*                        Catered for both the engineer or the artisan - users in need of a new platform will find Nexus a suitable replacement*/ }
        {/*                        for their business & engineering requirements.*/ }
        {/*                    </p>*/ }
        {/*                    <Button>Learn more</Button>*/ }
        {/*                </Column>*/ }
        {/*                <Column*/ }
        {/*                    md={ 4 }*/ }
        {/*                    lg={ { span: 8, offset: 7 } }*/ }
        {/*                    sm={ 4 }*/ }
        {/*                >*/ }
        {/*                    <img*/ }
        {/*                        className={ Styles["home-primary-image"] }*/ }
        {/*                        src={ process.env.PUBLIC_URL + "/Isometric.jpeg" }*/ }
        {/*                        alt="Carbon illustration"*/ }
        {/*                    />*/ }
        {/*                </Column>*/ }
        {/*            </Grid>*/ }
        {/*        </Tab>*/ }
        {/*        <Tab label="Development" className={ Styles.navigation }>*/ }
        {/*            <Grid fullWidth={ true }>*/ }
        {/*                <Column*/ }
        {/*                    md={ 4 }*/ }
        {/*                    lg={ 7 }*/ }
        {/*                    sm={ 4 }*/ }
        {/*                >*/ }
        {/*                    <h2 className={ Styles["home-subheading"] }>*/ }
        {/*                        Standardize Automation*/ }
        {/*                    </h2>*/ }
        {/*                    <p className={ Styles["home-paragraph"] }>*/ }
        {/*                        With strong automation-first design principals & intuitive web UIs, eliminate repetitive*/ }
        {/*                        business procedures or engineering related technical debt through simple and easy-to-understand*/ }
        {/*                        workflows.*/ }
        {/*                    </p>*/ }
        {/*                    <Button>Learn more</Button>*/ }
        {/*                </Column>*/ }
        {/*                <Column*/ }
        {/*                    md={ 4 }*/ }
        {/*                    lg={ { span: 8, offset: 7 } }*/ }
        {/*                    sm={ 4 }*/ }
        {/*                >*/ }
        {/*                    <img*/ }
        {/*                        className={ Styles["home-primary-image"] }*/ }
        {/*                        src={ process.env.PUBLIC_URL + "/Isometric.jpeg" }*/ }
        {/*                        alt="Carbon illustration"*/ }
        {/*                    />*/ }
        {/*                </Column>*/ }
        {/*            </Grid>*/ }
        {/*        </Tab>*/ }
        {/*    </Tabs>*/ }
        {/*</Column>*/ }
        {/*</Row>*/ }
        {/*// </Row>*/ }
        <Column lg={ 16 } md={ 8 } sm={ 4 } className={ Styles["home-row-3"] }>
            <Sectional heading="The Principles" className={ Styles["home-row-3"] }>
                <Card
                    heading="Nexus is Open"
                    body="All through distributed efforts, & guided by the principles of the open-source movement - Nexus is motivated to share safe and efficient software. Everyone is encouraged to contribute."
                    icon={ <PersonFavorite size={ 50 }/> }
                />
                <Card
                    heading="Nexus is Modular"
                    body="Nexus ensures maximum flexibility in execution through a modular API. Through compositions or abstractions, either design principle suits the needs of the user."
                    icon={ <Application size={ 50 }/> }
                />
                <Card
                    heading="Nexus is Consistent"
                    body="Every library, every package, and every module was designed from the ground up to work elegantly to ensure consistent, cohesive, and above all else, an intuitive user experience."
                    icon={ <Globe size={ 50 }/> }
                />
            </Sectional>
        </Column>
        <Selectable/>
        <hr/>
        <List rows={ 15 }/>
    </React.Fragment>
);

export default Component;