import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addInstruction, updateInstructionField, removeInstruction, selectInstructions, setCurrentSection } from "@/features/recipeForm";
import { Input, Header, Trashcan, } from "@/components";
import SectionWrapper from "../shared/SectionWrapper";

type Props = {
  handleNavigation?: (action: () => void) => void;
};


const InstructionSection = ({ handleNavigation}: Props) => {

  const instructions = useAppSelector(selectInstructions);
  const [localInstructions, setLocalInstructions] = useState(instructions);
  const dispatch = useAppDispatch();


  useEffect(() => {
    setLocalInstructions(instructions);
  }, [instructions]);

  const handleInstructionChange = (
    id: string,
    key: keyof (typeof localInstructions)[number],
    value: string
  ) => {
    setLocalInstructions((prev) =>
      prev.map((instruction) =>
        instruction.id === id ? { ...instruction, [key]: value } : instruction
      )
    );
  };

  const handleInstructionDispatch = (id: string, key: keyof (typeof localInstructions)[number]) => {
    const instruction = localInstructions.find(item => item.id === id);
    if (!instruction) return;

    // dispatch the field update to Redux
    dispatch(updateInstructionField({ id, key, value: instruction[key] }));
  };

  return (
    <SectionWrapper>
      <Header title="Add instructions" />
      <div className="h-[60vh] flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-2">
          {localInstructions.map((instruction) => (
            <div
              key={`${instruction.id}-instruction`}
              className="">
              <div className="flex items-end space-between space-x-1 mt-2">
                <Input
                  id={`${instruction.id}-instructionTitle`}
                  placeholder="Cook potatoes"
                  label={`Instruction ${instruction.order}`}
                  value={instruction.title}
                  onChange={(e) => handleInstructionChange(instruction.id, "title", e.target.value)}
                  onBlur={() => handleInstructionDispatch(instruction.id, "title")}
                  required={true}
                />
                <button
                  type="button"
                  className="mb-0.5 mr-1 disabled:opacity-50"
                  disabled={localInstructions.length === 1}
                  onClick={() => dispatch(removeInstruction({ id: instruction.id }))}
                >
                  <Trashcan />
                </button>
              </div>
              <div className="mt-2">
                <Input
                  id={`${instruction.id}-text`}
                  placeholder="Boil water, add potaoes, cook until done."
                  value={instruction.text}
                  multiline={true}
                  required={true}
                  rows={3}
                  onChange={(e) => handleInstructionChange(instruction.id, 'text', e.target.value)}
                  onBlur={() => handleInstructionDispatch(instruction.id, 'text')}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="primary-button mt-2"
          onClick={() => dispatch(addInstruction())}
        >
          Add Instruction
        </button>
      </div>
      {handleNavigation && (
        <div className="w-full flex space-x-2 md:hidden">
          <button
            type="button"
            className="w-1/2 bg-secondary font-medium text-primary-text rounded"
            onClick={() => dispatch(setCurrentSection("Ingredients"))}
          >
            Back
          </button>
          <button
            type="button"
            className="w-1/2 bg-primary font-medium text-primary-text rounded"
            onClick={() => handleNavigation(() => dispatch(setCurrentSection("Preview")))}
          >
            Preview
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default InstructionSection;