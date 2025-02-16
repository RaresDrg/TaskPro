import { Field } from "formik";
import { BOARD_BACKGROUNDS } from "../../../constants/constants";

type Props = {
  className?: string;
};

const FormBackgroundField = ({ className: styles }: Props) => {
  return (
    <div className={styles}>
      <h3>Background</h3>
      <div className="radio-options">
        {BOARD_BACKGROUNDS.map((item) => (
          <div key={item}>
            <Field type={"radio"} id={item} value={item} name="background" />
            <label htmlFor={item}>
              <img
                src={`https://res.cloudinary.com/db73szjbz/image/upload/TaskPro/assets/backgrounds/micro/${item}`}
                alt="background"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBackgroundField;
