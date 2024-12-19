export type Navigate = (pathName: string) => void;

export class RouteController {
  public readonly navigate: Navigate;

  constructor({ navigate }: { navigate: Navigate }) {
    this.navigate = navigate;
  }
}
