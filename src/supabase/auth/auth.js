import supabase from "@src/supabase/supabaseClient";

export const logIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async ({ email, name, password }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { data: null, error: authError };
  }

  const { error: insertError } = await supabase.from("user_table").insert({
    created_at: authData.user?.created_at,
    email: authData.user?.email,
    id: authData.user?.id,
    name,
  });

  if (insertError) {
    return { data: null, error: insertError };
  }

  return { data: authData, error: null };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { data: null, error };
};

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });

  return { data, error };
};
