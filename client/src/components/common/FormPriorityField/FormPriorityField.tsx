import { Field } from "formik";
import { CARD_PRIORITIES } from "../../../constants/constants";
import Tippy from "@tippyjs/react";

type Props = {
  className?: string;
};

const FormPriorityField = ({ className: styles }: Props) => {
  return (
    <div className={styles}>
      <h3>Priority</h3>
      <div className="radio-options">
        {CARD_PRIORITIES.map((item) => (
          <Tippy key={item} content={item} theme="material">
            <label>
              <Field type="radio" value={item} name="priority" />
            </label>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

export default FormPriorityField;
