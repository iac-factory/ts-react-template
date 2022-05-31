import {default as Grid} from "./Grid";
import {default as Content} from "./Content";
import {default as Header} from "./Header/Index";
import {default as Container} from "./Container";
import {default as Navigation} from "./Side-Navigation";

/*****
 *
 * @param children
 * @param title
 * @returns {JSX.Element}
 * @constructor
 */

const Component = ({children}, ... {title = "[IO-Dashboard-Title]"}) => {
    return (
        <Container>
            <Grid>
                <Navigation/>
                <Content>
                    <Header Title={title}/>
                    {
                        children
                    }
                </Content>
            </Grid>
        </Container>
    );
};

export default Component;
