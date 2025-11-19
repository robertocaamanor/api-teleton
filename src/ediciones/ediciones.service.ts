// src/ediciones/ediciones.service.ts
import data from "../data/teleton.json";
import { QueryEdicionesDto } from "./query-ediciones.dto";
import { EdicionDto } from "./dto/edicion.dto";
import { PagedEdicionesResponseDto, YearEdicionesResponseDto } from "./dto/responses.dto";

export class EdicionesService {
  private readonly items = data as EdicionDto[];

  list(q: QueryEdicionesDto): PagedEdicionesResponseDto {
    let filtered = this.items;

    if (q.year) filtered = filtered.filter(i => i.year === q.year);
    if (q.motto) {
      const motto = q.motto.toLowerCase();
      filtered = filtered.filter(i => i.motto.toLowerCase().includes(motto));
    }

    if (q.minAudited) {
      const minAudited = q.minAudited;
      filtered = filtered.filter(i => (i.audited_total_clp ?? 0) >= minAudited);
    }

    const total = filtered.length;
    const start = ((q.page ?? 1) - 1) * (q.pageSize ?? 20);
    const paged = filtered.slice(start, start + (q.pageSize ?? 20));

    return {
      total,
      page: q.page ?? 1,
      pageSize: q.pageSize ?? 20,
      items: paged,
    };
  }

  get(id: number): EdicionDto | undefined {
    return this.items.find(i => i.id === id);
  }

  listByYear(year: number): YearEdicionesResponseDto {
    const items = this.items.filter(i => i.year === year);
    return { total: items.length, year, items };
  }
}
