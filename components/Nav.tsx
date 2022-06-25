import "font-awesome/css/font-awesome.min.css";
import { Item } from "../interfaces";

interface NavProps {
  items: Item[];
  title: string;
  testId: string;
}

export const Nav = ({ items, title, testId }: NavProps): JSX.Element => {
  const count = items.reduce((prev, curr) => prev + curr.amount, 0);
  return (
    <div className="nav">
      <h3>{title}</h3>

      <span className="cart">
        <span className="count" data-testid={testId}>
          {count}
        </span>
        <i className="fa fa-shopping-cart" style={{ fontSize: "35px" }}></i>
      </span>
    </div>
  );
};
