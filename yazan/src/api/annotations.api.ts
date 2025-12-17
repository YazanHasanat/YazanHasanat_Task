import type { Annotation } from "../types/annotation";

let annotations: Annotation[] = [];

export async function getAnnotations(
  datasetId: string
): Promise<Annotation[]> {
  return annotations.filter((a) => a.datasetId === datasetId);
}

export async function addAnnotation(
  annotation: Omit<Annotation, "id">
): Promise<Annotation> {
  const newAnnotation: Annotation = {
    ...annotation,
    id: crypto.randomUUID(),
  };

  annotations.push(newAnnotation);
  return newAnnotation;
}

export async function deleteAnnotation(
  id: string
): Promise<void> {
  annotations = annotations.filter((a) => a.id !== id);
}
