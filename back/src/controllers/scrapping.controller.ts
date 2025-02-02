import PlaywrightService from "../services/playwright.service";
import toURLFriendly from "../utils/friendly-url";
import WebSocketService from "../websockets/websocket.service";
import {
  MessagesTypesEnum,
  OnMessageFn,
  SocketSendEventEnum,
} from "../websockets/websocket.service.type";
import {
  FindKeywordInPages,
  KeywordResult,
  PageLinksSearchProps,
} from "./scrapping.controller.type";
import * as fs from "fs";
import * as path from "path";
import moment from "moment";

class ScrappingController {
  #webSocketService: WebSocketService;
  #playwrightService: PlaywrightService;
  #recaptchaInterval?: NodeJS.Timeout;

  constructor(
    webSocketService: WebSocketService,
    playrightService: PlaywrightService
  ) {
    this.#webSocketService = webSocketService;
    this.#playwrightService = playrightService;
  }

  #onMessage({ type, data }: Parameters<OnMessageFn>[0]) {
    if (type === MessagesTypesEnum.CLICK) {
      this.#playwrightService.click(data.x, data.y);
    }
  }

  #creatSearchFolder(site: string) {
    const searchFolder = path.join(
      path.dirname(__dirname),
      "..",
      "search",
      site,
      moment().format("DD-MM-YYYY-HH[h]mm[m]")
    );

    if (!fs.existsSync(searchFolder)) {
      fs.mkdirSync(searchFolder, { recursive: true });
    }

    return searchFolder;
  }

  #onRecaptcha() {
    this.#webSocketService.broadcastMessage(
      SocketSendEventEnum.START_RECAPTCHA,
      {
        message: "Recaptcha challenge",
      }
    );

    this.#recaptchaInterval = setInterval(async () => {
      try {
        const screenshot = (
          await this.#playwrightService.screenshot()
        ).toJSON();
        this.#webSocketService.broadcastMessage(SocketSendEventEnum.RECAPTCHA, {
          screenshot,
        });
      } catch {}
    }, 300);
  }

  #onRecaptchaResolve() {
    this.#webSocketService.broadcastMessage(
      SocketSendEventEnum.RESOLVED_RECAPTCHA,
      { message: "Resolved recaptcha" }
    );
    clearInterval(this.#recaptchaInterval);
  }

  async #savePageResult(searchFolder: string, fileName: string) {
    await this.#playwrightService.screenshot({
      fullPage: true,
      path: path.join(searchFolder, `${fileName}.png`),
    });
  }

  async #findKeyworkdInFirstThreePages({
    site,
    pageLinks: { keyword, links },
    searchFolder,
  }: FindKeywordInPages): Promise<KeywordResult> {
    for (const [index, link] of links.entries()) {
      await this.#playwrightService.goto(link);

      const result = await this.#playwrightService.checkKeyword(keyword, site);

      if (result !== -1) {
        const pageName = toURLFriendly(`${keyword} page ${index + 1}`);
        await this.#savePageResult(searchFolder, pageName);

        return {
          title: keyword,
          keyword,
          link,
          page: index + 1,
          position: result + 1,
        };
      }
    }

    return { title: keyword, keyword, link: null, page: null, position: null };
  }

  async rankKeywords(site: string, keywords: string[]) {
    this.#webSocketService.onMessage((data) => this.#onMessage(data));
    this.#playwrightService.onRecaptcha(() => this.#onRecaptcha());
    this.#playwrightService.onRecaptchaResolve(() =>
      this.#onRecaptchaResolve()
    );

    try {
      await this.#playwrightService.init();
      const pagesStart = ["0", "10", "20"];

      const pages: PageLinksSearchProps[] = keywords.map((keyword) => ({
        keyword,
        links: pagesStart.map((page) => {
          const url = new URL("https://www.google.com/search");
          url.searchParams.append("q", keyword);
          url.searchParams.append("start", page);
          return url.toString();
        }),
      }));

      await this.#playwrightService.goto("https://google.com.br");

      const searchFolder = this.#creatSearchFolder(site);
      const results: KeywordResult[] = [];

      for (const page of pages) {
        const result = await this.#findKeyworkdInFirstThreePages({
          site,
          pageLinks: page,
          searchFolder,
        });

        results.push(result);

        this.#webSocketService.broadcastMessage(
          SocketSendEventEnum.KEYWORD_RESULT,
          results
        );
      }

      await this.#playwrightService.close();
      this.#webSocketService.broadcastMessage(SocketSendEventEnum.SEARCH_END, {
        message: "Search ended",
      });
    } catch (err) {
      console.log({ err });
      await this.#playwrightService.close();
    }
  }
}

export default ScrappingController;
