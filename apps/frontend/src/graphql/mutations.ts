import { gql } from "@apollo/client";

export const UPLOAD_STATEMENT = gql`
  mutation UploadStatement($file: Upload!, $accountId: ID!) {
    uploadStatement(file: $file, accountId: $accountId) {
      id
      status
      fileUrl
    }
  }
`;
