import { useNavigate, Outlet } from "@reach/router";

const MenuLink = ({ text, url }) => {
    const navigate = useNavigate();

    return (
        <button onClick={async () => await navigate(url)}>
            {text}
        </button>
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
        <nav>
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