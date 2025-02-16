import styled from "styled-components";
import FormIconsField from "./FormIconsField";

const StyledFormIconsField = styled(FormIconsField)`
  margin-bottom: 24px;

  & {
    h3 {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: -0.02em;
      color: ${(props) => props.theme.textColor};
      margin-bottom: 14px;
    }

    div.radio-options {
      display: flex;
      gap: 8px;

      & {
        div {
          & {
            input {
              display: none;
            }

            label {
              display: block;
              width: 18px;
              height: 18px;
              cursor: pointer;
              opacity: 0.5;
              color: ${(props) => props.theme.textColor};
              transition: var(--transition);
            }

            input:not(:checked) + label:hover {
              opacity: 0.7;
              transform: scale(1.1);
            }

            input:checked + label {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
`;

export default StyledFormIconsField;
