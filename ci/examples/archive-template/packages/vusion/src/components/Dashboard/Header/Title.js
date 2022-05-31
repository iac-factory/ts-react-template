const Component = ({ Title = null }) => {
    return (
        <h1 aria-label={"Dashboard-Global-Header"}>
            {
                (Title !== null)
                    ? String("Dashboard" + " - " + Title)
                    : String("Dashboard")
            }
        </h1>
    );
};

export default Component;
