import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { ItemComp } from "../components/ItemComp";
import { Total } from "../components/Total";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { setCount } from "../store/actions/countAction";
import { setCart, fetchItems } from "../store/actions/cartAction";
import { countInter, cartInter } from "../interfaces";
const IndexPage = () => {
  const [cartLocal, setCartLocal] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "./api/items";
  // Redux part
  const dispatch = useAppDispatch();
  const count = useSelector((state: countInter) => state.count);
  const cart = useSelector((state: cartInter) => state.cart);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      setLoading(true);
      const response = await fetch(url, { signal: controller.signal });
      const cartLocal = await response.json();
      setCartLocal(cartLocal);
      controller = null;
      setLoading(false);
    })();
    if (count.count === 0) {
      // to fetch data only once
      dispatch(fetchItems());
      dispatch(setCount("COUNT_INC"));
    }
    return () => controller?.abort();
  }, []);
  const handleInc = (id: string) => {
    setCartLocal(
      cartLocal.map((i) => {
        if (i.id === id) {
          return { ...i, amount: i.amount + 1 };
        } else return { ...i };
      })
    );
  };

  const handleDec = (id: string) => {
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

  const handleRemove = (id: string) => {
    setCartLocal(cartLocal.filter((i) => i.id !== id));
  };

  const handleClear = () => {
    setCartLocal([]);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="comparaison">
          <div className="itemsCont">
            <Nav items={cartLocal} title="With useState" />
            {!loading ? (
              <>
                {cartLocal.map((i) => (
                  <ItemComp
                    key={i.id}
                    item={i}
                    handleInc={handleInc}
                    handleDec={handleDec}
                    handleRemove={handleRemove}
                  />
                ))}
                {cartLocal.length > 0 && <hr className="hr" />}
                <div className="totalClear">
                  <Total items={cartLocal} />
                  {cartLocal.length > 0 && (
                    <button onClick={handleClear} className="clearButton">
                      Clear cart
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: "50%",
                }}
              >
                ...Loading
              </div>
            )}
          </div>
          <div className="itemsCont">
            <Nav items={cart.cart} title="With Redux" />
            {cart.cart.map((i) => (
              <ItemComp
                key={i.id}
                item={i}
                handleInc={() => dispatch(setCart("INC_ITEM", i.id))}
                handleDec={() => dispatch(setCart("DEC_ITEM", i.id))}
                handleRemove={() => dispatch(setCart("REMOVE_ITEM", i.id))}
              />
            ))}
            {cart.cart.length > 0 && <hr className="hr" />}
            <div className="totalClear">
              <Total items={cart.cart} />
              {cart.cart.length > 0 && (
                <button
                  onClick={() => dispatch(setCart("CLEAR_CART", 0))}
                  className="clearButton"
                >
                  Clear cart
                </button>
              )}
            </div>
          </div>
        </div>
        <Link href="/page2">
          <a style={{ textAlign: "center", marginBottom: "20px" }}>
            Go to page II to test
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
};

export default IndexPage;
