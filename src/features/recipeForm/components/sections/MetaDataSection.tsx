import { useState, useEffect, use } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import * as filtersApi from "@/utils/backend/api/";
import { FilterOptionType } from "@/types";
import { updateMetadataField, selectMetadata, setCurrentSection, toggleFilter, setFilterList } from "@/features/recipeForm";
import SectionWrapper from "../shared/SectionWrapper";
import { Input, ToggleButton, Header, Loading, Error, ButtonRow } from "@/components";

type Props = {
  handleNavigation?: (action: () => void) => void
};

const MetaDataSection = ({ handleNavigation }: Props) => {

  const metadata = useAppSelector(selectMetadata)
  const typeFilters = useAppSelector(state => state.recipeForm.typeFilterList);
  const cuisineFilters = useAppSelector(state => state.recipeForm.cuisineFilterList);

  const dispatch = useAppDispatch()

  const [localMetadata, setLocalMetadata] = useState({
    title: metadata.title,
    subtitle: metadata.subtitle,
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFilterToggle = (filterCategory: "types" | "cuisines", filter: FilterOptionType) => {
    dispatch(toggleFilter({ filterCategory, filter }));
  };

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
          filtersApi.getMainIngredients(),
          filtersApi.getCuisines(),
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

  return (
    <SectionWrapper>
      <Header title="Create Recipe" />
      <div className="h-[60vh] flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-2">
          {loading ?
            <Loading />
            :
            error ? <Error />
              : <>
                <Input
                  required={true}
                  id="recipeTitle"
                  label="Recipe title"
                  placeholder="Meatballs"
                  value={localMetadata.title}
                  onChange={(e) =>
                    setLocalMetadata(prev => ({ ...prev, title: e.target.value }))
                  }
                  onBlur={() => {
                    if (localMetadata.title !== metadata.title) {
                      dispatch(updateMetadataField({ key: "title", value: localMetadata.title }));
                    }
                  }}
                />
                <Input
                  id="recipeSubtitle"
                  label="Recipe description"
                  multiline={true}
                  placeholder="Meatballs & potatoes with gravy, lingonberry jam & pickles. "
                  value={localMetadata.subtitle ?? ""}
                  onChange={(e) =>
                    setLocalMetadata(prev => ({ ...prev, subtitle: e.target.value }))
                  }
                  onBlur={() => {
                    if (localMetadata.subtitle !== metadata.subtitle) {
                      dispatch(updateMetadataField({ key: "subtitle", value: localMetadata.subtitle }));
                    }
                  }}
                />
                <div className="flex flex-col">
                  <span className="label">Include in weekly lists:</span>
                  <ToggleButton
                    isToggled={metadata.includeWeekly}
                    onToggle={() => { dispatch(updateMetadataField({ key: "includeWeekly", value: !metadata.includeWeekly })) }}
                  />
                </div>
                <div className="">
                  <Header title="Select types" headerType="sub-header" />
                  <ButtonRow
                    selected={metadata.types}
                    items={typeFilters}
                    onClick={handleFilterToggle}
                    filterCategory="types"
                    largePattern={true}
                  />
                </div>
                <div className="">
                  <Header title="Select cuisines" headerType="sub-header" />
                  <ButtonRow
                    selected={metadata.cuisines}
                    items={cuisineFilters}
                    onClick={handleFilterToggle}
                    filterCategory="cuisines"
                    reverse={true}
                  />
                </div>
              </>}
        </div>
      </div>
      {handleNavigation && (
        <div className="w-full flex justify-end space-x-2 md:hidden">
          <button
            type="button"
            disabled={loading || error}
            className="w-1/2 bg-primary font-medium text-primary-text rounded disabled:opacity-50"
            onClick={() =>
              handleNavigation(() => dispatch(setCurrentSection("Ingredients")))
            }
          >
            Next
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default MetaDataSection;