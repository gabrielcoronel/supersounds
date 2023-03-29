import { useNavigate } from "@reach/router";
import { Button } from "@mui/material";

const styles = {
    menu: {
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
};

const MenuLink = ({ text, url }) => {
    const navigate = useNavigate();

    return (
        <Button onClick={async () => await navigate(url)} variant="text">
            {text}
        </Button>
    );
};

const Menu = () => {
    const links = {
        "Upload a track": "/upload",
        "List of tracks": "/tracks"
    };

    const linksElements = Object.entries(links)
        .map(([text, url], index) => <MenuLink key={index} text={text} url={url}/>);

    return (
        <nav style={styles.menu}>
            {linksElements}
        </nav>
    );
};

export default ({ children }) => {
    return (
        <>
            <Menu />
            {children}
        </>
    );
};