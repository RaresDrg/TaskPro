import styled from "styled-components";
import EditBoardModal from "./EditBoardModal";

const StyledEditBoardModal = styled(EditBoardModal)`
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

export default StyledEditBoardModal;
