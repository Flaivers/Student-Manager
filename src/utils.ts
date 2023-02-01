export function getElementById<T extends HTMLInputElement>(id: string): T {
  const ElementId = document.getElementById(id);
  if (ElementId == null) {
    throw new Error("id not found");
  } else {
    return ElementId as T;
  }
}
