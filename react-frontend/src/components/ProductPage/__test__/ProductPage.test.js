import React from "react";
import { render, screen } from "@testing-library/react";

import ProductPage from "../ProductPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders product page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("product-datatable")).toBeInTheDocument();
    expect(screen.getByRole("product-add-button")).toBeInTheDocument();
});
