import {ChangeEvent, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import {SearchProps} from "./types";

export const useSearch = ({ onChange, onSelect, results }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const searchBox = useRef<HTMLDivElement>(null);
  const searchResults = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);

  function addStyles() {
    searchBox.current!.classList.add(styles.searchBox);
    searchResults.current!.classList.add(styles.showResults);
  }

  function removeStyles() {
    searchBox.current!.classList.remove(styles.searchBox);
    searchResults.current!.classList.remove(styles.showResults);
  }

  function handleFocus() {
    if (
      results.length > 0 &&
      !searchBox.current!.classList.contains(styles.searchBox)
    ) {
      addStyles();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    onChange(e);
  }

  useEffect(() => {
    if (
      results.length > 0 &&
      !searchBox.current!.classList.contains(styles.searchBox)
    ) {
      addStyles();
    }
    if (results.length === 0) {
      removeStyles();
    }

    const searchInput = document.getElementById('search-input')!;
    let index = -1;
    const resList = Array.from(document.querySelectorAll('.search-result'));
    const addToList = (index: number) => resList[index].classList.add('bg-gray-200');
    const removeFromList = () => resList.forEach((res) => {
      res.classList.remove('bg-gray-200');
    });
    const handleKeydown = (e: KeyboardEvent) => {
      if(e.key === 'ArrowDown') {
        removeFromList();
        if(index === resList.length - 1) {
          index = -1;
        } else {
          index++;
        }
        if(index >= 0) {
          addToList(index);
          setSearchValue(results[index].name);
        }
      }
      if(e.key === 'ArrowUp') {
        e.preventDefault();
        removeFromList();
        if(index ===  -1) {
          index = resList.length - 1;
        } else {
          index--;
        }
        if(index >= 0) {
          addToList(index);
          setSearchValue(results[index].name);
        }
      }
      if(e.key === 'Enter') {
        removeStyles();
        setSearchValue(results[index].name);
        onSelectRef.current(results[index]);
      }
      if(e.key === 'Escape') {
        removeStyles();
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if(target.classList.contains('search-result')) {
        removeFromList();
        index = Number(target.id);
        addToList(index);
        setSearchValue(results[index].name);
      }
    }

    const searchRes = searchResults.current!;

    searchInput.addEventListener('keydown', handleKeydown);
    searchRes.addEventListener('mouseover', handleMouseOver);

    return () => {
      searchInput.removeEventListener('keydown', handleKeydown);
      searchRes.removeEventListener('mouseover', handleMouseOver);
    }
  }, [results]);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      const searchWrapper = document.getElementById('search-wrapper')!;
      if(searchWrapper.contains(e.target as Node)) {
        if(searchResults.current!.contains(e.target as Node)) {
          removeStyles();
        }
      } else {
        removeStyles();
      }
    }

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, []);

  return {
    searchBox,
    handleChange,
    handleFocus,
    searchValue,
    searchResults,
    setSearchValue
  }
}