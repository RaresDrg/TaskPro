import styled from "styled-components";
import EditUserModal from "./EditUserModal";

const StyledEditUserModal = styled(EditUserModal)`
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

export default StyledEditUserModal;
