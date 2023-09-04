import React, { Component } from "react";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "./models";
import MyRouter from "./MyRouter/MyRouter";

class App extends Component {
    render() {
        const store = init({ models });

        return (
            <Provider store={store}>
                <MyRouter />
            </Provider>
        );
    }
}

export default App;
