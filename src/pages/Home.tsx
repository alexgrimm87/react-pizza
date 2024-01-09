import {FC, useCallback, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import qs from 'qs'

import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/slice";
import {selectFilter} from "../redux/filter/selectors";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import {SearchPizzaParams} from "../redux/pizza/types";
import {selectPizzaData} from "../redux/pizza/selectors";
import {useAppDispatch} from "../redux/store";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Mix'];

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-','');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage)
      })
    );
  }

  //If parameters have changed and there was a first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage])


  //If it was the first render, then check the URL parameters and save to redux
  useEffect(() => {
    getPizzas();

    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      //TODO

      // getPizzas();

      // if (
      //   initialState.categoryId === Number(params.categoryId) &&
      //   initialState.selectedSort === params.selectedSort &&
      //   initialState.currentPage === Number(params.currentPage)
      // ) {
      //   getPizzas();
      // }

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0]
      }));

      isSearch.current = true;
    }
  }, [])

  //If there was a first rendering, then request pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} categories={categories} />
        <Sort value={sort}  />
      </div>
      <h2 className="content__title">{categories[categoryId]} {!isNaN(categoryId) ? <span>pizzas</span> : ''}</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error occurred 😕</h2>
          <p>Unfortunately, we were unable to get the pizzas. Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;
