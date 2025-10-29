import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addInstruction, updateInstructionField, removeInstruction, selectInstructions, setCurrentSection, setInstructions } from "@/features/recipeForm";
import { Input, Header, Trashcan, ToggleButton, FadeWrapper } from "@/components";
import SectionWrapper from "../shared/SectionWrapper";
import { parseInstructionList } from "../../utils/ParseInstructions";

type Props = {
  handleNavigation?: (action: () => void) => void;
};


const InstructionSection = ({ handleNavigation }: Props) => {

  const instructions = useAppSelector(selectInstructions);
  const [localInstructions, setLocalInstructions] = useState(instructions);
  const [displayPasteView, setDisplayPasteView] = useState(true)
  const [pastedText, setPastedText] = useState("");
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
    dispatch(updateInstructionField({ id, key, value: instruction[key] }));
  };

  const handleParsedInstructions = () => {
    const instructionList = parseInstructionList(pastedText)
    dispatch(setInstructions(instructionList))
    setDisplayPasteView(false)
  }

  return (
    <SectionWrapper>
      <div className="flex justify-between">
        <Header title="Add Instructions" />
        <div className="flex flex-col items-end pr-2">
          <span className="text-sm font-medium">Simplified entry</span>
          <ToggleButton isToggled={displayPasteView} onToggle={() => { setDisplayPasteView(prev => !prev) }} />
        </div>
      </div>
      <FadeWrapper key={displayPasteView ? "paste" : "manual"}>
        <div className="h-[60vh] flex flex-col">
          {displayPasteView ? (
            <>
              <div className="flex-grow overflow-y-auto space-y-2">
                <Input
                  multiline={true}
                  rows={15}
                  id="pasteIngredientField"
                  placeholder="Paste the entire instruction set here"
                  label="Ingredients"
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="my-2 w-full bg-lightblue text-primary-text font-medium rounded border-2 border-lightblue hover:border-primary-text"
                onClick={() => handleParsedInstructions()}
              >
                Parse Instructions
              </button>
            </>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-2">
                {localInstructions.map((instruction) => (
                  <div key={`${instruction.id}-instruction`}>
                    <div className="flex items-end space-between space-x-1 mt-2">
                      <Input
                        id={`${instruction.id}-instructionTitle`}
                        placeholder="..."
                        label={`Instruction ${instruction.order}`}
                        value={instruction.title}
                        onChange={(changeEvent) =>
                          handleInstructionChange(instruction.id, "title", changeEvent.target.value)
                        }
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
                        placeholder="..."
                        value={instruction.text}
                        multiline={true}
                        required={true}
                        rows={3}
                        onChange={(changeEvent) =>
                          handleInstructionChange(instruction.id, "text", changeEvent.target.value)
                        }
                        onBlur={() => handleInstructionDispatch(instruction.id, "text")}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="my-2 w-full bg-lightblue text-primary-text font-medium rounded border-2 border-lightblue hover:border-primary-text"
                onClick={() => dispatch(addInstruction())}
              >
                Add Instruction
              </button>
            </>
          )}
        </div>
      </FadeWrapper>
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