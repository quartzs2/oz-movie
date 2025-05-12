import supabase from "@src/supabase/supabaseClient";

export const logIn = async ({ email, password }) => {
  await supabase.auth
    .signInWithPassword({
      email,
      password,
    })
    .then(() => {
      console.log("로그인 성공!!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signUp = async ({ email, name, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const userData = await supabase.from("user_table").insert({
    created_at: data.user?.created_at,
    email: data.user?.email,
    id: data.user?.id,
    name,
  });

  console.log(userData);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
