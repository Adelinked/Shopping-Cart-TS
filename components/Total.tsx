import "font-awesome/css/font-awesome.min.css";
import { Item } from "../interfaces";
interface TotalPropos {
  items: Item[];
  testId: string;
}
export const Total = (props: TotalPropos): JSX.Element => {
  const money = parseFloat(
    props.items
      .reduce((prev, curr) => prev + curr.amount * Number(curr.price), 0)
      .toFixed(2)
  );
  return (
    <div className="total" data-testid={props.testId}>
      {money > 0 ? <p>Total: {money} $</p> : <p>Your cart is empty!</p>}
    </div>
  );
};
