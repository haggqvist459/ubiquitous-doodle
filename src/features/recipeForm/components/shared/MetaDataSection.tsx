import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { updateMetadataField, selectMetadata } from "@/features/recipeForm";
import SectionWrapper from "./SectionWrapper";
import { Input, Dropdown, createDropdownOptions } from "@/components";




const MetaDataSection = () => {

  const metadata = useAppSelector(selectMetadata)
  const dispatch = useAppDispatch()

  const [localMetadata, setLocalMetadata] = useState(metadata);

  return (
    <SectionWrapper>
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
    </SectionWrapper>
  );
}

export default MetaDataSection;