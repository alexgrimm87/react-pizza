import {ChangeEvent, FC, useCallback, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/filter/slice";
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  )

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="search">
          <path
            d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
        </g>
      </svg>
      <input ref={inputRef}
             value={value}
             onChange={onChangeInput}
             className={styles.input}
             placeholder="Search entire store here..."/>
      {value && (
        <svg onClick={onClickClear}
             className={styles.clearIcon}
             viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
        </svg>
      )}
    </div>
  )
}

export default Search;
