export default {
  type: "object",
  properties: {
    name: { type: "string" },
    lastname: { type: "string" },
    gender: { type: "string" },
  },
  required: ["name", "lastname"],
} as const;
