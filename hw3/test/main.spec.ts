import { main, show, SortBy } from "../src/main";
import { ClientUser, Demand, ExecutorUser } from "../src/types";
import { none, some } from "../src/fp/maybe";
import { getOrElse, left, right } from "../src/fp/either";

import * as fetching from "../src/fetching";

jest.mock("../src/fetching");

const mockedFetching = jest.mocked(fetching);

describe("Main file", () => {
  const executor: ExecutorUser = {
    name: "Executor",
    position: { x: 1, y: 1 },
    possibilities: [Demand.Fighting, Demand.Fishing],
  };
  const clients: Array<ClientUser> = [
    { name: "Philip", demands: some([Demand.Fishing, Demand.Fighting]), position: { x: 10, y: 30 }, reward: 600 },
    { name: "Payne", demands: some([Demand.Driving]), position: { x: 5, y: 2 }, reward: 230 },
    { name: "Gregor", demands: none, position: { x: 21, y: 0 }, reward: 230 },
    { name: "John", demands: some([Demand.Fishing, Demand.Fighting]), position: { x: 5, y: -20 }, reward: 250 },
  ];
  const clientsResponse = [
    { name: "Philip", demands: [Demand.Fishing, Demand.Fighting], position: { x: 10, y: 30 }, reward: 600 },
    { name: "Payne", demands: [Demand.Driving], position: { x: 5, y: 2 }, reward: 230 },
    { name: "Gregor", demands: null, position: { x: 21, y: 0 }, reward: 230 },
    { name: "John", demands: [Demand.Fishing, Demand.Fighting], position: { x: 5, y: -20 }, reward: 250 },
  ];

  describe("show", () => {
    it("show returns right with the message and sort by reward", () => {
      const expectedMessage = "This executor meets the demands of only 3 out of 4 clients.";
      const received = show(SortBy.reward)(clients)(executor);
      expect(received._tag).toBe("Right");
      if (received._tag === "Right") {
        expect(received.right).toContain(expectedMessage);
      }
    });

    it("show returns right with the message and sort by distance", () => {
      const expectedMessage = "This executor meets the demands of only 3 out of 4 clients.";
      const received = show(SortBy.distance)(clients)(executor);
      expect(received._tag).toBe("Right");
      if (received._tag === "Right") {
        expect(received.right).toContain(expectedMessage);
      }
    });

    it("show returns left with the message when cannot find clients", () => {
      const clientsWithoutNone = clients.slice(0, 2);
      const executorWithoutPossibilities = { ...executor, possibilities: [] };
      expect(show(SortBy.reward)(clientsWithoutNone)(executorWithoutPossibilities)).toStrictEqual(
        left(`This executor cannot meet the demands of any client!`)
      );
    });

    it("show returns left with the message when cannot find clients", () => {
      const executorWithAllPossibilities = {
        ...executor,
        possibilities: [Demand.Fishing, Demand.Fighting, Demand.Driving],
      };
      const result = show(SortBy.reward)(clients)(executorWithAllPossibilities);
      expect(result._tag).toBe("Right");
      if (result._tag === "Left") {
        expect(result.left).toContain("This executor cannot meet the demands of any client!");
      }
    });
  });

  describe("main", () => {
    beforeAll(() => {
      mockedFetching.fetchClient.mockClear();
      mockedFetching.fetchExecutor.mockClear();
    });

    it("main returns same value as show", () => {
      mockedFetching.fetchExecutor.mockResolvedValue(executor);
      mockedFetching.fetchClient.mockResolvedValue(clientsResponse);

      return main(SortBy.distance).then((message) => {
        expect(message).toBe(getOrElse(() => "")(show(SortBy.distance)(clients)(executor)));
      });
    });

    it("main returns error message when fetchExecutor fails", () => {
      mockedFetching.fetchExecutor.mockRejectedValue("Unable to fetch executor");
      mockedFetching.fetchClient.mockResolvedValue(clientsResponse);

      return main(SortBy.distance).then((message) => {
        expect(message).toBe("Unable to fetch executor");
      });
    });

    it("main returns error message when fetchClient fails", () => {
      mockedFetching.fetchExecutor.mockResolvedValue(executor);
      mockedFetching.fetchClient.mockRejectedValue("Unable to fetch clients");

      return main(SortBy.distance).then((message) => {
        expect(message).toBe("Unable to fetch clients");
      });
    });
  });
});
