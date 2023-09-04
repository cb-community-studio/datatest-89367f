import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "primereact/button";

const NoMatch = (props) => {
    return (
        <div className="card col-12">
            <div style={{ height: "5em" }} />
            <p
                style={{
                    fontSize: "60px",
                    fontWeight: "600",
                    textAlign: "center",
                    margin: 0,
                }}
            >
                Ops!
            </p>
            <p style={{ fontSize: "24px", textAlign: "center" }}>Page not available!</p>

            <Button label="Return Home" className="mr-2 mb-2" onClick={() => props.history.push("/")}></Button>
        </div>
    );
};

export default withRouter(NoMatch);
