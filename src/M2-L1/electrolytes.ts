import { QuestionsType } from "../utils/types/types"

export const choice: QuestionsType = [
  {
    refID: "M2-L1",
    refName: "electrolytes",
    question: "solvent for all processes in the body",
    answer: "water",
  },
  {
    refID: "M2-L1",
    refName: "electrolytes",
    question:
      "maintains concentration of electrolytes within cells and in plasma",
    answer: "ion_transport_mechanisms",
  },
  {
    refID: "M2-L1",
    refName: "electrolytes_two_mechanisms",
    question:
      "transport mechanism that requires energy to move ion across cellular membranes",
    answer: "active_transport",
  },
  {
    refID: "M2-L1",
    refName: "electrolytes_two_mechanisms",
    question: "movement of ions across membrane based on size and charge",
    answer: "diffusion",
  },
  {
    refID: "M2-L1",
    refName: "electrolytes",
    question: "Concentration of solutes per kilogram of solvent (mOsm/Kg)",
    answer: "osmolality",
  },
]

export const answerPool = [
  {
    refID: "M2-L1",
    refName: "electrolytes",
    values: [
      "osmolality",
      "diffusion",
      "active_transport",
      "ion_transport_mechanisms",
      "water",
    ],
  },
]
