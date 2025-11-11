import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchRecipesAPI } from '@/utils/backend/api/recipes';
import { getCuisines, getMainIngredients } from '@/utils/backend/api/filters';
import { RecipeType, FilterOptionType, } from '@/types';
import { PageContainer, Heading, Loading, Error } from "@/components";
import { RecipeList } from "@/features/recipeList";
import { setFilterList, setActiveFilter, setActiveSorting, Filters, type SortingFilterType } from '@/features/filters';
import { useLanguage, } from '@/contexts';
import { translateText } from '@/utils';



const HomePage = () => {

  const { language } = useLanguage()
  const dispatch = useAppDispatch();
  const typeFilters = useAppSelector(state => state.filters.typeFilters);
  const cuisineFilters = useAppSelector(state => state.filters.cuisineFilters);
  const selectedTypeFilters = useAppSelector(state => state.filters.selectedTypeFilters);
  const selectedCuisineFilters = useAppSelector(state => state.filters.selectedCuisineFilters);
  const selectedSortingFilter = useAppSelector(state => state.filters.selectedSortingFilter);
  const [recipeList, setRecipeList] = useState<RecipeType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    const loadRecipes = async () => {

      setLoading(true);
      setError(false)
      try {
        const fetchedRecipes = await fetchRecipesAPI();
        if (fetchedRecipes.data) {
          setRecipeList(fetchedRecipes.data);
        }

      } catch (error) {
        console.error("Failed to load recipes:", error);
        setError(true)
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [selectedCuisineFilters, selectedTypeFilters, selectedSortingFilter]);


  useEffect(() => {
    const shouldFetchTypes = typeFilters.length === 0;
    const shouldFetchCuisines = cuisineFilters.length === 0;

    if (!shouldFetchTypes && !shouldFetchCuisines) {
      setLoading(false);
      return;
    }

    const loadFilters = async () => {
      setError(false);
      setLoading(true);

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          getMainIngredients(),
          getCuisines(),
        ]);

        if (typesResult.success && typesResult.data) {
          dispatch(setFilterList({ filterCategory: "types", list: typesResult.data }));
        }

        if (cuisinesResult.success && cuisinesResult.data) {
          dispatch(setFilterList({ filterCategory: "cuisines", list: cuisinesResult.data }));
        }

      } catch (err) {
        console.error("Failed to fetch filter options", err);
        setError(true);
      }

      setLoading(false);
    };

    loadFilters();
  }, [typeFilters, cuisineFilters]);

  const handleToggleFilter = (filterCategory: "types" | "cuisines", filter: FilterOptionType) => {
    dispatch(setActiveFilter({ filterCategory, filter }));
  };

  const handleSetSorting = (sorting: SortingFilterType) => {
    dispatch(setActiveSorting(sorting));
  };

  return (
    <PageContainer>
      <Filters
        typeFilters={typeFilters}
        cuisineFilters={cuisineFilters}
        selectedTypeFilters={selectedTypeFilters}
        selectedCuisineFilters={selectedCuisineFilters}
        selectedSortingFilter={selectedSortingFilter}
        onToggleFilter={handleToggleFilter}
        onSetSorting={handleSetSorting}
      />
      <div className="my-3 px-3">
        <Heading title={translateText('homePage', 'recipe', language)} />
        <div className="">
          {loading ?
            <Loading />
            : error ?
              <Error /> :
              <>
                <RecipeList recipeList={recipeList} />
              </>}
        </div>
      </div>
    </PageContainer>
  );

}

export default HomePage;