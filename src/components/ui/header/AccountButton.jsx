import Button from "@components/ui/common/Button";
import { SessionContext } from "@context/SessionContext";
import { signOut } from "@src/supabase/auth/auth";
import { useContext } from "react";
import { useNavigate } from "react-router";

const AccountButton = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut();
    navigate("/");
  };
  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <div>
      {session ? (
        <Button onClick={handleLogOut}>로그아웃</Button>
      ) : (
        <Button onClick={handleLogIn}>로그인</Button>
      )}
    </div>
  );
};
export default AccountButton;
