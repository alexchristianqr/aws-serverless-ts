import { SampleOutputRepository } from "../../../domain/ports/output/sample-output.repository.ts";
import { SampleEntity } from "../../../domain/entities/sample.entity.ts";
import dataJSON from "../../../../../data.json";

interface Model extends SampleEntity {}

export class SampleLocalRepository implements SampleOutputRepository {
  private items: Array<Model> = dataJSON.data;

  async create(data: Model): Promise<Model> {
    this.items.push(data);
    return data;
  }

  async delete(id: number): Promise<boolean> {
    this.items.filter((item) => item.id !== id);
    return true;
  }

  async getById(id?: number): Promise<Model | null> {
    const sample: Model | undefined = this.items.find((item) => item.id == id);
    if (!sample) return null;
    return sample;
  }

  async getAll(): Promise<Array<Model>> {
    return this.items;
  }

  async update(id: number, data: Model): Promise<boolean> {
    const sample: Model | undefined = this.items.find((item) => item.id == id);
    if (!sample) return false;
    sample.id = data.id;
    sample.title = data.title;
    sample.description = data.description;
    return true;
  }

  async updateField(id: number, request: any): Promise<boolean> {
    const { payload } = request;

    const [field] = Object.keys(payload);
    const value = payload[field];

    const sample: any = this.items.find((item) => item.id == id);
    if (!sample) return false;
    sample[field] = value;

    return true;
  }
}
