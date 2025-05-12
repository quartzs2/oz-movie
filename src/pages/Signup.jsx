import Button from "@components/ui/common/Button";
import LabeledInput from "@components/ui/common/LabeledInput";
import { signUp } from "@src/supabase/auth/auth";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from "@utils/validator";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const nameError = validateName(formData.name);
    const passwordError = validatePassword(formData.password);
    const passwordConfirmError = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirm
    );

    setErrors({
      email: emailError,
      name: nameError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
    });

    if (
      !errors.email.length &&
      !errors.password.length &&
      !errors.name.length &&
      !errors.passwordConfirm.length
    ) {
      try {
        signUp({ email: formData.email, name: formData.name, password: formData.password });
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
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
      error: errors.name,
      onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
      placeholder: "2~8자, 숫자, 한글, 영어만 사용",
      title: "이름",
      value: formData.name,
    },
    {
      error: errors.password,
      onChange: (e) => setFormData((prev) => ({ ...prev, password: e.target.value })),
      placeholder: "영문 대문자/소문자 + 숫자의 조합 사용",
      title: "비밀번호",
      type: "password",
      value: formData.password,
    },
    {
      error: errors.passwordConfirm,
      onChange: (e) => setFormData((prev) => ({ ...prev, passwordConfirm: e.target.value })),
      placeholder: "비밀번호를 입력해주세요.",
      title: "비밀번호 확인",
      type: "password",
      value: formData.passwordConfirm,
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="mb-8 text-2xl">회원가입</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {INPUT_DATA.map((data) => (
          <LabeledInput key={data.name} {...data} />
        ))}
        <Button type="submit">회원가입</Button>
      </form>
    </div>
  );
};
export default SignUp;
