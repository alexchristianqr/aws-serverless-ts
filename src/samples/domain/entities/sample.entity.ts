export abstract class SampleEntity {
  id?: number;
  title?: string;
  description?: string;
}

export interface Model extends SampleEntity {}
