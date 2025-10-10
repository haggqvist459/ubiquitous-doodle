import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components";
import { updateField } from "@/features/recipeForm";



const MetaDataSection = () => {

  const metadata = useAppSelector(state => ({
    title: state.recipeForm.recipeDraft.title,
    subtitle: state.recipeForm.recipeDraft.subtitle,
    type: state.recipeForm.recipeDraft.type,
    cuisine: state.recipeForm.recipeDraft.cuisine,
    includeWeekly: state.recipeForm.recipeDraft.includeWeekly,
  }));

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
        onBlur={() => { }}

      />
    </SectionWrapper>
  );
}

export default MetaDataSection;