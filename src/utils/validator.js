export const validateEmail = (email) => {
  const emailRegex = /[\w-.]+@[\w-.]+/g;
  if (email.trim().length === 0) {
    return "필수 항목입니다.";
  } else if (!emailRegex.test(email)) {
    return "잘못된 이메일 형식입니다.";
  } else {
    return "";
  }
};

export const validateName = (name) => {
  const nameRegex = /^[A-Za-zㄱ-ㅎ가-힣0-9]{2,8}$/;
  if (name.trim().length === 0) {
    return "필수 항목입니다.";
  } else if (!nameRegex.test(name)) {
    return "2~8자 사이 숫자, 한글, 영어로 입력해주세요.";
  } else {
    return "";
  }
};

export const validatePassword = (password) => {
  const passwordRegex = /^[A-Za-z0-9]+$/;
  if (password.trim().length === 0) {
    return "필수 항목입니다.";
  } else if (password.trim().length < 6) {
    return "비밀번호는 적어도 6자 이상이어야 합니다.";
  } else if (!passwordRegex.test(password)) {
    return "영문 대/소문자, 숫자를 사용해서 입력해주세요.";
  } else {
    return "";
  }
};

export const validatePasswordConfirm = (password, passwordConfirm) => {
  if (passwordConfirm.trim().length === 0) {
    return "필수 항목입니다.";
  } else if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  } else {
    return "";
  }
};
