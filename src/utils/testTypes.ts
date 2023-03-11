type TestType = {
  name:
    | "true_or_false"
    | "enumeration"
    | "essay"
    | "identification"
    | "multiple_choice"
  value: "TRORFA" | "ENUMER" | "ESSAY" | "IDNTTY" | "CHOICE"
}[]

export const testTypes: TestType = [
  {
    name: "true_or_false",
    value: "TRORFA",
  },
  {
    name: "enumeration",
    value: "ENUMER",
  },
  {
    name: "essay",
    value: "ESSAY",
  },
  {
    name: "identification",
    value: "IDNTTY",
  },
  {
    name: "multiple_choice",
    value: "CHOICE",
  },
]
