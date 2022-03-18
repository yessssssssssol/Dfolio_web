import { ProjectModel } from '../schemas/Project';

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
  static async findById({ id }) {
    const Project = await ProjectModel.findOne({ id });
    return Project;
  }
  static async findAll({ userId }) {
    const Projects = await ProjectModel.find({ userId });
    return Projects;
  }
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedProject;
  }
}

export { Project };
