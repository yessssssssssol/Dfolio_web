import { Project } from '../db';
import { v4 as uuidv4 } from 'uuid';

class ProjectAuthService {
  static async addProject({ userId, title, description, whenDate }) {
    // id는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, userId, title, description, whenDate };

    //db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }
  static async getProjectInfo({ id }) {
    const Project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!Project) {
      const errorMessage =
        '올바른 자격증id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    return Project;
  }
  static async getProjects({ userId }) {
    const Projects = await Project.findAll({ userId });

    if (!Projects) {
      const errorMessage =
        '해당 작성자의 자격증 내역이 없습니다. 다시 한번 확인해 주세요.';
    }
    return Projects;
  }
  static async setProject({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let Project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!Project) {
      const errorMessage =
        '올바른 자격증 id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      Project = await Project.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      Project = await Project.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.whenDate) {
      const fieldToUpdate = 'whenDate';
      const newValue = toUpdate.whenDate;
      Project = await Project.update({ id, fieldToUpdate, newValue });
    }

    return Project;
  }
}

export { ProjectAuthService };
