import mongoose from "mongoose";
export default async function validateReferences(schema, model) {
  const referenceFields = [];

  // Find all reference fields in the schema
  schema.eachPath((path, schemaType) => {
    if (schemaType.options && schemaType.options.ref) {
      referenceFields.push({ path, refModel: schemaType.options.ref });
    }
  });

  // Check if each reference field has a corresponding document in the database
  for (const { path, refModel } of referenceFields) {
    const referenceId = model[path];

    if (referenceId) {
      if (Array.isArray(referenceId)) {
        for (const id of referenceId) {
          const existingDoc = await mongoose
            .model(refModel)
            .findOne({ _id: referenceId });
          if (!existingDoc) {
            throw new Error(
              `${refModel} with ID ${id} not found for reference field ${path}`
            );
          }
        }
      } else {
        const existingDoc = await mongoose
          .model(refModel)
          .findOne({ _id: referenceId });
        if (!existingDoc) {
          throw new Error(
            `${refModel} with ID ${referenceId} not found for reference field ${path}`
          );
        }
      }
    }
  }
}
