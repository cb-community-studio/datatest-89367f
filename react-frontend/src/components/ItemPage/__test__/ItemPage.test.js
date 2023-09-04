import React from "react";
import { render, screen } from "@testing-library/react";

import ItemPage from "../ItemPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders item page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ItemPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("item-datatable")).toBeInTheDocument();
    expect(screen.getByRole("item-add-button")).toBeInTheDocument();
});
