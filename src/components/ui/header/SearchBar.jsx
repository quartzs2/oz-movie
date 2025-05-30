import { SEARCH_URL } from "@constants/urls";
import { useDebounce } from "@hooks/useDebounce";
import { cn } from "@utils/cn";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const navigate = useNavigate();
  return (
    <input
      className={cn("flex h-10 w-100 items-center rounded-3xl px-6 shadow-md")}
      onChange={useDebounce((e) => {
        navigate(`${SEARCH_URL}?query=${e.target.value}`);
      })}
      placeholder="검색어를 입력하세요"
    />
  );
};
export default SearchBar;
