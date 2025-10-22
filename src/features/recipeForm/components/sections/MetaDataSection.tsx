import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import * as filtersApi from "@/utils/backend/api/";
import { updateMetadataField, selectMetadata, setCurrentSection } from "@/features/recipeForm";
import SectionWrapper from "../shared/SectionWrapper";
import { Input, ToggleButton, Header, Loading, Error, ButtonRow } from "@/components";

type Props = {
  handleNavigation?: (action: () => void) => void
};

const MetaDataSection = ({ handleNavigation }: Props) => {

  const metadata = useAppSelector(selectMetadata)
  const dispatch = useAppDispatch()

  const [localMetadata, setLocalMetadata] = useState({
    title: metadata.title,
    subtitle: metadata.subtitle,
  });

  const [typeOptions, setTypeOptions] = useState<{ id: string; name: string }[]>([]);
  const [cuisineOptions, setCuisineOptions] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadFilters = async () => {
      setError(false);
      setLoading(true);
      const [typesRes, cuisinesRes] = await Promise.all([
        filtersApi.getMainIngredients(),
        filtersApi.getCuisines(),
      ]);
      if (typesRes.success && typesRes.data)
        setTypeOptions(typesRes.data);
      else {
        console.error("Failed to load type filters:", typesRes.error);
        setTypeOptions([]);
        setError(true)
      }

      if (cuisinesRes.success && cuisinesRes.data)
        setCuisineOptions(cuisinesRes.data);
      else {
        console.error("Failed to load cuisine filters:", cuisinesRes.error);
        setCuisineOptions([]);
        setError(true)
      }
      setLoading(false);
    };
    loadFilters();
  }, []);

  return (
    <SectionWrapper>
      <Header title="Create Recipe" />
      <div className="h-[60vh] flex flex-col">
        <div className="flex-grow space-y-2">
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
                    if (localMetadata.title !== metadata.title) {
                      dispatch(updateMetadataField({ key: "title", value: localMetadata.title }));
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
                <Header title="Select types" headerType="sub-header"/>
                <ButtonRow items={typeOptions} largePattern={true}/>
                <Header title="Select cuisines" headerType="sub-header"/>
                <ButtonRow items={cuisineOptions} reverse={true}/>
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