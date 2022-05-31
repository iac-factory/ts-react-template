import PropTypes from "prop-types";

import {
    Grid, Column, Row
} from "@carbon/react";

import "./SCSS/Grid.scss";

// import { default as Filter } from "./Filter.js";

import { default as Search } from "./Search-Bar.js";

const Component = ({ Page, ... Properties }) => {
    return (
        <Grid { ... Properties } className={ "blog-grid" }>
            <Column className={ "blog-primary-content" } lg={ 16 } md={ 16 } sm={ 16 }>
                <Row className={ "blog-grid-call-to-action" }
                     style={ {
                         height: "200px",
                         backgroundColor: "black",
                         borderTop: "1px solid white",
                         borderBottom: "1px solid white",
                         outline: "1px solid white",
                         width: "100vw",
                         marginBottom: "1.25rem",
                         padding: "1.0rem"

                         // height: "375px",
                         // width: "100vw",
                         // marginBottom: "1.25rem",
                         // padding: "1.0rem",
                         // backgroundImage: "url(/Images/Cube.svg)",
                         // backgroundRepeat: "no-repeat",
                         // backgroundSize: "auto",
                         // backgroundPositionX: "75%",
                         // backgroundBlendMode: "luminosity",
                         // backgroundColor: "black",
                         // borderTop: "1px solid white",
                         // borderBottom: "1px solid white",
                         // outline: "1px solid white"
                     } }
                >
                    <h3 style={ {
                        fontSize: "3.0rem"
                    } }>
                        Technology Blog
                    </h3>
                    <h4 style={ {
                        fontSize: "1.25rem",
                        marginTop: "0.5rem",
                        marginLeft: "1.25rem"
                    } }>
                        Cloud Architecture & Development
                    </h4>
                </Row>
            </Column>
            <Column className={ "blog-primary-content" } lg={ 16 } md={ 8 } sm={ 4 }>
                <Page/>
            </Column>
        </Grid>
    );
};

Component.propTypes = {
    Page: PropTypes.func.isRequired
};

export default Component;