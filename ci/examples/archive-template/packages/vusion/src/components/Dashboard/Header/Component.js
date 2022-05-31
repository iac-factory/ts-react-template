import { default as props } from "prop-types";

const Filler = () => (
    <div className={ "io-grid-column-filler" }/>
);

import { default as Divider } from "./../../Divider/Index";
import { default as Version } from "./../../Version/Component";

/*****
 *
 * @param Title
 * @returns {JSX.Element}
 * @constructor
 */

const Component = (... { Title = "[Title]" }) => {
    return (
        <>
            <div className={ "io-global-page-header" }>
                <h1 aria-label={ "IO-Dashboard-Global-Header" }>
                    {
                        (Title)
                            ? <span>
                                {
                                    String("Nexus" + " - " + Title)
                                }
                        </span>
                            : String("Nexus")
                    }
                </h1>
                <Filler/>
                <Version/>
            </div>
            <Divider/>
        </>
    );
};

Component.propTypes = {
    Title: props.string
};

export default Component;
