import Button from "@components/ui/common/Button";
import { LOG_IN_URL, MAIN_URL } from "@constants/urls";
import { SessionContext } from "@context/SessionContext";
import { signOut } from "@src/supabase/auth/auth";
import { useContext } from "react";
import { useNavigate } from "react-router";

const AccountButton = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { error } = await signOut();
    if (error) {
      alert("로그아웃에 실패했습니다.");
    } else {
      navigate(MAIN_URL);
    }
  };
  const handleLogIn = () => {
    navigate(LOG_IN_URL);
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
