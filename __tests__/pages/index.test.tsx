import { render, screen, act } from "@testing-library/react";
import IndexPage from "../../pages/index";
import { Provider } from "react-redux";

import { wrapper, store } from "../../store/store";

describe("Test index page", () => {
  //
  describe("Test Redux part", () => {
    test("Test cart count", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );

      const reduxCartCount = screen.getByTestId("testCountRedux");
      expect(reduxCartCount).toBeInTheDocument();
      expect(reduxCartCount.innerHTML).toEqual("10");
    });

    test("Test Total redux", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );

      const reduxCartTotal = screen.getByTestId("testTotalRedux");
      expect(reduxCartTotal).toBeInTheDocument();
      expect(reduxCartTotal.innerHTML).toEqual("<p>Total: 5899.9 $</p>"); //
    });

    test("Test Increment button redux", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );

      const reduxItem2Inc = screen.getByTestId("reduxItem2Inc");
      expect(reduxItem2Inc).toBeInTheDocument();
      act(() => reduxItem2Inc.click());
      expect(screen.getByTestId("reduxItem2Amount").innerHTML).toEqual("4");
      expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("11");
      expect(screen.getByTestId("testTotalRedux").innerHTML).toEqual(
        "<p>Total: 6599.89 $</p>"
      );
    });

    test("Test Descrement button redux", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );

      const reduxItem1Dec = screen.getByTestId("reduxItem1Dec");
      expect(reduxItem1Dec).toBeInTheDocument();
      act(() => reduxItem1Dec.click());
      expect(screen.getByTestId("reduxItem1Amount").innerHTML).toEqual("1");
      expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("10");
      expect(screen.getByTestId("testTotalRedux").innerHTML).toEqual(
        "<p>Total: 6099.9 $</p>"
      );
    });
    test("Test Remove button redux", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );

      const reduxItem3Remove = screen.getByTestId("reduxItem3Remove");
      expect(reduxItem3Remove).toBeInTheDocument();
      expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("10");
      const reduxItem3Amount = screen.queryByTestId("reduxItem3Amount");
      expect(reduxItem3Amount.innerHTML).toEqual("4");
      act(() => reduxItem3Remove.click());
      expect(reduxItem3Amount).not.toBeInTheDocument();
      expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("6");
      expect(screen.getByTestId("testTotalRedux").innerHTML).toEqual(
        "<p>Total: 3699.94 $</p>"
      );
    });

    test("Test Clear button redux", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );
      expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("6");

      expect(screen.getByTestId("testTotalRedux").innerHTML).toEqual(
        "<p>Total: 3699.94 $</p>"
      );
      const reduxClearButton = screen.getByTestId("clearButtonRedux");

      act(() => reduxClearButton.click());
      expect(screen.getByTestId("testCountRedux").innerHTML).toEqual("0");
      expect(screen.getByTestId("testTotalRedux").innerHTML).toEqual(
        "<p>Your cart is empty!</p>"
      );
    });
  });
  //
  describe("Test useState part", () => {
    test("Test everything at once ", () => {
      render(
        <Provider store={store}>
          <IndexPage />
        </Provider>
      );
      expect(screen.getByTestId("testCountState").innerHTML).toEqual("10");
      expect(screen.getByTestId("testTotalState").innerHTML).toEqual(
        "<p>Total: 5899.9 $</p>"
      );
      const stateItem2Inc = screen.getByTestId("stateItem2Inc");
      expect(stateItem2Inc).toBeInTheDocument();
      act(() => stateItem2Inc.click());
      act(() => stateItem2Inc.click());
      expect(screen.getByTestId("stateItem2Amount").innerHTML).toEqual("5");
      expect(screen.getByTestId("testCountState").innerHTML).toEqual("12");
      expect(screen.getByTestId("testTotalState").innerHTML).toEqual(
        "<p>Total: 7299.88 $</p>"
      );
      const stateItem2Dec = screen.getByTestId("stateItem2Dec");
      expect(stateItem2Dec).toBeInTheDocument();
      act(() => stateItem2Dec.click());
      act(() => stateItem2Dec.click());
      act(() => stateItem2Dec.click());
      expect(screen.getByTestId("stateItem2Amount").innerHTML).toEqual("2");
      expect(screen.getByTestId("testCountState").innerHTML).toEqual("9");
      expect(screen.getByTestId("testTotalState").innerHTML).toEqual(
        "<p>Total: 5199.91 $</p>"
      );
      const stateItem0Amount = screen.queryByTestId("stateItem0Amount");
      expect(stateItem0Amount).toBeInTheDocument();
      const stateItem0Remove = screen.getByTestId("stateItem0Remove");
      expect(stateItem0Remove).toBeInTheDocument();
      act(() => stateItem0Remove.click());
      expect(stateItem0Amount).not.toBeInTheDocument();
      expect(stateItem0Remove).not.toBeInTheDocument();

      const stateItem1Amount = screen.queryByTestId("stateItem1Amount");
      expect(stateItem1Amount).toBeInTheDocument();
      const stateClearButton = screen.getByTestId("clearButtonState");
      expect(stateClearButton).toBeInTheDocument();
      act(() => stateClearButton.click());
      expect(stateItem1Amount).not.toBeInTheDocument();

      expect(screen.getByTestId("testCountState").innerHTML).toEqual("0");
      expect(screen.getByTestId("testTotalState").innerHTML).toEqual(
        "<p>Your cart is empty!</p>"
      );
    });
  });
});
