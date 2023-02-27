import { BaseBrowserStorage } from "./BaseBrowserStorage";
export class StudentsLocalStorage extends BaseBrowserStorage {
  getStorage(): Storage {
    return localStorage;
  }
}
