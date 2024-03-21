import { IconSearch } from "../icons";
import cs from "classnames";
import styles from "./style.module.css";
import { useSearch } from "./hooks";
import { SearchProps } from "./types";

const SearchInput = ({ onChange, onSelect, results }: SearchProps) => {
  const {
    searchBox,
    handleChange,
    handleFocus,
    searchValue,
    searchResults,
    setSearchValue
  } = useSearch({ onChange, onSelect, results });

  return (
    <div className="w-3/6 relative" id="search-wrapper">
      <div
        ref={searchBox}
        className="
        border
        border-slate-200
        rounded-3xl
        overflow-hidden
        flex
        items-center
        shadow-md
        bg-white
        "
      >
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          className="py-2 px-4 outline-none w-full"
          onChange={(e) => handleChange(e)}
          onFocus={handleFocus}
          value={searchValue}
        />
        <div className="w-9 flex justify-start">
          <IconSearch size={20} />
        </div>
      </div>
      <div
        ref={searchResults}
        className={cs(
          "border-t-2 " +
            "pb-1 " +
            "overflow-hidden " +
            "absolute " +
            "left-0 " +
            "right-0 " +
            "top-10 " +
            "z-20 " +
            "border " +
            "border-slate-200 " +
            "rounded-3xl " +
            "shadow-md " +
            "bg-white",
          styles.results,
        )}
      >
        {results.map((result, index) => {
          return (
            <div
              key={result.id}
              className="py-2 px-3 flex items-center cursor-pointer search-result"
              onClick={() => {
                setSearchValue(result.name);
                onSelect(result);
              }}
              id={`${index}`}
            >
              <IconSearch size={16} className="mr-1.5" />
              <p
                className="font-semibold "
              >
                {result.name}
              </p>
            </div>
          );
        })}
      </div >
    </div>
  );
};

export default SearchInput;
