const Title = ({ Content }) => (
    (Content)
        ? <h3>
            {Content}
        </h3>
        : <></>
);

const Divider = ({ Children }) => {
    return (
        <div className="io-divider-container">
            <div className="io-divider-border"/>
            <span className="io-divider-content">
                {Children}
            </span>
            <div className="io-divider-border"/>
        </div>
    );
};

const Component = ({ Text = null }) => {
    return (
        <Divider Children={(
            <Title Content={Text}/>
        )}/>
    );
};

export default Component;
