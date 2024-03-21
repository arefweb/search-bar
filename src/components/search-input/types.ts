import { ChangeEvent } from "react";
import CITY from "../../types/cities";

export interface SearchProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (chosen: CITY) => void;
  results: CITY[];
}