import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateMetadataField, selectMetadata, CUISINE_OPTIONS, TYPE_OPTIONS, setCurrentSection } from "@/features/recipeForm";
import SectionWrapper from "../shared/SectionWrapper";
import { Input, Dropdown, createDropdownOptions, ToggleButton, Header } from "@/components";

type Props = {
  handleNavigation?: (action: () => void) => void;
};

const MetaDataSection = ({ handleNavigation }: Props) => {

  const metadata = useAppSelector(selectMetadata)
  const dispatch = useAppDispatch()

  const [localMetadata, setLocalMetadata] = useState({
    title: metadata.title,
    subtitle: metadata.subtitle,
  });

  const cuisineOptions = [
    { label: "None", value: null },
    ...createDropdownOptions(CUISINE_OPTIONS),
  ];

  const typeOptions = [
    { label: "None", value: null },
    ...createDropdownOptions(TYPE_OPTIONS),
  ];

  return (
    <SectionWrapper>
      <Header title="Create Recipe" />
      <div className="h-[60vh] flex flex-col">
        <div className="flex-grow space-y-2">
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
          <Dropdown
            id="cuisineDropdown"
            label="Select cuisine"
            onChange={(e) => {
              const selected = e.target.value === "" ? null : e.target.value;
              dispatch(updateMetadataField({ key: "cuisine", value: selected }));
            }}
            options={cuisineOptions}
            value={metadata.cuisine ?? ''}
          />
          <Dropdown
            id="typeDropdown"
            label="Select type*"
            required={true}
            onChange={(e) => {
              const selected = e.target.value === "" ? null : e.target.value;
              dispatch(updateMetadataField({ key: "type", value: selected }));
            }}
            options={typeOptions}
            value={metadata.type ?? ''}
          />
          <div className="flex flex-col">
            <span className="label">Include in weekly lists:</span>
            <ToggleButton
              isToggled={metadata.includeWeekly}
              onToggle={() => { dispatch(updateMetadataField({ key: "includeWeekly", value: !metadata.includeWeekly })) }}
            />
          </div>
        </div>
      </div>
      {handleNavigation && (
        <div className="w-full flex justify-end space-x-2 md:hidden">
          <button
            type="button"
            className="w-1/2 bg-primary font-medium text-primary-text rounded"
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