import { render, screen, act } from "@testing-library/react";
import Page2 from "../../pages/page2";
import Home from "../../pages/index";

import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("test page 2 ", () => {
  test("make some tests  redux side on page 2", () => {
    render(
      <Provider store={store}>
        <Page2 />
      </Provider>
    );

    const stateCartCount = screen.getByTestId("page2StateCount");
    expect(stateCartCount).toBeInTheDocument();
    expect(stateCartCount.innerHTML).toEqual("0");
    expect(screen.getByTestId("page2TotalState").innerHTML).toEqual(
      "<p>Your cart is empty!</p>"
    );

    const reduxCartCount = screen.getByTestId("page2CountRedux");
    expect(reduxCartCount).toBeInTheDocument();
    expect(reduxCartCount.innerHTML).toEqual("10");
    expect(screen.getByTestId("page2TotalRedux").innerHTML).toEqual(
      "<p>Total: 5899.9 $</p>"
    );
    const reduxItem1Dec = screen.getByTestId("page2ReduxItem2Dec");
    expect(reduxItem1Dec).toBeInTheDocument();
    act(() => reduxItem1Dec.click());
    act(() => reduxItem1Dec.click());
    expect(screen.getByTestId("page2ReduxItem2Amount").innerHTML).toEqual("1");
    expect(screen.getByTestId("page2CountRedux").innerHTML).toEqual("8");
  });

  test("ckeck if count value is the same on home page ", () => {
    render(
      <Provider store={store}>
        <Page2 />
      </Provider>
    );
    const linkElement = screen.getByText(/adel/i);
    expect(linkElement).toBeInTheDocument();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("8");

    const reduxItem2Inc = screen.getByTestId("reduxItem2Inc");
    expect(reduxItem2Inc).toBeInTheDocument();
    act(() => reduxItem2Inc.click());
  });

  test("test clear cart button ", () => {
    render(
      <Provider store={store}>
        <Page2 />
      </Provider>
    );

    expect(screen.getByTestId("page2CountRedux").innerHTML).toEqual("9");
    expect(screen.getByTestId("page2TotalRedux").innerHTML).toEqual(
      "<p>Total: 5199.91 $</p>"
    );
    const reduxClearButton = screen.getByTestId("clearButtonRedux");

    act(() => reduxClearButton.click());
    expect(screen.getByTestId("page2CountRedux").innerHTML).toEqual("0");
    expect(screen.getByTestId("page2TotalRedux").innerHTML).toEqual(
      "<p>Your cart is empty!</p>"
    );
  });
});
