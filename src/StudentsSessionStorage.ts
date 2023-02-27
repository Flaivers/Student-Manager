import { BaseBrowserStorage } from "./BaseBrowserStorage";
export class StudentsSessionStorage extends BaseBrowserStorage {
  getStorage(): Storage {
    return sessionStorage;
  }
}
