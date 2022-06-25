import "font-awesome/css/font-awesome.min.css";
import { Item } from "../interfaces";
interface ItemCompProps {
  item: Item;
  handleRemove: (id: string) => void;
  handleInc: (id: string) => void;
  handleDec: (id: string) => void;
  testId: string;
}

export const ItemComp = ({
  item,
  handleRemove,
  handleInc,
  handleDec,
  testId,
}: ItemCompProps): JSX.Element => {
  return (
    <div className="items">
      <div className="item">
        <img
          style={{ width: "80px", justifyContent: "center" }}
          src={item.img}
        ></img>
        <div className="itemText">
          <p>{item.title} </p>
          <p>{item.price}$</p>
          <span
            onClick={() => handleRemove(item.id)}
            style={{ fontWeight: "600", cursor: "pointer" }}
            data-testid={testId + "Remove"}
          >
            Remove
          </span>
        </div>
      </div>
      <div className="amount">
        <i
          className="fa fa-arrow-up"
          onClick={() => handleInc(item.id)}
          style={{ cursor: "pointer" }}
          data-testid={testId + "Inc"}
        ></i>
        <span data-testid={testId + "Amount"}>{item.amount}</span>
        <i
          className="fa fa-arrow-down"
          onClick={() => handleDec(item.id)}
          style={{ cursor: "pointer" }}
          data-testid={testId + "Dec"}
        ></i>
      </div>
    </div>
  );
};
