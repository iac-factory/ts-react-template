/*****
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

const Bare = ({children}) => (
    <div className={"io-dashboard-container"}>
        {
            children
        }
    </div>
);

/*****
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

const Component = ({children}) => (
    <Bare>
        {
            children
        }
    </Bare>
);

export default Component;
