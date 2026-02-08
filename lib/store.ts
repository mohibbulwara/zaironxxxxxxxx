
import { PROJECTS, SERVICES, SKILLS, BLOG_POSTS } from '../constants';
import { Project, Service, Skill, BlogPost } from '../types';

/**
 * Zaironx System Storage
 * Acts as the Data Access Layer (DAL) for the application.
 * Persists data to localStorage to simulate a database.
 */
class SystemStorage {
  private static STORAGE_KEY = 'zaironx_system_data';

  static getData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const initialData = { 
      projects: PROJECTS, 
      services: SERVICES, 
      skills: SKILLS,
      posts: BLOG_POSTS 
    };
    this.saveData(initialData);
    return initialData;
  }

  static saveData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    // Dispatch event so the UI knows to update
    window.dispatchEvent(new Event('system_data_updated'));
  }

  static updateProjects(projects: Project[]) {
    const current = this.getData();
    this.saveData({ ...current, projects });
  }

  static updateServices(services: Service[]) {
    const current = this.getData();
    this.saveData({ ...current, services });
  }

  static updateSkills(skills: any[]) {
    const current = this.getData();
    this.saveData({ ...current, skills });
  }

  static updatePosts(posts: BlogPost[]) {
    const current = this.getData();
    this.saveData({ ...current, posts });
  }
}

export default SystemStorage;
