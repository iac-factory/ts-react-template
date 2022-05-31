import {default as Rows} from "./Dynamic-Rows-Table";

const Component = ({children, state}) => {
    return (
        <Rows state={state}>
            {
                children
            }
        </Rows>
    );
};

export default Component;
