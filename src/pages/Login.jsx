import Button from "@components/ui/common/Button";
import LabeledInput from "@components/ui/common/LabeledInput";
import { validateEmail, validatePassword } from "@utils/validator";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!errors.email.length && !errors.password.length) {
      // TODO: 값 전송
      setFormData({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="mb-8 text-2xl">로그인</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <LabeledInput
          error={errors.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          placeholder={"email을 입력해주세요"}
          title={"email"}
          value={formData.email}
        />
        <LabeledInput
          error={errors.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          placeholder={"영문 대문자/소문자 + 숫자의 조합 사용"}
          title={"비밀번호"}
          type={"password"}
          value={formData.password}
        />
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
};
export default Login;
