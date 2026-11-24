import styled from "styled-components";
import EditCardModal from "./EditCardModal";

const StyledEditCardModal = styled(EditCardModal)`
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

export default StyledEditCardModal;
