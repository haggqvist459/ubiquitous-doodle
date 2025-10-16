import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateMetadataField, selectMetadata, CUISINE_OPTIONS, TYPE_OPTIONS } from "@/features/recipeForm";
import SectionWrapper from "./SectionWrapper";
import { Input, Dropdown, createDropdownOptions, ToggleButton, Header } from "@/components";




const MetaDataSection = () => {

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
      <Header title="Create Recipe"/>
      <Input
        id="recipeTitle"
        label="Recipe name"
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
        onChange={(e) => {
          const selected = e.target.value === "" ? null : e.target.value;
          dispatch(updateMetadataField({ key: "type", value: selected }));
        }}
        options={typeOptions}
        value={metadata.type ?? ''}
      />
      <div className="flex flex-col">
        <label htmlFor="includeWeekly" className="label">Include in weekly lists:</label>
        <ToggleButton
          isToggled={metadata.includeWeekly}
          onToggle={() => { dispatch(updateMetadataField({ key: "includeWeekly", value: !metadata.includeWeekly })) }}
        />
      </div>
    </SectionWrapper>
  );
}

export default MetaDataSection;