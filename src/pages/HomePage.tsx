import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchFilteredRecipesAPI } from '@/utils/backend/api/recipes';
import { getCuisines, getMainIngredients } from '@/utils/backend/api/filters';
import { RecipeType, FilterOptionType, } from '@/types';
import { PageContainer, Heading, LoadingComponent, ErrorComponent } from "@/components";
import { RecipeList } from "@/features/recipeList";
import { setFilterList, setActiveFilter, setActiveSorting, Filters, type SortingFilterKey } from '@/features/filters';
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
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setLoading(true);
    setError(false)

    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchFilteredRecipesAPI({
          sortingFilter: selectedSortingFilter,
          typeFilters: selectedTypeFilters,
          cuisineFilters: selectedCuisineFilters,
          language
        });

        setRecipeList(fetchedRecipes);

      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to load recipes:", error);
          setError(true)
          setErrorMessage(error.message)
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [selectedCuisineFilters, selectedTypeFilters, selectedSortingFilter]);


  useEffect(() => {
    setError(false);
    setLoading(false);

    const loadFilters = async () => {
      setLoading(true);

      try {
        const [typesResult, cuisinesResult] = await Promise.all([
          getMainIngredients(language),
          getCuisines(language),
        ]);

        dispatch(setFilterList({ filterCategory: "types", list: typesResult }));
        dispatch(setFilterList({ filterCategory: "cuisines", list: cuisinesResult }));

      } catch (error) {
        console.error("Failed to fetch filter options", error);
        if (error instanceof Error) {
          setErrorMessage(error.message)
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, [language]);

  const handleToggleFilter = (filterCategory: "types" | "cuisines", filter: FilterOptionType) => {
    dispatch(setActiveFilter({ filterCategory, filter }));
  };

  const handleSetSorting = (sorting: SortingFilterKey) => {
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
            <LoadingComponent />
            : error ?
              <ErrorComponent errorMessage={errorMessage} /> :
              <>
                <RecipeList recipeList={recipeList} />
              </>}
        </div>
      </div>
    </PageContainer>
  );

}

export default HomePage;