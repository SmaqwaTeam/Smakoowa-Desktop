import { useState, useEffect } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import PropTypes from 'prop-types'

const InstructionsForm = ({ propinstructions }) => {
  const [instruction, setInstruction] = useState('')
  const [instructionId, setInstructionId] = useState(1)
  const [instructionsList, setInstructionsList] = useState([])

  useEffect(() => {
    sendToParent()
  }, [])

  useEffect(() => {
    if (propinstructions != null) {
      setInstructionsList(propinstructions)
    }
  }, [propinstructions])

  const addInstruction = () => {
    const newInstruction = { content: instruction, position: instructionId }
    setInstructionsList([...instructionsList, newInstruction])
    setInstruction('')
    setInstructionId(instructionId + 1)
    updatePositions()
  }

  const deleteInstruction = (id) => {
    const updatedInstructions = instructionsList.filter((instr) => instr.position !== id)
    setInstructionsList(updatedInstructions)
    updatePositions()
  }

  const updatePositions = () => {
    const updatedInstructions = instructionsList.map((instr, index) => ({
      ...instr,
      position: index + 1
    }))
    setInstructionsList(updatedInstructions)
  }

  const sendToParent = () => {
    // Emit instructionsList to parent component
  }

  return (
    <div className="flex flex-col gap-2 my-5">
      {instructionsList.map((inst) => (
        <div
          key={inst.position}
          className="flex flex-row gap-5 p-3 border-2 rounded-lg border-orange-500 w-full items-center"
        >
          <Typography className="flex-auto w-1/6">Instruction {inst.position}</Typography>
          <Typography className="flex-auto w-1/2">{inst.content}</Typography>

          <div className="flex justify-center items-center h-full">
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteInstruction(inst.position)}
            >
              X
            </Button>
          </div>
        </div>
      ))}
      <div className="my-5 flex flex-row gap-2 items-center">
        <Box className="flex-auto border-2 border-orange-300">
          <TextField
            fullWidth
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Add another instruction"
            variant="outlined"
          />
        </Box>
        <div className="flex-auto">
          <Button
            variant="contained"
            color="primary"
            onClick={addInstruction}
            className="bg-orange-300 rounded-lg p-1"
          >
            Add instruction
          </Button>
        </div>
      </div>
    </div>
  )
}

InstructionsForm.propTypes = {
  propinstructions: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired
    })
  )
}

export default InstructionsForm
