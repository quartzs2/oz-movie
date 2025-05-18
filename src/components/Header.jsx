import AccountButton from "@components/ui/header/AccountButton";
import Logo from "@components/ui/header/Logo";
import SearchBar from "@components/ui/header/SearchBar";
import { cn } from "@utils/cn";

const Header = () => {
  return (
    <div
      className={cn(
        "mx-auto flex h-18 w-full items-center gap-8 px-4 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1532px]"
      )}
    >
      <Logo />
      <SearchBar />
      <AccountButton />
    </div>
  );
};
export default Header;
