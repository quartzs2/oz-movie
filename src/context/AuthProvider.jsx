import supabase from "@src/supabase/supabaseClient";
import { useEffect, useState } from "react";

import { SessionContext } from "./SessionContext";

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) {
      console.error("Supabase가 초기화되지 않음");
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export default AuthProvider;
