import { BaseBrowserStorage } from "./baseBrowserStorage";
export class StudentsSessionStorage extends BaseBrowserStorage {
  getStorage(): Storage {
    return sessionStorage;
  }
}
