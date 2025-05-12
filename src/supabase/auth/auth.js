import supabase from "@src/supabase/supabaseClient";

export const logIn = async ({ email, password }) => {
  await supabase.auth
    .signInWithPassword({
      email,
      password,
    })
    .catch((error) => {
      throw error;
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

  await supabase.from("user_table").insert({
    created_at: data.user?.created_at,
    email: data.user?.email,
    id: data.user?.id,
    name,
  });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });

  if (error) {
    throw error;
  }

  // TODO: 작동되는지 확인 필요
  if (data.user?.id) {
    await supabase.from("user_table").upsert(
      {
        created_at: data.user?.created_at,
        email: data.user?.email,
        id: data.user?.id,
        name: data.user?.user_metadata?.name,
      },
      { ignoreDuplicates: true, onConflict: "id" }
    );
  }
};
