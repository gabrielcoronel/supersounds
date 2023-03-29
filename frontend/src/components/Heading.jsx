const styles = {
    heading: {
        textAlign: "center",
    }
};

export default ({ text }) => {
    return (
        <h1 style={styles.heading}>
            {text}
        </h1>
    );
};