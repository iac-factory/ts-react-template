import PropTypes from "prop-types";

import { default as Difference } from "./../../utilities/Difference.js";

const Component = (props) => {
    const {
        Title,
        Name,
        ID,
        ... Properties
    } = props;

    console.log("Unassigned Properties", Properties);

    return (
        <>
            {
                Title
            }
            <br/>
            {
                Name
            }
            <br/>
            {
                ID
            }

            <hr/>

            <pre>
                <code>
                    {
                        JSON.stringify({
                            Defaults: Difference(props, Properties),
                            Properties: {
                                ... Properties
                            }
                        }, null, 4)
                    }
                </code>
            </pre>
        </>
    );
};

Component.defaultProps = {
    Title: "[Title]",
    Name: "[Name]",
    ID: "[ID]"
};

Component.propTypes = {
    Title: PropTypes.string,
    Name: PropTypes.string,
    ID: PropTypes.string
};

export default Component;
