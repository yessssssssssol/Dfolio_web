import { EducationModel } from '../schemas/Education';

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }
  static async findById({ id }) {
    const Education = await EducationModel.findOne({ id });
    return Education;
  }
  static async findAll({ userId }) {
    const Educations = await EducationModel.find({ userId });
    return Educations;
  }
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedEducation;
  }
}

export { Education };
