import Head from "next/head";
import Link from "next/link";
import { ItemComp } from "../components/ItemComp";
import { Nav } from "../components/Nav";
import { Total } from "../components/Total";
import { useState } from "react";

import { useSelector, connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setCount } from "../store/actions/countAction";
import { setCart } from "../store/actions/cartAction";
import { cartInter, countInter } from "../interfaces";

export function PageTwo(props) {
  const [cartLocal, setCartLocal] = useState([]);

  const count = useSelector((state: countInter) => state.count);
  const cart = useSelector((state: cartInter) => state.cart);
  const handleInc = (id) => {
    setCartLocal(
      cartLocal.map((i) => {
        if (i.id === id) {
          return { ...i, amount: i.amount + 1 };
        } else return { ...i };
      })
    );
  };
  const handleDec = (id) => {
    setCartLocal(
      cartLocal
        .map((i) => {
          if (i.id === id) {
            return { ...i, amount: i.amount === 0 ? 0 : i.amount - 1 };
          } else return { ...i };
        })
        .filter((i) => i.amount !== 0)
    );
  };

  const handleRemove = (id) => {
    setCartLocal(cartLocal.filter((i) => i.id !== id));
  };

  const handleClear = () => {
    setCartLocal([]);
  };

  return (
    <div className="container">
      <Head>
        <title>Cart with Redux | Page II</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="comparaison">
          <div className="itemsCont">
            <a href="/">Adel</a>
            <Nav
              items={cartLocal}
              title="With useState"
              testId="page2StateCount"
            />
            {cartLocal.map((i, index) => (
              <ItemComp
                key={i.id}
                item={i}
                handleInc={handleInc}
                handleDec={handleDec}
                handleRemove={handleRemove}
                testId={"page2StateItem" + index}
              />
            ))}
            {cartLocal.length > 0 && <hr className="hr" />}
            <div className="totalClear">
              <Total items={cartLocal} testId="page2TotalState" />
              {cartLocal.length > 0 && (
                <button onClick={handleClear} className="clearButton">
                  Clear cart
                </button>
              )}
            </div>
          </div>
          <div className="itemsCont">
            <Nav
              items={cart.cart}
              title="With Redux"
              testId="page2CountRedux"
            />
            {cart.cart.map((i, index) => (
              <ItemComp
                key={i.id}
                item={i}
                handleInc={() => props.setCart("INC_ITEM", i.id)}
                handleDec={() => props.setCart("DEC_ITEM", i.id)}
                handleRemove={() => props.setCart("REMOVE_ITEM", i.id)}
                testId={"page2ReduxItem" + index}
              />
            ))}
            {cart.cart.length > 0 && <hr className="hr" />}
            <div className="totalClear">
              <Total items={cart.cart} testId="page2TotalRedux" />
              {cart.cart.length > 0 && (
                <button
                  onClick={() => props.setCart("CLEAR_CART", null)}
                  className="clearButton"
                  data-testid="clearButtonRedux"
                >
                  Clear cart
                </button>
              )}
            </div>
          </div>
        </div>
        <Link href="/">
          <a style={{ textAlign: "center", marginBottom: "20px" }}>
            Go back to Home
          </a>
        </Link>
      </main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCount: bindActionCreators(setCount, dispatch),
    setCart: bindActionCreators(setCart, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(PageTwo);
