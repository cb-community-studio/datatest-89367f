import React from "react";
import { render, screen } from "@testing-library/react";

import OrderPage from "../OrderPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders order page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OrderPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("order-datatable")).toBeInTheDocument();
    expect(screen.getByRole("order-add-button")).toBeInTheDocument();
});
