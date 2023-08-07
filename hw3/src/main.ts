import { Either, fromPromise, ap, right, left, getOrElse, flatten } from "./fp/either";
import { pipe } from "./fp/utils";
import { fetchClient, fetchExecutor } from "./fetching";
import { ClientUser, ExecutorUser, Demand } from "./types";
import { Maybe, fromNullable, isNone } from "./fp/maybe";

type Response<R> = Promise<Either<string, R>>;

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser & { demands: Maybe<Array<Demand>> }>> =>
  fromPromise(fetchClient()).then((response) =>
    response.map((clients) =>
      clients.map((client) => ({
        ...client,
        demands: fromNullable(client.demands),
      }))
    )
  );

export enum SortBy {
  distance = "distance",
  reward = "reward",
}

const calculateDistance = (pointA: { x: number; y: number }, pointB: { x: number; y: number }): number =>
  Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));

const sortByDistance = (
  clients: Array<ClientUser & { demands: Maybe<Array<Demand>> }>,
  executor: ExecutorUser
): Array<ClientUser & { demands: Maybe<Array<Demand>> }> =>
  clients.sort((a, b) => {
    const distanceA = calculateDistance(a.position, executor.position);
    const distanceB = calculateDistance(b.position, executor.position);
    return distanceA - distanceB;
  });

const sortByReward = (
  clients: Array<ClientUser & { demands: Maybe<Array<Demand>> }>
): Array<ClientUser & { demands: Maybe<Array<Demand>> }> => clients.sort((a, b) => b.reward - a.reward);

const formatClient =
  (executor: ExecutorUser) =>
  (client: ClientUser & { demands: Maybe<Array<Demand>> }): string => {
    const distance = calculateDistance(client.position, executor.position);
    return `name: ${client.name}, distance: ${distance.toFixed(3)}, reward: ${client.reward}`;
  };

const formatClients = (
  clients: Array<ClientUser & { demands: Maybe<Array<Demand>> }>,
  executor: ExecutorUser
): string => clients.map(formatClient(executor)).join("\n");

export const show =
  (sortBy: SortBy) =>
  (clients: Array<ClientUser & { demands: Maybe<Array<Demand>> }>) =>
  (executor: ExecutorUser): Either<string, string> => {
    const totalClients = clients.length;

    const meetDemands = (client: ClientUser & { demands: Maybe<Array<Demand>> }) => {
      return isNone(client.demands) || client.demands.value.every((demand) => executor.possibilities.includes(demand));
    };

    const matchedClients = clients.filter(meetDemands);
    const sortedClients =
      sortBy === SortBy.distance ? sortByDistance(matchedClients, executor) : sortByReward(matchedClients);

    const formattedClients = formatClients(sortedClients, executor);

    return matchedClients.length === 0
      ? left("This executor cannot meet the demands of any client!")
      : right(
          `This executor meets the demands of only ${sortedClients.length} out of ${totalClients} clients.\n\nAvailable clients sorted by ${sortBy}:\n${formattedClients}`
        );
  };

export const main = (sortBy: SortBy): Promise<string> =>
  Promise.all([getClients(), getExecutor()]).then(([clients, executor]) =>
    pipe(
      right(show(sortBy)),
      ap(clients),
      ap(executor),
      flatten,
      getOrElse((err) => err)
    )
  );
