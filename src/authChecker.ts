import {AuthChecker} from "type-graphql";
import jsonwebtoken from "jsonwebtoken";
export interface Context {
  jwt: string;
}

export const authChecker: AuthChecker<Context> = ({ context: { jwt } }, roles) => {
  const user = jsonwebtoken.verify(jwt, 'mysupersecretkey');
  console.log(roles);
  return true;
};
