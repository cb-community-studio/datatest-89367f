import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const StartupWrapper = (props) => {
    const history = useHistory();
    useEffect(() => {
        // runs once
        props.reAuth().catch((error) => {
            console.log("error", error);
        });
    }, []);

    return null;
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    reAuth: () => dispatch.auth.reAuth(),
});

export default connect(mapState, mapDispatch)(StartupWrapper);
