import { Something } from "../interfaces";
export const NewComp = ({
  text,
  important = false,
}: Something): JSX.Element => {
  return (
    <div style={{ color: "purple" }}>
      {text + (important ? " is important" : " is not important")}
    </div>
  );
};
