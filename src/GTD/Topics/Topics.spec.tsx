import { customRender } from "../../test/test-util";
import { Topics } from "./";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { mockTopics } from "../../test/fixtures/mock-topics";
import { GTDStrings } from "../GTD.strings";

const server = setupServer(
  rest.get("http://localhost:5000/topics", (req, res, ctx) => res(ctx.json({ topics: mockTopics })))
);

describe("Topics", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  // clean up once the tests are done
  afterAll(() => server.close());
  it("renders the topic tabs fetched from BE", async () => {
    const { findByText } = customRender(<Topics />);
    for (const topic of mockTopics) {
      expect(await findByText(topic.name)).toBeInTheDocument();
    }
  });
  it("renders the add topic button", async () => {
    const { findByRole } = customRender(<Topics />);
    expect(await findByRole("button", { name: GTDStrings.ADD_TOPIC })).toBeInTheDocument();
  });
  it("opens the add topic dialog when the \"add topic\" button is clicked", async () => {
    const { findByRole, findByText } = customRender(<Topics />);
    const addTopicButton = await findByRole("button", { name: GTDStrings.ADD_TOPIC });
    addTopicButton.click();
    expect(await findByText(GTDStrings.ADD_NEW_TOPIC)).toBeInTheDocument();
  });
});