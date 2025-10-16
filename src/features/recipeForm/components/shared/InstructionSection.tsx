import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addInstruction, updateInstructionField, removeInstruction, selectInstructions } from "@/features/recipeForm";
import { Input, Header, Trashcan, } from "@/components";
import SectionWrapper from "./SectionWrapper";


const InstructionSection = () => {

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
      {localInstructions.map((instruction) => (
        <div className="">
          <div className="flex items-end space-between space-x-1">
            <Input
              id={`${instruction.id}-instructionTitle`}
              placeholder="Title"
              label={`Instruction ${instruction.order}`}
              value={instruction.title}
              onChange={(e) => handleInstructionChange(instruction.id, "title", e.target.value)}
              onBlur={() => handleInstructionDispatch(instruction.id, "title")}
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
          <Input
            id={`${instruction.id}-text`}
            placeholder="Boil water, add pasta, cook until done."
            value={instruction.text}
            multiline={true}
            onChange={(e) => handleInstructionChange(instruction.id, 'text', e.target.value)}
            onBlur={() => handleInstructionDispatch(instruction.id, 'text')}
          />
        </div>
      ))}
      <button
        type="button"
        className="primary-button"
        onClick={() => dispatch(addInstruction())}
      >
        Add Instruction
      </button>
    </SectionWrapper>
  );
}

export default InstructionSection;