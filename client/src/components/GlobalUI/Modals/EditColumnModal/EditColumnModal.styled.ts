import styled from "styled-components";
import EditColumnModal from "./EditColumnModal";

const StyledEditColumnModal = styled(EditColumnModal)`
  & {
    .modal-content {
      & {
        > div {
          & {
            > form {
              margin-top: 40px;

              & {
                > div:not(:last-of-type) {
                  margin-bottom: 30px;
                }

                > div:last-of-type {
                  margin-bottom: 40px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledEditColumnModal;
