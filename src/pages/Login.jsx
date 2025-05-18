import Button from "@components/ui/common/Button";
import LabeledInput from "@components/ui/common/LabeledInput";
import { MAIN_URL } from "@constants/urls";
import { logIn, signInWithKakao } from "@src/supabase/auth/auth";
import { validateEmail, validatePassword } from "@utils/validator";
import { useState } from "react";
import { useNavigate } from "react-router";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError.length && !passwordError.length) {
      const { error } = await logIn({ email: formData.email, password: formData.password });

      if (error) {
        alert("오류가 발생했습니다.");
      } else {
        navigate(MAIN_URL);
      }
    }
  };

  const handleKakaoLogIn = async () => {
    const { error } = await signInWithKakao();

    if (error) {
      alert("카카오 로그인에 실패했습니다.");
    }
  };

  const INPUT_DATA = [
    {
      error: errors.email,
      onChange: (e) => setFormData((prev) => ({ ...prev, email: e.target.value })),
      placeholder: "email을 입력해주세요",
      title: "email",
      value: formData.email,
    },
    {
      error: errors.password,
      onChange: (e) => setFormData((prev) => ({ ...prev, password: e.target.value })),
      placeholder: "영문 대문자/소문자 + 숫자의 조합 사용",
      title: "비밀번호",
      type: "password",
      value: formData.password,
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="mb-8 text-2xl">로그인</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {INPUT_DATA.map((data) => (
          <LabeledInput key={data.title} {...data} />
        ))}
        <Button className={"mt-4"} type="submit">
          로그인
        </Button>
        <Button onClick={handleKakaoLogIn}>카카오 로그인</Button>
        <div className="text-sm flex items-center mt-4">
          오즈 무비가 처음이신가요?{" "}
          <Button className={"bg-white text-black underline"} onClick={() => navigate("/signup")}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
