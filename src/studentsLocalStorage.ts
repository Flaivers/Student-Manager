import { BaseBrowserStorage } from "./baseBrowserStorage";
export class StudentsLocalStorage extends BaseBrowserStorage {
  getStorage(): Storage {
    return localStorage;
  }
}
